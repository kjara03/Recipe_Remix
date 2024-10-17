import "./RecipeCard.css";
import PropTypes from "prop-types";

const RecipeCard = (props) => {
  const { recipeImg, imgDescription, recipe, recipeDescription, recipeLink } =
    props;
  return (
    <div className="card border-dark mb-3 recipe-card">
      <img
        src={recipeImg}
        className="card-img-top recipe-image"
        alt={imgDescription}
      />

      <div className="card-body">
        <h5 className="card-title">{recipe}</h5>
        <p className="card-text">{recipeDescription}</p>
      </div>
      <a href={recipeLink} className="card-link recipe-link">
        Explore Recipe Guide
      </a>
    </div>
  );
};

RecipeCard.propTypes = {
  recipeImg: PropTypes.string.isRequired,
  imgDescription: PropTypes.string.isRequired,
  recipe: PropTypes.string.isRequired,
  recipeDescription: PropTypes.string.isRequired,
  recipeLink: PropTypes.string.isRequired,
};

export default RecipeCard;
