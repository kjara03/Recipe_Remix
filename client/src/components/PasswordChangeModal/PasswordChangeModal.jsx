import "./PasswordChangeModal.css";
import { useState } from "react";
import useAuth from "../../context/AuthContext";
import useAlert from "../../context/AlertContext";

const PasswordChangeModal = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secondaryPassword, setSecondaryPassword] = useState("");
  const { user } = useAuth();
  const { showAlert } = useAlert();

  // Function to update old password input
  function updateOldPassword(event) {
    setOldPassword(event.target.value);
  }

  // Function to update new password input
  function updateNewPassword(event) {
    setNewPassword(event.target.value);
  }

  // Function to update secondary password check input
  function updateSecondaryPassword(event) {
    setSecondaryPassword(event.target.value);
  }

  // Function to ensure password is strong enough
  function validatePassword() {
    if (newPassword !== secondaryPassword) {
      showAlert("warning", "Passwords should be the same!");
      return false;
    }
    if (newPassword === oldPassword) {
      showAlert("warning", "New passwords should be the different!");
      return false;
    }
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

  // Function to change the password
  async function changePassword(event) {
    event.preventDefault();
    if (validatePassword()) {
      try {
        const response = await fetch("/api/user/changepassword", {
          method: "POST",
          body: JSON.stringify({
            userid: user.userid,
            oldPassword: oldPassword,
            newPassword: newPassword,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        if (response.ok) {
          setOldPassword("");
          setNewPassword("");
          setSecondaryPassword("");
          showAlert("success", "Password updated!");
        } else {
          const json = await response.json();
          showAlert("danger", json.message, 5000);
        }
      } catch (error) {
        showAlert("danger", error.message, 5000);
        console.log(error);
      }
    }
  }

  return (
    <div
      className="modal fade"
      id="password-change-modal"
      tabIndex="-1"
      aria-labelledby="password-change-modal-label"
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
            <form onSubmit={changePassword}>
              <div className="mb-2">
                <label htmlFor="signup-email" className="form-label">
                  Current password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="old-password-input"
                  placeholder="Enter your current password"
                  onChange={updateOldPassword}
                  value={oldPassword}
                  minLength="6"
                  maxLength="128"
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
                  id="new-password-input"
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
                  id="secondary-password-input"
                  placeholder="Retype your new password"
                  onChange={updateSecondaryPassword}
                  value={secondaryPassword}
                  minLength="6"
                  maxLength="128"
                  required
                />
              </div>
              <button type="submit" className="btn btn-outline-black">
                Change
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
