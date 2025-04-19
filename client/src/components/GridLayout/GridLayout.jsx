import "./GridLayout.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import PropTypes from "prop-types";

const GridLayout = ({ recipes }) => {
  return (
    <>
      {recipes && recipes.length > 0 && (
        <div className="container">
          <div className="row justify-content-center">
            {recipes.map((card) => (
              <div
                className={`${
                  recipes.length === 1
                    ? "col-12"
                    : recipes.length === 2
                    ? "col-6"
                    : "col-6 col-md-4 col-lg-3"
                } mb-4`}
                key={card.id}
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
