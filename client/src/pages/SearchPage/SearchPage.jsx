import { useState, useEffect } from "react";
import "./SearchPage.css";
import { useSearchParams } from "react-router-dom";
import GridLayout from "../../components/GridLayout/GridLayout";
import Searchbar from "../../components/SearchBar/Searchbar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const SearchPage = () => {
  const [queryParams] = useSearchParams();
  const ingredient = queryParams.get("ingredients")?.split(",").join(",+");
  const recipe = queryParams.get("recipe");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch recipes
  useEffect(() => {
    fetchRecipes();
  }, [ingredient, recipe]);

  // Function to search for recipes using the api after it detects a search parameter
  async function fetchRecipes() {
    // Reset the states
    setIsLoading(true);
    setRecipes([]);
    try {
      if (recipe) {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${recipe}&number=20&apiKey=${SPOONACULAR_API_KEY}`
        );
        const json = await response.json();
        console.log(json);
        if (json.number > 0) {
          extractRecipesDetails(json.results);
        }
      } else {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=12&ranking=1&apiKey=${SPOONACULAR_API_KEY}`
        );
        const json = await response.json();
        console.log(json);
        if (json.length > 0) {
          extractRecipesDetails(json);
        }
      }
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  }

  // Function to extract recipe data
  function extractRecipesDetails(data) {
    const recipesData = data.map((recipeData) => {
      return {
        id: recipeData.id,
        image: recipeData.image,
        name: recipeData.title,
      };
    });
    setRecipes(recipesData);
    recipesData.forEach((recipe) => {
      addRecipe(recipe);
    });
  }

  // Function to add recipe data to the backend
  async function addRecipe(recipe) {
    const response = await fetch("http://localhost:3000/recipe", {
      method: "POST",
      body: JSON.stringify({
        id: recipe.id,
        image: recipe.image,
        name: recipe.name,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = await response.json();
    console.log(json);
  }

  return (
    <div className="search-page-container">
      <Searchbar />
      {recipes.length > 0 ? (
        <div className="mt-3">
          <GridLayout recipes={recipes} />
        </div>
      ) : isLoading ? (
        <LoadingSpinner />
      ) : (
        <h2 className="mt-5">No results found!</h2>
      )}
    </div>
  );
};

export default SearchPage;
