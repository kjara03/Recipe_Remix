import "./RecipeDisplay.css";
import PropTypes from "prop-types";
import MacroNutrientPieChart from "../MacroNutrientPieChart/MacroNutrientPieChart";

const RecipeDisplay = (props) => {
  const {
    calories,
    cuisineType,
    dietLabels,
    dishType,
    image,
    ingredients,
    name,
    nutrients,
    quantity,
    url,
  } = props;
  return (
    <div className="container recipe-display-container">
      <div className="recipe-display-header">
        <img className="recipe-display-img" src={image} alt={name} />
        <div className="recipe-display-description">
          <h2>{name}</h2>
          {cuisineType.length > 0 && (
            <div>Cuisine type: {cuisineType.map((type) => type).join(" ")}</div>
          )}
          {dietLabels.length > 0 && (
            <div>Diet Labels: {dietLabels.map((label) => label).join(" ")}</div>
          )}
          {dishType.length > 0 && (
            <div>Dish type: {dishType.map((type) => type).join(" ")}</div>
          )}
          {ingredients.length > 0 && (
            <div>
              Ingredients:{" "}
              {ingredients.map((ingredient) => ingredient).join(" ")}
            </div>
          )}
          <p>Calories: {calories}</p>
          <p>You will obtain {quantity} of them.</p>
          {url && <a href={url}>Find step-by-step guide.</a>}
        </div>
      </div>
      <div className="recipe-display-body">
        <MacroNutrientPieChart
          carbs={nutrients.CHOCDF}
          fats={nutrients.FAT}
          proteins={nutrients.PROCNT}
        />
      </div>
    </div>
  );
};

RecipeDisplay.propTypes = {
  calories: PropTypes.number.isRequired,
  cuisineType: PropTypes.array.isRequired,
  dietLabels: PropTypes.array.isRequired,
  dishType: PropTypes.array.isRequired,
  image: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  nutrients: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

export default RecipeDisplay;
