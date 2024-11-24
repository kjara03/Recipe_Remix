import "./LogoutButton.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const [cookies, setCookies, removeCookie] = useCookies(["jwt_token"]);
  const navigate = useNavigate();

  // Function to handle logging out
  function handleLogout() {
    removeCookie("jwt_token");
    navigate("/"); // Go back to home page
  }

  return (
    <button onClick={handleLogout} className="btn logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
