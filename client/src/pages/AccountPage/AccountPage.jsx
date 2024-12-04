import "./AccountPage.css";
import AccountInfo from "../../components/AccountInfo/AccountInfo";
import ChangePassModal from "../../components/ChangePassModal/ChangePassModal";
import useAuth from "../../context/AuthContext";

const AccountPage = () => {
  const { user } = useAuth();
  
  //return (
  //  <div>
  //    <AccountInfo />
  //    <ChangePassModal />
  //  </div>
  //);

  return (
    <div className="container mt-4">
      {user ? (
        <div>
          <AccountInfo />
          <ChangePassModal />
        </div>
      ) : (
        <h2 className="text-center">Log in to see your account!</h2>
      )}
    </div>
  );
};

export default AccountPage;
