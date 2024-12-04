import "./ChangePassModal.css";
import { useState } from "react";
import useAuth from "../../context/AuthContext";
import useAlert from "../../context/AlertContext";


const ChangePassModal = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const { user } = useAuth();
  const { showAlert } = useAlert();
  
  // Function to update email input
  function updateEmail(event) {
    setEmail(event.target.value);
  }

  // Function to update old password input
  function updateOldPassword(event) {
    setOldPassword(event.target.value);
  }

  // Function to update new password input
  function updateNewPassword(event) {
    setNewPassword(event.target.value);
  }

  // Function to update new password check input
  function updateNewPasswordCheck(event) {
    setNewPasswordCheck(event.target.value);
  }

  // Function to ensure password is strong enough
  function validatePassword() {
    if (!/[a-z]/.test(newPassword)) {
      showAlert(
        "warning",
        "Password must contain at least one lowercase character!"
      );
      return false;
    }
    if (!/[A-Z]/.test(newPassword)) {
      showAlert(
        "warning",
        "Password must contain at least one uppercase character!"
      );
      return false;
    }
    if (!/[0-9]/.test(newPassword)) {
      showAlert("warning", "Password must contain at least one digit!");
      return false;
    }
    if (!/[$@#&!%^*()\-_+=]/.test(newPassword)) {
      showAlert(
        "warning",
        "Password must contain at least one special character!"
      );
      return false;
    }
    return true;
  }

  // Function to change password
  async function setpass(event) {
    event.preventDefault();
    if (validatePassword() && (newPassword == newPasswordCheck)) {
        try {
          const response = await fetch("/api/user/changepass", {
            method: "POST",
            body: JSON.stringify({
					    email: email,
              oldPassword: oldPassword,
					    newPassword: newPassword
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
          setEmail("");
          setOldPassword("");
          setNewPassword("");
          setNewPasswordCheck("");
          showAlert("success", "Password Change!");
        } catch (error) {
            showAlert("danger", error.message, 5000);
            console.log("An error occurred:", error.message);
        }
    }
  }

  return (
    <div
      className="modal fade"
      id="changepass-modal"
      tabIndex="-1"
      aria-labelledby="signup1-modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="login-modal-label">
              Change your password
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={setpass}>
            <div className="mb-2">
                <label htmlFor="signup-email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="changepass-email"
                  placeholder="Enter your email"
                  onChange={updateEmail}
                  value={email}
                  maxLength="320"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="signup-email" className="form-label">
                  Current password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="changepass-oldpass"
                  placeholder="Enter your current password"
                  onChange={updateOldPassword}
                  value={oldPassword}
                  maxLength="320"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="signup-password" className="form-label">
                  New password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="changepass-newpass"
                  placeholder="Enter your new password"
                  onChange={updateNewPassword}
                  value={newPassword}
                  minLength="6"
                  maxLength="128"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Retype your new password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="changepass-newpass"
                  placeholder="Retype your new password"
                  onChange={updateNewPasswordCheck}
                  value={newPasswordCheck}
                  maxLength="100"
                  required
                />
              </div>
              <button type="submit" className="btn changepass-button">
                Change
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

};

export default ChangePassModal;