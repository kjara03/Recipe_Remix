import { createContext, useContext } from "react";

export const AuthContext = createContext(); // Context to store authenticated user

// Function to get access to the authenticated user
export default function useAuth() {
  return useContext(AuthContext);
}
