import "./AccountInfo.css";
import { Link } from "react-router-dom";
//import profile from "../../assets/defaultprofile.png";

const AccountInfo = () => {
  return (
    <div className="container border main-card">
      <div className="d-flex justify-content-between align-items-center">
        <button
          type="button"
          className="btn change-password-button"
          data-bs-toggle="modal"
          data-bs-target="#password-change-modal"
        >
          Reset your Password
        </button>
        <Link className="btn favorite-button" to="/favorites">
          Your Favorite Recipes
        </Link>
      </div>
    </div>
  );
};

export default AccountInfo;
