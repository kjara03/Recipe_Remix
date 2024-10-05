import "./Navbar.css";
import LoginModal from "../LoginModal/LoginModal";
import LoginButton from "../LoginButton/LoginButton";
import SignupButton from "../SignupButton/SignupButton";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Recipe Remix
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-links"
            aria-controls="navbar-links"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbar-links"
          >
            <div className="navbar-nav text-center">
              <Link className="navbar-link" to="/recipes">
                Recipes
              </Link>
              <Link className="navbar-link" to="/favorites">
                Favorites
              </Link>
              <Link className="navbar-link" to="/about">
                About
              </Link>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-3">
              <LoginButton />
              <SignupButton />
            </div>
          </div>
        </div>
      </nav>
      <LoginModal />
    </>
  );
};

export default Navbar;
