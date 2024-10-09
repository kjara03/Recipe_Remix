import "./NotFoundPage.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found-background">
      <div className="card not-found-card">
        <div className="card-body">
          <h5 className="card-title">Not Found</h5>
          <p className="card-text">
            Thanks for visiting the site, but the page doesn&apos;t exist.
          </p>
          <Link to="/" className="card-link">
            Home
          </Link>
          <Link to="/explore" className="card-link">
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
