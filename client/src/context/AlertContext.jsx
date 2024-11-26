import { createContext, useContext } from "react";

export const AlertContext = createContext(); // Context to store alert

// Function to access the alert
export default function useAlert() {
  return useContext(AlertContext);
}
