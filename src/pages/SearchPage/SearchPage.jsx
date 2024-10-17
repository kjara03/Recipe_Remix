import { useState, useEffect } from "react";
import "./SearchPage.css";
import { useParams } from "react-router-dom";
import GridLayout from "../../components/GridLayout/GridLayout";
const EDAMAN_ID = import.meta.env.VITE_EDAMAN_ID;
const EDAMAN_API_KEY = import.meta.env.VITE_EDAMAN_API_KEY;

const SearchPage = () => {
  const { query } = useParams(); // Extract the search query
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes
  useEffect(() => {
    fetchRecipes();
  }, [query]);

  // Function to search for recipes using the api after it detects a search parameter
  async function fetchRecipes() {
    try {
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${EDAMAN_ID}&app_key=${EDAMAN_API_KEY}`
      );
      const json = await response.json();
      extractRecipeDetails(json);
    } catch (error) {
      alert(error);
    }
  }

  // Function to extract recipe data
  function extractRecipeDetails(data) {
    const recipesData = data.hits.map((recipeData) => {
      return {
        recipe: recipeData.recipe.label,
        recipeImg: recipeData.recipe.image,
      };
    });
    console.log(recipesData);
    setRecipes(recipesData);
  }

  return <div>{recipes.length > 0 && <GridLayout recipes={recipes} />}</div>;
};

export default SearchPage;
