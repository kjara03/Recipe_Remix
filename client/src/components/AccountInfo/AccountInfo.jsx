import "./AccountInfo.css";
import img from "../../assets/tempprofilepic.jpeg";

const AccountInfo = () => {
  return (
    <div className="container border extraPadding" id="Profile">
      <div className="row extraPadding">
        <div className="col-4" id="ProfilePic">
          <img src={img} className="img-fluid border" alt="" />
        </div>
        <div className="col-8" id="AccountNameBio">
          <p>Name: John Doe</p>
          <p>
            Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <button type="button" className="btn btn-outline-success">
            {" "}
            Your Favorite Recipes{" "}
          </button>
        </div>
      </div>
      <div className="row justify-content-md-center extraPadding">
        <button type="button" className="btn btn-outline-secondary col-4">
          {" "}
          Reset your Password{" "}
        </button>
      </div>
    </div>
  );
};

export default AccountInfo;
