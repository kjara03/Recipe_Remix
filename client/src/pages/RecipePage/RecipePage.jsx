import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeDisplay from "../../components/RecipeDisplay/RecipeDisplay";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useAlert from "../../context/AlertContext";
const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const API = import.meta.env.VITE_API_BASE_URL || "";

const RecipePage = () => {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { showAlert } = useAlert();

  // Fetch the recipe from the api
  useEffect(() => {
    // Function to fetch details on the specific recipe
    async function fetchRecipeById() {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${SPOONACULAR_API_KEY}`
        );
        if (!response.ok) {
          // Api daily limit reached
          if (response.status === 402) {
            showAlert(
              "danger",
              "API daily limit reached! Come back tomorrow!",
              5000
            );
          }
          setIsLoading(false);
          return;
        }
        const json = await response.json();
        extractRecipeDetails(json);
      } catch (error) {
        showAlert("danger", error.message, 5000);
        console.log(error.message);
      }
      setIsLoading(false);
    }

    // Function to extract the necessary recipe details
    async function extractRecipeDetails(data) {
      let image;
      // The api call doesn't guaranteed an image data is available and when it is not available then retrieve from the database
      if (!data.image) {
        const response = await fetch(`${API}/api/recipe/${id}`);
        // If the recipe is empty then an empty string is passed to the recipe
        if (response.status === 404) {
          image = "";
        } else {
          const json = await response.json();
          image = json.data.image;
        }
      }

      addRecipe({
        id: id,
        image: data.image || image,
        name: data.title,
      });

      setRecipe({
        cookTime: data.readyInMinutes,
        cuisineType: data.cuisines,
        dietLabels: data.diets,
        dishTypes: data.dishTypes,
        image: data.image || image,
        ingredients: data.extendedIngredients,
        instructions: data.analyzedInstructions,
        name: data.title,
        nutrients: data.nutrition,
        servings: data.servings,
        url: data.sourceUrl,
      });
    }

    // Function to add recipe data to the backend
    async function addRecipe(recipe) {
      await fetch(`/api/recipe`, {
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

    fetchRecipeById();
  }, [id, showAlert]);

  return (
    <div>
      {recipe ? (
        <RecipeDisplay {...recipe} />
      ) : isLoading ? (
        <LoadingSpinner />
      ) : (
        <h2 className="mt-4 text-center">No results found!</h2>
      )}
    </div>
  );
};

export default RecipePage;
