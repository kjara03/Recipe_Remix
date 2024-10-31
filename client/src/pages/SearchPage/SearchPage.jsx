import { useState, useEffect } from "react";
import "./SearchPage.css";
import { useParams } from "react-router-dom";
import GridLayout from "../../components/GridLayout/GridLayout";
import Searchbar from "../../components/SearchBar/Searchbar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
const EDAMAN_ID = import.meta.env.VITE_EDAMAN_ID;
const EDAMAN_API_KEY = import.meta.env.VITE_EDAMAN_API_KEY;

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
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${EDAMAN_ID}&app_key=${EDAMAN_API_KEY}`
      );
      const json = await response.json();
      console.log(json);
      if (json.count > 0) {
        extractRecipesDetails(json);
      }
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  }

  // Function to extract recipe data
  function extractRecipesDetails(data) {
    const recipesData = data.hits.map((recipeData) => {
      return {
        recipe: recipeData.recipe.label,
        recipeImg: recipeData.recipe.image,
        recipeId: recipeData.recipe.uri.split("_")[1],
      };
    });
    setRecipes(recipesData);
  }

  return (
    <div className="search-page-container">
      <Searchbar />
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

export default SearchPage;
