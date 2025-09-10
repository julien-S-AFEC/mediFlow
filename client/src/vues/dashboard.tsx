import "./dashboard.css";
import Header from "../components/header";
import ErrorWidget from "../components/errorWidget";
import { LuUsersRound } from "react-icons/lu";
import { FaHouseMedicalFlag } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { RiArchiveStackLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { User } from "../types";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState<User>();
  const [iconSize, setIconSize] = useState<number>(100);
  const [warningVis, setWarningVis] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>();

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/getCurrentUser", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setUser(data.user);
      });

    if (window.screen.width < 950) {
      setIconSize(50);
    }
  }, []);

  const sendAnotherEmail = () => {
    fetch("http://localhost:3000/api/users/sendAnotherVerificationEmail", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if ( data && data.status === "success") {
          setWarningVis(true);
          setErrorText("Email successfully sent.");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    if (window.screen.width < 950) {
      setIconSize(50);
    }
  }

  return (
    <div id="dashRoot" className="d-flex flex-column min-vh-100">
      {warningVis && <ErrorWidget message={errorText} />}
      {user?.is_verified ? (
        <>
          <Header />
          <div className="d-flex flex-column align-items-center gap-4 mt-5">
            {user && <h3 className="main-font fw-light text-center">Hello {user.username}</h3>}
            <div className="d-flex gap-4">
              <div className="d-flex flex-column align-items-center justify-content-center shadow rounded-4 px-5 py-4 icon-hovered">
                <Link to="/patients">
                  <LuUsersRound size={iconSize} color="rgb(0, 202, 27)" />
                </Link>
                <div className="main-font fw-light">Patients</div>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center shadow rounded-4 px-5 py-4 icon-hovered">
                <Link to="/institutes">
                  <FaHouseMedicalFlag size={iconSize} color="rgba(241, 239, 89, 1)" />{" "}
                </Link>
                <div className="main-font fw-light">Institutes</div>
              </div>
            </div>
            <div className="d-flex gap-4">
              <div className="d-flex flex-column align-items-center justify-content-center shadow rounded-4 px-5 py-4 icon-hovered">
                <Link to="/doctors">
                  <FaUserDoctor size={iconSize} color="rgba(89, 129, 241, 1)" />
                </Link>
                <div className="main-font fw-light">Doctors</div>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center shadow rounded-4 px-5 py-4 icon-hovered">
                <Link to="/archivedPatients">
                  <RiArchiveStackLine size={iconSize} color="rgba(255, 59, 59, 1)" />
                </Link>
                <div className="main-font fw-light">Archives</div>
              </div>
            </div>
            <div className="d-flex gap-4">
              <div className="shadow rounded-4 py-2 px-5 pe-auto icon-hovered">
                <Link to="/settings">
                  <CiSettings size={iconSize / 2} color="rgba(89, 129, 241, 1)" />
                </Link>
              </div>
            </div>
            {/* <Footer/> */}
          </div>
        </>
      ) : (
        <div className="text-center mt-5">
          <div className="main-font">A verification email has been sent to your email address. Your account is not yet verified. Please check your inbox to complete the verification.</div>
          <div className="btn btn-primary mt-3" onClick={sendAnotherEmail}>
            Send another verification email
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
