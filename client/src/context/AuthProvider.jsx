import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [cookies, setCookies, removeCookies] = useCookies(["jwt_token"]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Update the user if there is a change in the cookie to update
  useEffect(() => {
    if (cookies.jwt_token) {
      getUserData(cookies.jwt_token);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [cookies]);

  // Function to verify jwt token to get the user
  async function getUserData(token) {
    try {
      const response = await fetch("/api/user/authentication", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await response.json();
      const currentTime = Math.floor(Date.now() / 1000); // Get the current time in seconds
      // Remove cookie if the token expired
      if (json.user.exp < currentTime) {
        removeCookies("jwt_token");
        return;
      }
      setIsAuthenticated(true);
      setUser(json.user);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
