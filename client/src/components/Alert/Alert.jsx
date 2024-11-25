import "./Alert.css";
import PropTypes from "prop-types";

const Alert = ({ status, text }) => {
  return (
    <div>
      <div className={`alert alert-${status}`} role="alert">
        {text}
      </div>
    </div>
  );
};

Alert.propTypes = {
  status: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Alert;
