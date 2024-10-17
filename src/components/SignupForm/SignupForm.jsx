import { useState } from "react";
import "./SignupForm.css";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Function to update email input
  function UpdateEmail(event) {
    setEmail(event.target.value);
  }

  // Function to update password input
  function UpdatePassword(event) {
    setPassword(event.target.value);
  }

  // Function to update username input
  function UpdateUsername(event) {
    setUsername(event.target.value);
  }

  // Function to valid the form details
  function ValidateForm(event) {
    event.preventDefault();
    console.log("Checking sign up details.");
    ValidateEmail();
    ValidatePassword();
    ValidateUsername();
  }

  // Function to make sure the email is valid
  function ValidateEmail() {
    // Do this
  }

  // Function to ensure password is strong
  function ValidatePassword() {
    // Do this
  }

  // Function to ensure username is appropriate
  function ValidateUsername() {
    // Do this
  }

  return (
    <div
      className="modal fade"
      id="signup-modal"
      tabIndex="-1"
      aria-labelledby="signup-modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="login-modal-label">
              Sign Up
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Sign up to access your favorite recipes!</p>
            <form onSubmit={ValidateForm}>
              <div className="mb-2">
                <label htmlFor="signup-email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="signup-email"
                  placeholder="Enter your email"
                  onChange={UpdateEmail}
                  value={email}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="signup-password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="signup-password"
                  placeholder="Enter your password"
                  onChange={UpdatePassword}
                  value={password}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your username"
                  onChange={UpdateUsername}
                  value={username}
                  required
                />
              </div>
              <button type="submit" className="btn signup-button">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
