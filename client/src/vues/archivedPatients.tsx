import React, { useEffect, useState } from "react";
import { Permissions } from "../types.ts";
import ArchivedPatientTable from "../components/patients/archivedPatientTable.tsx";
import Header from "../components/header";
import CreatePatient from "../vues/createPatient";

const Dashboard: React.FC = () => {
  const [permissions, setPermissions] = useState<Permissions>();
  const [createPatientVisible, setCreatePatientVisible] = useState<boolean>(false);
  const [refreshDashboard, setRefreshDashboard] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/users/getCurrentUserPermissions", { method: "GET", credentials: "include", headers: { "Content-type": "application/json" } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => setPermissions(JSON.parse(data)))

  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="d-flex flex-column">
          {createPatientVisible && <CreatePatient visibilityToggler={setCreatePatientVisible} refreshDashboardHandler={setRefreshDashboard} />}
          <ArchivedPatientTable refreshState={refreshDashboard} refreshHandler={setRefreshDashboard} permissions={permissions} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
