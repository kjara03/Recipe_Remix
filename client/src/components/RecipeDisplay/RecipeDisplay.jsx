import "./RecipeDisplay.css";
import FavoriteIcon from "../FavoriteIcon/FavoriteIcon";
import MacroNutrientPieChart from "../MacroNutrientPieChart/MacroNutrientPieChart";
import errorImage from "../../assets/errorimage.png";
import PropTypes from "prop-types";

const RecipeDisplay = (props) => {
  const {
    cookTime,
    cuisineType,
    dietLabels,
    dishTypes,
    image,
    ingredients,
    instructions,
    name,
    nutrients,
    servings,
    url,
  } = props;

  // Function to capialize the first letter of a string
  function captializeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="container recipe-display-container">
      <div className="recipe-display-header">
        <img
          className="recipe-display-img"
          src={image || errorImage}
          alt={name}
          onError={(event) => {
            event.target.src = errorImage;
          }}
        />
        <div className="recipe-display-description">
          <div className="d-flex align-items-center gap-4">
            <h2 className="mb-0">{name}</h2>
            <FavoriteIcon />
          </div>
          {cuisineType.length > 0 && (
            <div>
              Cuisine type:{" "}
              {cuisineType
                .map((cuisine) => captializeFirstLetter(cuisine))
                .join(", ")}
            </div>
          )}
          {dietLabels.length > 0 && (
            <div>
              Diet Labels:{" "}
              {dietLabels
                .map((label) => captializeFirstLetter(label))
                .join(", ")}
            </div>
          )}
          {dishTypes.length > 0 && (
            <div>
              Dish type:{" "}
              {dishTypes.map((dish) => captializeFirstLetter(dish)).join(", ")}
            </div>
          )}
          <div>Servings: {servings}</div>
          <div>Total Cook time: {cookTime} minutes</div>
          {url && <a href={url}>Find detailed step-by-step guide.</a>}
        </div>
      </div>
      <div className="recipe-display-body">
        <div className="recipe-details">
          {ingredients.length > 0 && (
            <div className="recipe-ingredients-list">
              <h5>Ingredients needed</h5>
              <ul>
                {ingredients.map((ingredient) => {
                  return <li key={ingredient.id}>{ingredient.original}</li>;
                })}
              </ul>
            </div>
          )}
          {instructions.length > 0 && (
            <div className="recipe-instructions">
              <h5>How to Prepare This Dish</h5>
              <ol>
                {instructions[0].steps.map((instruction) => {
                  return <li key={instruction.number}>{instruction.step}</li>;
                })}
              </ol>
            </div>
          )}
        </div>
        <MacroNutrientPieChart
          unit={nutrients.weightPerServing.unit}
          carbs={nutrients.caloricBreakdown.percentCarbs}
          fats={nutrients.caloricBreakdown.percentFat}
          proteins={nutrients.caloricBreakdown.percentProtein}
        />
      </div>
    </div>
  );
};

RecipeDisplay.propTypes = {
  cookTime: PropTypes.number.isRequired,
  cuisineType: PropTypes.array.isRequired,
  dietLabels: PropTypes.array.isRequired,
  dishTypes: PropTypes.array.isRequired,
  image: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  instructions: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  nutrients: PropTypes.object.isRequired,
  servings: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

export default RecipeDisplay;
