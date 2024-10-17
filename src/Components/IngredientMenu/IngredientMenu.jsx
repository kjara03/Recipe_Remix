import React, { useState } from "react";
import "./IngredientMenu.css";
import Select from "react-select";


const IngredientMenu = () => {
    
    const options = [
        {value: 1, label: 'Chicken'},
        {value: 2, label: 'Fish'},
        {value: 3, label: 'Apple'},
        {value: 4, label: 'Cabbage'},
        {value: 5, label: 'Carrot'},
    ];

    const [selectedOptions, setSelectedOptions] = useState([])
    const handleChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
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