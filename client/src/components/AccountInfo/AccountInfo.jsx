import "./AccountInfo.css";
import profile from "../../assets/tempprofilepic.jpeg";
import { Link } from "react-router-dom";

const AccountInfo = () => {
  return (
    <div className="container border main-card">
      <div className="row">
        <div className="col-4 profile-picture">
          <img src={profile} className="img-fluid border" alt="" />
        </div>
        <div className="col-8 account-bio">
          <p>Name: John Doe</p>
          <p>
            Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <button
          type="button"
          className="btn changepass-button"
          data-bs-toggle="modal"
          data-bs-target="#password-change-modal"
        >
          Reset your Password
        </button>
        <Link className="btn fav-button" to="/favorites">
          Your Favorite Recipes
        </Link>
      </div>
    </div>
  );
};

export default AccountInfo;
