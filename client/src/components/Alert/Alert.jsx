import "./Alert.css";
import useAlert from "../../context/AlertContext";

const Alert = () => {
  const { alert } = useAlert();

  return (
    <div
      className={`alert alert-${alert.status} ${alert.show ? "show" : "hide"}`}
      role="alert"
    >
      {alert.text}
    </div>
  );
};

export default Alert;
