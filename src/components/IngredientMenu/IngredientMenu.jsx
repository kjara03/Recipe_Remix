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
      />
    </div>
  );
};

export default IngredientMenu;
