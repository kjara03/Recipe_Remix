import "./RecipeCard.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RecipeCard = (props) => {
  const { recipe, recipeImg } = props;
  return (
    <div className="card border-dark mb-3 recipe-card">
      <img src={recipeImg} className="card-img-top recipe-image" alt={recipe} />
      <div className="card-body recipe-card-body">
        <h5 className="card-title">{recipe}</h5>
      </div>
      <Link className="card-link recipe-link" to={`/recipe/${recipe}`}>
        Explore Recipe Guide
      </Link>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.string.isRequired,
  recipeImg: PropTypes.string.isRequired,
};

export default RecipeCard;
