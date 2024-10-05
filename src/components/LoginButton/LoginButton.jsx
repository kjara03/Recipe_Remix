import "./LoginButton.css";

const LoginButton = () => {
  return (
    <button
      className="btn login-button"
      data-bs-toggle="modal"
      data-bs-target="#login-modal"
    >
      Login
    </button>
  );
};

export default LoginButton;
