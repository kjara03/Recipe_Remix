import { useState } from "react";
import "./SignupForm.css";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // Function to update email input
  function updateEmail(event) {
    setEmail(event.target.value);
  }

  // Function to update password input
  function updatePassword(event) {
    setPassword(event.target.value);
  }

  // Function to update username input
  function updateUsername(event) {
    setUsername(event.target.value);
  }

  // Function to make sure the email is valid
  function validateEmail() {
    // Do this
    return true;
  }

  // Function to ensure password is strong
  function validatePassword() {
    // Do this
    return true;
  }

  // Function to ensure username is appropriate
  function validateUsername() {
    // Do this
    return true;
  }

  // Function to valid the form details
  function validateForm() {
    return validateEmail() && validatePassword() && validateUsername();
  }

  // Function to create a user
  async function signup(event) {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("/user", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            username: username,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        // Check if the response indicates a duplicate (status 409)
        if (response.status === 409) {
          console.log("This email is already registered.");
          return;
        }
        const json = await response.json();
        if (json.error) {
          console.log("Error details:", json.error.details);
        } else {
          console.log("User created successfully:", json);
        }
      } catch (error) {
        console.log("An error occurred:", error.message);
      }
    }
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
            <form onSubmit={signup}>
              <div className="mb-2">
                <label htmlFor="signup-email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="signup-email"
                  placeholder="Enter your email"
                  onChange={updateEmail}
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
                  onChange={updatePassword}
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
                  onChange={updateUsername}
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
