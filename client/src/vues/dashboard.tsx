import "./dashboard.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { LuUsersRound } from "react-icons/lu";
import { FaHouseMedicalFlag } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { RiArchiveStackLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../types";

const Dashboard = () => {
  const [user, setUser] = useState<User>();
  const [iconSize, setIconSize] = useState<number>(100);

  useEffect(() => {
    fetch("https://mediflow-vgtc.onrender.com/api/auth/getCurrentUser", { method: "GET", headers: { "Content-type": "application/json" }, credentials: "include" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setUser(data.user));
    if (window.screen.width < 950) {
      setIconSize(50);
    }
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      {user && <h3 className="main-font fw-light text-center">Hello {user.username}</h3>}
      <div className="d-flex flex-column align-items-center gap-4 mt-5">
        <div className="d-flex flex-row flex-xl-row gap-4">
          <div className="shadow rounded-4 p-5 pe-auto icon-hovered">
            <Link to="/patients">
              <LuUsersRound size={iconSize} color="rgb(0, 202, 27)" />
            </Link>
          </div>
          <div className="shadow rounded-4 p-5 pe-auto icon-hovered">
            <Link to="/institutes">
              <FaHouseMedicalFlag size={iconSize} color="rgba(241, 239, 89, 1)" />{" "}
            </Link>
          </div>
        </div>
        <div className="d-flex gap-4">
          <div className="shadow rounded-4 p-5 pe-auto icon-hovered">
            <Link to="/doctors">
              <FaUserDoctor size={iconSize} color="rgba(89, 129, 241, 1)" />
            </Link>
          </div>
          <div className="shadow rounded-4 p-5 pe-auto icon-hovered">
            <Link to="/archivedPatients">
              <RiArchiveStackLine size={iconSize} color="rgba(255, 59, 59, 1)" />
            </Link>
          </div>
        </div>
        <Footer stickyBot={true}/>
      </div>
    </div>
  );
};

export default Dashboard;
