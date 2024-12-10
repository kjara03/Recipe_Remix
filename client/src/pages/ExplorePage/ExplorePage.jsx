import { useState, useEffect } from "react";
import "./ExplorePage.css";
import GridLayout from "../../components/GridLayout/GridLayout";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useAlert from "../../context/AlertContext";
const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const ExplorePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showAlert } = useAlert();

  // Fetch recipes
  useEffect(() => {
    fetchRandomRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to call the api for random recipes
  async function fetchRandomRecipes() {
    // Reset the states
    setIsLoading(true);
    setRecipes([]);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=12&includeNutrition=false&apiKey=${SPOONACULAR_API_KEY}`
      );
      const json = await response.json();
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
      if (json.recipes.length > 0) {
        extractRecipesDetails(json.recipes);
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
    <div className="explore-page-container">
      {recipes.length > 0 ? (
        <div className="mt-3 mb-3 text-center ">
          <button
            className="btn btn-secondary random-button"
            onClick={fetchRandomRecipes}
          >
            Get random recipes
          </button>
          <GridLayout recipes={recipes} />
        </div>
      ) : isLoading ? (
        <LoadingSpinner />
      ) : (
        <h2 className="mt-1 text-center">No results found!</h2>
      )}
    </div>
  );
};

export default ExplorePage;
