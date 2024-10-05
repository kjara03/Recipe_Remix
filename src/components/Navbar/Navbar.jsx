import "./Navbar.css";
import Authentication from "../Authentication/Authentication";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Recipe Remix
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <a className="nav-link" href="recipes.html">
              Recipes
            </a>
            <a className="nav-link" href="favorites.html">
              Favorites
            </a>
            <a className="nav-link" href="about.html">
              About
            </a>
          </div>
          <div className="d-flex">
            <Authentication />
            <button
              className="btn btn-custom"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              Login / Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
