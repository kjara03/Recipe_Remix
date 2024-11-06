import React from 'react';
import RecipeCard from '../../components/RecipeCard';

const FavoriteRecipesPage = ({ favoriteRecipes, onRemoveFavorite }) => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Favorite Recipes</h2>
      {favoriteRecipes.length > 0 ? (
        <div className="row">
          {favoriteRecipes.map((recipe) => (
            <div className="col-md-4 mb-4" key={recipe.id}>
              <RecipeCard 
                recipe={recipe} 
                onRemove={() => onRemoveFavorite(recipe.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>You have no favorite recipes yet.</p>
      )}
    </div>
  );
};
