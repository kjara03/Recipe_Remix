import "./GridLayout.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import PropTypes from "prop-types";

const GridLayout = ({ recipes }) => {
  return (
    <>
      {recipes && recipes.length > 0 && (
        <div className="container">
          <div className="row justify-content-center">
            {recipes.map((card, id) => (
              <div
                className={`${
                  recipes.length > 1 ? "col-lg-3 col-md-4 col-6" : ""
                } mb-4`}
                key={id}
              >
                <RecipeCard {...card} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

GridLayout.propTypes = {
  recipes: PropTypes.array,
};

export default GridLayout;
