import React, { useEffect, useState } from "react";
import { Permissions } from "../types.ts";
import DashboardTable from "../components/dashboard/dashboardTable.tsx";
import Header from "../components/header";
import OptionsWidget from "../components/dashboard/optionsWidget.tsx";
import CreatePatient from "../vues/createPatient";

const Dashboard: React.FC = () => {
  const [permissions, setPermissions] = useState<Permissions>();
  const [dashboardVisible, setDashboardVisible] = useState<boolean>(false);
  const [refreshBashboard, setRefreshDashboard] = useState<boolean>(false);

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
          {dashboardVisible && <CreatePatient visibilityToggler={setDashboardVisible} refreshDashboardHandler={setRefreshDashboard}/>}
          <DashboardTable refreshState={refreshBashboard} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
