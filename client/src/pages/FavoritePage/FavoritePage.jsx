import { useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);

  // To remove a favorite recipe by id
  const removeFavorite = (id) => {
    setFavorites(favorites.filter((recipe) => recipe.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Favorite Recipes</h2>
      {favorites.length > 0 ? ( // Check if there are favorite recipes
        <div className="row">
          {favorites.map((recipe) => (
            // Iterate over each recipe in the array
            <div className="col-md-4 mb-4" key={recipe.id}>
              <RecipeCard recipe={recipe} />
              <button onClick={() => removeFavorite(recipe.id)}>Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no favorite recipes yet.</p> // Message for empty favorites
      )}
    </div>
  );
};

export default FavoritePage;
