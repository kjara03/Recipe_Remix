import { useState } from "react";
import "./LoginModal.css";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to update email input
  function updateEmail(event) {
    setEmail(event.target.value);
  }

  // Function to update password input
  function updatePassword(event) {
    setPassword(event.target.value);
  }

  // Function to valid the login details
  function validateLogin(event) {
    event.preventDefault();
    console.log("Checking sign up details.");
    validateEmail();
    validatePassword();
  }

  // Function to make sure the email is valid
  function validateEmail() {
    // Do this
  }

  // Function to ensure password is strong
  function validatePassword() {
    // Do this
  }

  return (
    <div
      className="modal fade"
      id="login-modal"
      tabIndex="-1"
      aria-labelledby="login-modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="login-modal-label">
              Login or Sign Up
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Login or sign up to access your favorite recipes!</p>
            <form onSubmit={validateLogin}>
              <div className="mb-2">
                <label htmlFor="login-email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="login-email"
                  placeholder="Enter your email"
                  onChange={updateEmail}
                  value={email}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="login-password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="login-password"
                  placeholder="Enter your password"
                  onChange={updatePassword}
                  value={password}
                  required
                />
              </div>
              <button type="submit" className="btn login-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
