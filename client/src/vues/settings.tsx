import { useState } from "react";
import UserAccount from "../components/users/userAccount";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Header from "../components/header";
import DisplayWidget from "../components/displayWidget";

const Settings: React.FC = () => {
  const [widgetVis, setWidgetVis] = useState<number>(1);

  return (
    <div className="container-fluid">
      <Header />
      <div className="row p-3">
        <div className="col-lg-2 d-flex flex-column gap-1 justify-content-start align-items-center border-end">
          <Link to="/dashboard" className="btn w-100">
            <IoIosArrowRoundBack size={40} />
          </Link>
          <div className="btn btn-primary w-100 mt-3" onClick={() => setWidgetVis(1)}>
            Account
          </div>
          <div className="btn btn-primary w-100 mt-3" onClick={() => setWidgetVis(2)}>
            Display
          </div>
        </div>
        <div className="col-lg-9 d-flex flex-column p-5">
          {widgetVis === 1 && (
            <div className="d-flex flex-column gap-3">
              <h4 className="main-font fs-light text-center">Account</h4>
              <UserAccount />
            </div>
          )}
          {widgetVis === 2 && (
            <div className="d-flex flex-column gap-3">
              <h4 className="main-font fs-light text-center">Display</h4>
              <DisplayWidget />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
