import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Iprops = {
  search?: string;
  searchHandler?: React.Dispatch<React.SetStateAction<string>> | undefined;
  searchVis?: boolean;
};

const Header: React.FC<Iprops> = ({ search, searchHandler, searchVis = false }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const logOut = useCallback(() => {
    fetch("http://localhost:3000/api/auth/logOut", { method: "GET", headers: { "Content-type": "application/json" }, credentials: "include" }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/isAdmin", { method: "GET", headers: { "Content-type": "application/json" }, credentials: "include" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setIsAdmin(data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-blue-color px-5 py-2 rounded-bottom-4 w-100">
      <div className="container-fluid">
        <div className="navbar-brand p-0">
          <Link to="/dashboard">
            <img src="/logos/logo_shaded.png" alt="mediflow-logo" className="p-0" style={{ width: "5rem", height: "5rem" }} />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link main-font" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link main-font" to="/patients">
                Patients
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link main-font" to="/institutes">
                Institutes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link main-font" to="/doctors">
                Doctors
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link main-font" to="/archivedPatients">
                Archived patients
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link main-font" to="/userManagement">
                  Manage users
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link main-font" to="/settings">
                Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link main-font" to="/" onClick={logOut}>
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
