import "./LogoutButton.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import useAlert from "../../context/AlertContext";

const LogoutButton = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookies, removeCookie] = useCookies(["jwt_token"]);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // Function to handle logging out
  function handleLogout() {
    removeCookie("jwt_token", {
      path: "/",
      secure: true,
      sameSite: "Strict",
    });
    navigate("/"); // Go back to home page
    showAlert("success", "Logged out successful!");
  }

  return (
    <button onClick={handleLogout} className="btn logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
