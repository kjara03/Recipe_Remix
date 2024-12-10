import { useState } from "react";
import "./Searchbar.css";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import useAlert from "../../context/AlertContext";

const Searchbar = () => {
  const [isRecipeMode, setIsRecipeMode] = useState(true); // Two mode: search by recipe name and search by recipe ingredient
  const [searchInput, setSearchInput] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // List of ingredients
  const options = [
    // Proteins
    { value: 1, label: "Chicken" },
    { value: 2, label: "Beef" },
    { value: 3, label: "Pork" },
    { value: 4, label: "Fish" },
    { value: 5, label: "Salmon" },
    { value: 6, label: "Shrimp" },
    { value: 7, label: "Eggs" },
    { value: 8, label: "Lobster" },
    { value: 9, label: "Tofu" },
    { value: 10, label: "Seitan" },
    { value: 11, label: "Bacon" },
    { value: 12, label: "Turkey" },
    // Vegetables
    { value: 13, label: "Carrot" },
    { value: 14, label: "Broccoli" },
    { value: 15, label: "Onion" },
    { value: 16, label: "Potato" },
    { value: 17, label: "Tomato" },
    { value: 18, label: "Cucumber" },
    { value: 19, label: "Spinach" },
    { value: 20, label: "Lettuce" },
    { value: 21, label: "Zucchini" },
    { value: 22, label: "Bell Pepper" },
    { value: 23, label: "Mushrooms" },
    { value: 24, label: "Celery" },
    { value: 25, label: "Garlic" },
    { value: 26, label: "Ginger" },
    { value: 27, label: "Asparagus" },
    { value: 28, label: "Cauliflower" },
    { value: 29, label: "Sweet Potato" },
    // Fruits
    { value: 30, label: "Apple" },
    { value: 31, label: "Banana" },
    { value: 32, label: "Orange" },
    { value: 33, label: "Lemon" },
    { value: 34, label: "Lime" },
    { value: 35, label: "Strawberry" },
    { value: 36, label: "Blueberry" },
    { value: 37, label: "Peach" },
    { value: 38, label: "Pineapple" },
    { value: 39, label: "Avocado" },
    { value: 40, label: "Mango" },
    { value: 41, label: "Grapes" },
    // Grains and Starches
    { value: 42, label: "Rice" },
    { value: 43, label: "Pasta" },
    { value: 44, label: "Bread" },
    { value: 45, label: "Quinoa" },
    { value: 46, label: "Oats" },
    { value: 47, label: "Cornmeal" },
    { value: 48, label: "Flour" },
    { value: 49, label: "Tortilla" },
    // Dairy
    { value: 50, label: "Milk" },
    { value: 51, label: "Cheese" },
    { value: 52, label: "Butter" },
    { value: 53, label: "Yogurt" },
    { value: 54, label: "Cream Cheese" },
    { value: 55, label: "Parmesan" },
    { value: 56, label: "Mozzarella" },
    { value: 57, label: "Heavy Cream" },
    { value: 58, label: "Sour Cream" },
    // Spices and Herbs
    { value: 59, label: "Salt" },
    { value: 60, label: "Black Pepper" },
    { value: 61, label: "Cumin" },
    { value: 62, label: "Paprika" },
    { value: 63, label: "Oregano" },
    { value: 64, label: "Basil" },
    { value: 65, label: "Thyme" },
    { value: 66, label: "Rosemary" },
    { value: 67, label: "Parsley" },
    { value: 68, label: "Cinnamon" },
    { value: 69, label: "Turmeric" },
    { value: 70, label: "Nutmeg" },
    { value: 71, label: "Chili Powder" },
    { value: 72, label: "Coriander" },
    { value: 73, label: "Bay Leaves" },
    { value: 74, label: "Garam Masala" },
    // Condiments
    { value: 75, label: "Ketchup" },
    { value: 76, label: "Mayonnaise" },
    { value: 77, label: "Mustard" },
    { value: 78, label: "Soy Sauce" },
    { value: 79, label: "Hot Sauce" },
    { value: 80, label: "Olive Oil" },
    { value: 81, label: "Vinegar" },
    { value: 82, label: "Honey" },
    { value: 83, label: "Maple Syrup" },
    { value: 84, label: "Peanut Butter" },
    { value: 85, label: "BBQ Sauce" },
    { value: 86, label: "Tahini" },
    // Canned and Packaged Goods
    { value: 87, label: "Canned Tomatoes" },
    { value: 88, label: "Canned Beans" },
    { value: 89, label: "Canned Corn" },
    { value: 90, label: "Chicken Broth" },
    { value: 91, label: "Beef Broth" },
    { value: 92, label: "Coconut Milk" },
    // Baking Essentials
    { value: 93, label: "Baking Powder" },
    { value: 94, label: "Baking Soda" },
    { value: 95, label: "Sugar" },
    { value: 96, label: "Brown Sugar" },
    { value: 97, label: "Vanilla Extract" },
    { value: 98, label: "Chocolate Chips" },
    { value: 99, label: "Yeast" },
    { value: 100, label: "Cocoa Powder" },
  ];

  // Function to update the search mode
  function selectOption(event) {
    event.preventDefault();
    setIsRecipeMode(event.target.innerText === "Recipe");
  }

  // Function to update search input
  function updateSearchInput(event) {
    setSearchInput(event.target.value);
  }

  // Function to ensure input is within 20 characters
  function updateIngredientInput(inputValue) {
    if (inputValue.length <= 20) {
      setIngredientInput(inputValue);
    }
  }

  // Function to search for recipes by navigating to the search page with the search input
  function searchRecipe(event) {
    event.preventDefault();
    // Handle regular recipe search
    if (isRecipeMode) {
      if (searchInput.trim().length > 2) {
        navigate(`/search/recipe?recipe=${searchInput.trim()}`);
      } else {
        showAlert("warning", "Enter at least 3 characters!");
        return;
      }
      setSearchInput("");
    } else {
      if (selectedIngredients.length > 0) {
        const ingredients = selectedIngredients.map(
          (ingredient) => ingredient.label
        );
        navigate(`/search/ingredients?ingredients=${ingredients}`);
      } else {
        showAlert("warning", "Enter at least one ingredient!");
      }
      setSelectedIngredients([]);
    }
  }

  // Function to update the options
  function handleSelected(selectedOptions) {
    if (selectedOptions.length < 11) {
      setSelectedIngredients(selectedOptions);
      setIngredientInput(""); // Reset the input after adding the option
    } else {
      showAlert("warning", "Up to 10 ingredients can be selected!");
    }
  }

  return (
    <search className="search-bar input-group">
      <form
        onSubmit={searchRecipe}
        className="form-outline d-flex justify-content-center align-items-center"
        data-mdb-input-init
      >
        <div className="w-100">
          <div className="tabs-container">
            <button
              type="button"
              className={`tab ${isRecipeMode ? "selected" : ""}`}
              onClick={selectOption}
            >
              Recipe
            </button>
            <button
              type="button"
              className={`tab ${!isRecipeMode ? "selected" : ""}`}
              onClick={selectOption}
            >
              Ingredient
            </button>
          </div>
          <div className="search-input-container">
            {isRecipeMode ? (
              <input
                id="search-input"
                type="search"
                className="form-control"
                placeholder="Search for recipes..."
                minLength="3"
                maxLength="50"
                value={searchInput}
                onChange={updateSearchInput}
              />
            ) : (
              <CreatableSelect
                id="ingredient-input"
                options={options}
                value={selectedIngredients}
                inputValue={ingredientInput}
                onChange={handleSelected}
                onInputChange={updateIngredientInput}
                isMulti={true}
                isSearchable={true}
                placeholder="Select ingredients"
                menuPlacement="auto"
                maxMenuHeight="150"
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary search-button"
          data-mdb-ripple-init
        >
          Search
        </button>
      </form>
    </search>
  );
};

export default Searchbar;
