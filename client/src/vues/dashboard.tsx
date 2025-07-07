import React, { useEffect, useState } from "react";
import { Permissions } from "../types.ts";
import DashboardTable from "../components/dashboard/dashboardTable.tsx";
import Header from "../components/header";
import CreatePatient from "../vues/createPatient";
import CreateInstitute from "../vues/createInstitute";
import CreateDoctor from "../vues/createDoctor";

const Dashboard: React.FC = () => {
  const [permissions, setPermissions] = useState<Permissions>();
  const [createPatientVisible, setCreatePatientVisible] = useState<boolean>(false);
  const [createInstituteVisible, setCreateInstituteVisible] = useState<boolean>(false);
  const [createDoctorVisible, setCreateDoctorVisible] = useState<boolean>(false);
  const [refreshDashboard, setRefreshDashboard] = useState<boolean>(false);

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
          <div className="d-flex mx-2 gap-2">
            {Boolean(permissions?.create_patient) && (
              <div className="btn btn-primary text-nowrap" onClick={() => setCreatePatientVisible((oldValue) => !oldValue)}>
                Create patient
              </div>
            )}
            {Boolean(permissions?.create_patient) && (
              <div className="btn btn-primary text-nowrap" onClick={() => setCreateInstituteVisible((oldValue) => !oldValue)}>
                Create institute
              </div>
            )}
            {Boolean(permissions?.create_patient) && (
              <div className="btn btn-primary text-nowrap" onClick={() => setCreateDoctorVisible((oldValue) => !oldValue)}>
                Create Doctor
              </div>
            )}
          </div>
          {createPatientVisible && <CreatePatient visibilityToggler={setCreatePatientVisible} refreshDashboardHandler={setRefreshDashboard} />}
          {createInstituteVisible && <CreateInstitute visibilityToggler={setCreateInstituteVisible} refreshDashboardHandler={setRefreshDashboard} />}
          {createDoctorVisible && <CreateDoctor visibilityToggler={setCreateDoctorVisible} refreshDashboardHandler={setRefreshDashboard} />}
          <DashboardTable refreshState={refreshDashboard} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
