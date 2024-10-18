import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
const EDAMAN_ID = import.meta.env.VITE_EDAMAN_ID;
const EDAMAN_API_KEY = import.meta.env.VITE_EDAMAN_API_KEY;

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  // Fetch the recipe from the api
  useEffect(() => {
    fetchRecipeById();
  }, [id]);

  // Function to fetch details on the specific recipe
  async function fetchRecipeById() {
    try {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${EDAMAN_ID}&app_key=${EDAMAN_API_KEY}`
      );
      const json = await response.json();
      console.log(json);
      //setRecipe(json);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      {recipe ? (
        <div>{/*Add component to render details of the api*/}</div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default RecipePage;
