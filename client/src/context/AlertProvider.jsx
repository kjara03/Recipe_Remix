import { useState, useRef } from "react";
import { AlertContext } from "./AlertContext";
import PropTypes from "prop-types";

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ status: "", text: "", show: false });
  const timeRef = useRef(null);

  // Function to show the alert for a certain amount of time
  function showAlert(status, message, duration = 3000) {
    // Clear previous alert if they're still showing
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    setAlert({ status: status, text: message, show: true });
    timeRef.current = setTimeout(() => {
      // Hide the alert so the fading animation plays
      setAlert((prevAlert) => ({ ...prevAlert, show: false }));
      // After half a second hide the alert completely
      setTimeout(() => {
        setAlert({ status: "", text: "", show: false });
        timeRef.current = null;
      }, 500);
    }, duration);
  }

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.node,
};

export default AlertProvider;
