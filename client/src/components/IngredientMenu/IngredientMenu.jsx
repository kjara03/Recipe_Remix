import { useState } from "react";
import "./IngredientMenu.css";
import Select from "react-select";

const IngredientMenu = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([
    { value: 1, label: "Chicken" },
    { value: 2, label: "Fish" },
    { value: 3, label: "Apple" },
    { value: 4, label: "Cabbage" },
    { value: 5, label: "Carrot" },
    { value: 6, label: "Beef" },
    { value: 7, label: "Shrimp" },
    { value: 8, label: "Tomatoes" },
    { value: 9, label: "Broccoli" },
    { value: 10, label: "Onions" },
    { value: 11, label: "Mushrooms" },
    { value: 12, label: "Pasta" },
    { value: 13, label: "Butter" },
    { value: 14, label: "Cheese" },
    { value: 15, label: "Olive Oil" },
    { value: 16, label: "Rice" },
    { value: 17, label: "Eggs" },
    { value: 18, label: "Milk" },
    { value: 19, label: "Lemons" },
    { value: 20, label: "Lime" },
    { value: 21, label: "Asparagus" },
    { value: 22, label: "Peppers" },
    { value: 23, label: "Spinach" },
    { value: 24, label: "Potato" },
    { value: 25, label: "Salmon" },
    { value: 26, label: "Steak" },
    { value: 27, label: "Bread" },
    { value: 28, label: "Yogurt" },
    { value: 29, label: "Parmesan" },
    { value: 30, label: "Chocolate" },
    { value: 31, label: "Honey" },
    { value: 32, label: "Baking Powder" },
    { value: 33, label: "Nuts" },
    { value: 34, label: "Sugar" },
    { value: 35, label: "Flour" },
    { value: 36, label: "Heavy Cream" },
    { value: 37, label: "Half & Half" },
    { value: 38, label: "Feta Cheese" },
    { value: 39, label: "Bacon" },
    { value: 40, label: "Seafood" },
    { value: 41, label: "Pesto" },
    { value: 42, label: "Tomato Paste" },
    { value: 43, label: "Celery" },
    { value: 44, label: "Lettuce" },
    { value: 45, label: "Garlic" },
    { value: 46, label: "Seabass" },
    { value: 47, label: "Lobster" },
    { value: 48, label: "Banana" },
    { value: 49, label: "Strawberry" },
    { value: 50, label: "Tumeric" },
    { value: 51, label: "Parsley" },
    { value: 52, label: "Rosemary" },
    { value: 53, label: "Almonds" },
    { value: 54, label: "Orange" },
    { value: 55, label: "Mozzarella" },
    { value: 56, label: "Clams" },
  ]);

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  // Function to fetch possible options available
  const fetchOptions = () => {
    setOptions([]);
  };

  return (
    <div>
      <Select
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        isMulti={true}
        isSearchable={true}
        placeholder="Search/Select ingredients"
      />
    </div>
  );
};


export default IngredientMenu;
