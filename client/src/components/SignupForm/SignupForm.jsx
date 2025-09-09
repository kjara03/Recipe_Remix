import { useState } from "react";
import "./SignupForm.css";
import useAlert from "../../context/AlertContext";
import { Filter } from "bad-words";
const API = import.meta.env.VITE_API_BASE_URL || "";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { showAlert } = useAlert();

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

  // Function to ensure email has the correct format
  function validateEmail() {
    const emailTest =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailTest.test(email)) {
      showAlert("warning", "Invalid email format!");
      return false;
    }
    return true;
  }

  // Function to ensure password is strong enough
  function validatePassword() {
    if (!/[a-z]/.test(password)) {
      showAlert(
        "warning",
        "Password must contain at least one lowercase character!"
      );
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      showAlert(
        "warning",
        "Password must contain at least one uppercase character!"
      );
      return false;
    }
    if (!/[0-9]/.test(password)) {
      showAlert("warning", "Password must contain at least one digit!");
      return false;
    }
    if (!/[$@#&!%^*()\-_+=]/.test(password)) {
      showAlert(
        "warning",
        "Password must contain at least one special character!"
      );
      return false;
    }
    return true;
  }

  // Function to ensure username doesn't contain bad language
  function validateUsername() {
    const filter = new Filter();
    if (filter.isProfane(username)) {
      showAlert("warning", "Username cannot contain bad language!");
      return false;
    }
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
        const response = await fetch(`${API}/api/user/register`, {
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
          showAlert("danger", "This email is already registered!", 5000);
        } else if (response.status === 201) {
          // A 201 response indicate the user is created successfully
          showAlert("success", "Account created successfully!");
        }
      } catch (error) {
        showAlert("danger", error.message, 5000);
        console.log(error.message);
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
            <p>Sign up to favorite recipes you like!</p>
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
                  maxLength="320"
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
                  minLength="6"
                  maxLength="128"
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
                  maxLength="100"
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
