import "./dashboard.css";
import Header from "../components/header";
import { LuUsersRound } from "react-icons/lu";
import { FaHouseMedicalFlag } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { RiArchiveStackLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../types";

const Dashboard = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/getCurrentUser", { method: "GET", headers: { "Content-type": "application/json" }, credentials: "include" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setUser(data.user));
  }, []);

  return (
    <>
      <Header />
      {user && <h3 className="main-font fw-light text-center">hello {user.username}</h3>}
      <div className="d-flex flex-column align-items-center gap-4 mt-5">
        <div className="d-flex gap-4">
          <div className="border border-black rounded-4 p-5 pe-auto icon-hovered">
            <Link to="/patients">
              <LuUsersRound size={100} />
            </Link>
          </div>
          <div className="border border-black rounded-4 p-5 pe-auto icon-hovered">
            <Link to="/institutes">
              <FaHouseMedicalFlag size={100} />{" "}
            </Link>
          </div>
        </div>
        <div className="d-flex gap-4">
          <div className="border border-black rounded-4 p-5 pe-auto icon-hovered">
            <Link to="/doctors">
              <FaUserDoctor size={100} />
            </Link>
          </div>
          <div className="border border-black rounded-4 p-5 pe-auto icon-hovered">
            <Link to="/archivedPatients">
              <RiArchiveStackLine size={100} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
