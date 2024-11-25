import { useState, useEffect } from "react";
import "./LoginModal.css";
import Alert from "../Alert/Alert";
import { useCookies } from "react-cookie";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const [cookies, setCookies] = useCookies(["jwt_token"]);

  // Helper function to set the alert
  function showAlert(status, message) {
    setAlert({
      status,
      text: message,
    });
  }

  // Clear the alert automatically after 3 seconds
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // Function to update email input
  function updateEmail(event) {
    setEmail(event.target.value);
  }

  // Function to update password input
  function updatePassword(event) {
    setPassword(event.target.value);
  }

  // Function to sign in
  async function signin(event) {
    event.preventDefault();
    // If the user already has a cookie meaning their are authenticated then don't allow then to login again
    if (cookies.jwt_token) {
      showAlert("warning", "You're already logged in!");
      return;
    }
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
      if (response.status !== 200) {
        showAlert("danger", json.message);
        return;
      }
      // Set up the cookie
      const token = json.token;
      setCookies("jwt_token", token, {
        path: "/",
        secure: true,
        sameSite: "Strict",
      });
      showAlert("success", "Account verifed!");
    } catch (error) {
      showAlert("danger", "error.message");
      console.log("An error occurred:", error.message);
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
      {alert && <Alert {...alert} />}
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
                  maxLength="320"
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
                  minLength="6"
                  maxLength="128"
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
