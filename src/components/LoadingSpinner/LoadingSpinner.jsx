import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-icon Loading">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
