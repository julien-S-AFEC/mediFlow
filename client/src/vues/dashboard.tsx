import React, { useEffect, useState } from "react";
import { Permissions } from "../types.ts";
import DashboardTable from "../components/dashboardTable";
import Header from "../components/header";
import OptionsWidget from "../components/optionsWidget";
import CreatePatient from "../vues/createPatient";

const Dashboard: React.FC = () => {
  const [permissions, setPermissions] = useState<Permissions>();
  const [dashboardVisible, setDashboardVisible] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/users/getCurrentUserPermissions", { method: "GET", credentials: "include", headers: { "Content-type": "application/json" } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setPermissions(data));
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="d-flex flex-column">
          <OptionsWidget permissions={permissions} setDashboardVisibleHandler={setDashboardVisible} />
          {dashboardVisible && <CreatePatient visibilityToggler={setDashboardVisible} />}
          <DashboardTable permissions={permissions} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
