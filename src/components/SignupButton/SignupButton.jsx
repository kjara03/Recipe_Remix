import "./SignupButton.css";

const SignupButton = () => {
  return (
    <button
      className="btn signup-button"
      data-bs-toggle="modal"
      data-bs-target="#signup-modal"
    >
      Sign Up
    </button>
  );
};

export default SignupButton;
