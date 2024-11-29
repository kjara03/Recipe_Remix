import { useState, useEffect } from "react";
import "./SearchPage.css";
import { useParams } from "react-router-dom";
import GridLayout from "../../components/GridLayout/GridLayout";
import Searchbar from "../../components/SearchBar/Searchbar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const SearchPage = () => {
  const { query } = useParams(); // Extract the search query
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch recipes
  useEffect(() => {
    fetchRecipes();
  }, [query]);

  // Function to search for recipes using the api after it detects a search parameter
  async function fetchRecipes() {
    // Reset the states
    setIsLoading(true);
    setRecipes([]);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=20&apiKey=${SPOONACULAR_API_KEY}`
      );
      const json = await response.json();
      console.log(json);
      if (json.number > 0) {
        extractRecipesDetails(json.results);
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
        <div>
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
