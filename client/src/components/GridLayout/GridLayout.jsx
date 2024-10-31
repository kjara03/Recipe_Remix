import "./GridLayout.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import IngredientMenu from "../IngredientMenu/IngredientMenu";
import PropTypes from "prop-types";

const GridLayout = ({ recipes }) => {
  return (
    <>
      {recipes && recipes.length > 0 && (
        <div className="container">
          <div className="mt-3 mb-3">
            <IngredientMenu />
          </div>
          <div className="row">
            {recipes.map((card, id) => (
              // Adjust to different screen size
              <div className="col-lg-3 col-md-4 col-6 mb-4" key={id}>
                <RecipeCard {...card} />
              </div>
            ))}
          </div>{" "}
        </div>
      )}
    </>
  );
};

GridLayout.propTypes = {
  recipes: PropTypes.array,
};

export default GridLayout;
