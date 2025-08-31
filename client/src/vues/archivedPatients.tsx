import React, { useEffect, useState } from "react";
import { Permissions } from "../types.ts";
import ArchivedPatientTable from "../components/patients/archivedPatientTable.tsx";
import Header from "../components/header";
import './archivedPatients.css'

const Dashboard: React.FC = () => {
  const [permissions, setPermissions] = useState<Permissions>();
  const [refreshDashboard, setRefreshDashboard] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/users/getCurrentUserPermissions", { method: "GET", credentials: "include", headers: { "Content-type": "application/json" } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => setPermissions(data))

  }, []);

  return (
    <div className="container-fluid" id="archivedPatientRoot">
      <Header />
      <h2 className="main-font fw-light text-center">Archived patients</h2>
      <ArchivedPatientTable refreshState={refreshDashboard} refreshHandler={setRefreshDashboard} permissions={permissions} />
    </div>
  );
};

export default Dashboard;
