import { useState, useEffect } from "react";
import "./GridLayout.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import pic from "../../assets/cakePic2.jpg";
import pic2 from "../../assets/foodmainpic.jpg";

const GridLayout = () => {
  const [recipes, setRecipes] = useState([
    {
      recipeImg: pic,
      imgDescription: "Cake",
      recipe: "Cake",
      recipeDescription: "This is a cake.",
      recipeLink: "www.cake.com",
    },
    {
      recipeImg: pic2,
      imgDescription: "Cake",
      recipe: "Cake",
      recipeDescription: "This is a cake.",
      recipeLink: "www.cake.com",
    },
    {
      recipeImg: pic,
      imgDescription: "Cake",
      recipe: "Cake",
      recipeDescription: "This is a cake.",
      recipeLink: "www.cake.com",
    },
    {
      recipeImg: pic2,
      imgDescription: "Cake",
      recipe: "Cake",
      recipeDescription:
        "This is a cake.This is a cakThis is a cakThis is a cakThis is a cakThis is a cakThis is a cakThis is a cak.",
      recipeLink: "www.cake.com",
    },
    {
      recipeImg: pic2,
      imgDescription: "Cake",
      recipe: "Cake",
      recipeDescription: "This is a cake.",
      recipeLink: "www.cake.com",
    },
  ]);

  // Function to fetch recipes
  function FetchRecipesFromAPI() {
    setRecipes([]);
  }

  // Fetch data
  useEffect(() => {
    // Get the search parameter and fetch from API
  }, []);

  return (
    <div className="container">
      <div className="row">
        {recipes.map((card, id) => (
          // Adjust to different screen size
          <div className="col-lg-3 col-md-4 col-6 mb-4" key={id}>
            <RecipeCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridLayout;
