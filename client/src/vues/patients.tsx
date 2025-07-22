import React, { useEffect, useState } from "react";
import { Patient as PatientType, Permissions } from "../types.ts";
import PatientsTable from "../components/patients/patientsTable.tsx";
import Header from "../components/header.tsx";
import CreatePatient from "../components/patients/createPatient.tsx";

const Patient: React.FC = () => {
  const [permissions, setPermissions] = useState<Permissions>();
  const [createPatientVisible, setCreatePatientVisible] = useState<boolean>(false);
  const [refreshDashboard, setRefreshDashboard] = useState<boolean>(false);
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/api/users/getCurrentUserPermissions", { method: "GET", credentials: "include", headers: { "Content-type": "application/json" } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setPermissions(JSON.parse(data)));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/patients/getAll", { method: "GET", credentials: "include", headers: { "Content-type": "application/json" } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setPatients(JSON.parse(data));
      });
  }, [refreshDashboard]);

  return (
    <>
      <Header search={search} searchHandler={setSearch} searchVis={true} />
      <div className="d-flex flex-column">
        <div className="d-flex mx-2 gap-2">
          {Boolean(permissions?.create_patient) && (
            <div className="btn btn-outline-primary rounded-3" onClick={() => setCreatePatientVisible((oldValue) => !oldValue)}>
              Create Patient
            </div>
          )}
        </div>
        {createPatientVisible && <CreatePatient visibilityToggler={setCreatePatientVisible} refreshDashboardHandler={setRefreshDashboard} />}
        <PatientsTable patients={patients} search={search} />
      </div>
    </>
  );
};

export default Patient;
