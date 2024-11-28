import "./RecipeCard.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import errorImage from "../../assets/errorimage.png";

const RecipeCard = (props) => {
  const { id, image, name } = props;
  return (
    <div className="card border-dark mb-3 recipe-card">
      <img
        src={image || errorImage}
        className="card-img-top recipe-image"
        alt={name}
        onError={(event) => {
          event.target.src = errorImage;
        }}
      />
      <div className="card-body recipe-card-body">
        <h5 className="card-title">{name}</h5>
      </div>
      <Link className="card-link recipe-link" to={`/recipe/${id}`}>
        Explore Recipe Guide
      </Link>
    </div>
  );
};

RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default RecipeCard;
