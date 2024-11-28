import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "./AuthContext";
import PropTypes from "prop-types";

const AuthProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookies, removeCookies] = useCookies(["jwt_token"]);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Update the user if there is a change in the cookie to update
  useEffect(() => {
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
        console.log(error);
      }
    }
    if (cookies.jwt_token) {
      getUserData(cookies.jwt_token);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [cookies.jwt_token, removeCookies]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
