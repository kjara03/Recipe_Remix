import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeDisplay from "../../components/RecipeDisplay/RecipeDisplay";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the recipe from the api
  useEffect(() => {
    fetchRecipeById();
  }, [id]);

  // Function to fetch details on the specific recipe
  async function fetchRecipeById() {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${SPOONACULAR_API_KEY}`
      );
      if (!response.ok) {
        return;
      }
      const json = await response.json();
      console.log(json);
      extractRecipeDetails(json);
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  }

  // Function to extract the necessary recipe details
  function extractRecipeDetails(data) {
    setRecipe({
      cookTime: data.readyInMinutes,
      cuisineType: data.cuisines,
      dietLabels: data.diets,
      dishTypes: data.dishTypes,
      image: data.image,
      ingredients: data.extendedIngredients,
      instructions: data.analyzedInstructions,
      name: data.title,
      nutrients: data.nutrition,
      servings: data.servings,
      url: data.sourceUrl,
    });
  }

  return (
    <div>
      {recipe ? (
        <RecipeDisplay {...recipe} />
      ) : isLoading ? (
        <LoadingSpinner />
      ) : (
        <h2 className="mt-5">No results found!</h2>
      )}
    </div>
  );
};

export default RecipePage;
