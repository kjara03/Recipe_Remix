import { useState, useEffect } from "react";
import GridLayout from "../../components/GridLayout/GridLayout";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const ExplorePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch recipes
  useEffect(() => {
    fetchRandomRecipes();
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
      console.log(json);
      if (json.recipes.length > 0) {
        extractRecipesDetails(json.recipes);
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
    <div className="explore-page-container">
      <div className="mt-3 mb-3 text-center ">
        <button className="btn btn-secondary" onClick={fetchRandomRecipes}>
          Get random recipes
        </button>
      </div>
      {recipes.length > 0 ? (
        <GridLayout recipes={recipes} />
      ) : isLoading ? (
        <LoadingSpinner />
      ) : (
        <h2 className="mt-5">No results found!</h2>
      )}
    </div>
  );
};

export default ExplorePage;
