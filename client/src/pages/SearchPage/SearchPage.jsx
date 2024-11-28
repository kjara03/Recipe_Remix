import { useState, useEffect } from "react";
import "./SearchPage.css";
import { useParams } from "react-router-dom";
import GridLayout from "../../components/GridLayout/GridLayout";
import IngredientMenu from "../../components/IngredientMenu/IngredientMenu";
import Searchbar from "../../components/SearchBar/Searchbar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useAlert from "../../context/AlertContext";
const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const SearchPage = () => {
  const { query } = useParams(); // Extract the search query
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showAlert } = useAlert();

  // Fetch recipes
  useEffect(() => {
    // Function to search for recipes using the api after it detects a search parameter
    async function fetchRecipes() {
      // Reset the states
      setIsLoading(true);
      setRecipes([]);
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=1&addRecipeInformation=true&apiKey=${SPOONACULAR_API_KEY}`
        );
        // Api daily limit reached
        if (response.status === 402) {
          showAlert(
            "danger",
            "API daily limit reached! Come back tomorrow!",
            5000
          );
          setIsLoading(false);
          return;
        }
        const json = await response.json();
        if (json.number > 0) {
          extractRecipesDetails(json.results);
        }
      } catch (error) {
        console.log(error);
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
    fetchRecipes();
  }, [query, showAlert]);

  // Function to add recipe data to the backend
  async function addRecipe(recipe) {
    await fetch("http://localhost:3000/recipe", {
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
  }

  return (
    <div className="search-page-container">
      <Searchbar />
      {recipes.length > 0 ? (
        <div>
          <div className="mt-3 mb-3">
            <IngredientMenu />
          </div>
          <GridLayout recipes={recipes} />
        </div>
      ) : isLoading ? (
        <LoadingSpinner />
      ) : (
        <h2 className="mt-4">No results found!</h2>
      )}
    </div>
  );
};

export default SearchPage;
