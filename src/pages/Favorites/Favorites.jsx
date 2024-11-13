import React from 'react';
import { useState } from 'react';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

const FavoriteRecipesPage = () => {
  const [favorites, setFavorites]=useState([]); //sample favorite state
  const removeFavorite=(id)=>{
  setFavorites(favorites.filter((recipe)=>recipe.id !==id)) //to remove a favorite recipe by id
};

  return (
    <div className="container mt-4"> 
      <h2 className="mb-4">My Favorite Recipes</h2>
      {favorites.length > 0 ? ( //check if there are favorite recipes
        <div className="row">
          {favorites.map((recipe) => ( //iterate over each repice in the array
            <div className="col-md-4 mb-4" key={recipe.id}>
              <RecipeCard recipe={recipe}/>
              <button onClick={()=>removeFavorite(recipe.id)}>Remove</button>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no favorite recipes yet.</p> //message for empty favorites
      )}
    </div>
  );
};

export default FavoriteRecipesPage;
