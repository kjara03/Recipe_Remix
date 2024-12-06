import { useState, useEffect } from "react";
import "./AccountPage.css";
import AccountInfo from "../../components/AccountInfo/AccountInfo";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import PasswordChangeModal from "../../components/PasswordChangeModal/PasswordChangeModal";
import useAuth from "../../context/AuthContext";

const AccountPage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Display loading spinner and then show the account page depending on whether user is authenticated
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(!user), 250);
    return () => clearTimeout(timeout);
  }, [user]);

  return (
    <div className="account-page-container">
      {isLoading ? (
        <LoadingSpinner />
      ) : user ? (
        <div>
          <AccountInfo />
          <PasswordChangeModal />
        </div>
      ) : (
        <h2 className="text-center">Log in to see your account!</h2>
      )}
    </div>
  );
};

export default AccountPage;
