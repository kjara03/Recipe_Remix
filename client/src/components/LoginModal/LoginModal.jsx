import { useState } from "react";
import "./LoginModal.css";
import { useCookies } from "react-cookie";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookies] = useCookies(["jwt_token"]);

  // Function to update email input
  function updateEmail(event) {
    setEmail(event.target.value);
  }

  // Function to update password input
  function updatePassword(event) {
    setPassword(event.target.value);
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

  // Function to valid the login details
  function validateLogin() {
    return validateEmail() && validatePassword();
  }

  // Function to sign in
  async function signin(event) {
    event.preventDefault();
    if (validateLogin()) {
      try {
        const response = await fetch("/api/user/login", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const json = await response.json();
        console.log(json);
        if (response.status !== 200) {
          console.log(json.message); // Set the error here
          return;
        }
        // Set up the cookie
        const token = json.token;
        setCookies("jwt_token", token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
      } catch (error) {
        console.log("An error occurred:", error.message);
      }
    }
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
              Login
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Login to access your favorite recipes!</p>
            <form onSubmit={(event) => signin(event)}>
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
