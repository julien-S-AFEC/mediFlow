import React, { useEffect, useState } from "react";
import { Patient as PatientType, Permissions } from "../types.ts";
import PatientsTable from "../components/patients/patientsTable.tsx";
import Header from "../components/header.tsx";
import CreatePatient from "../components/patients/createPatient.tsx";
import { GoPersonAdd } from "react-icons/go";
import './patients.css'

const Patient: React.FC = () => {
  const [permissions, setPermissions] = useState<Permissions>();
  const [createPatientVisible, setCreatePatientVisible] = useState<boolean>(false);
  const [refreshDashboard, setRefreshDashboard] = useState<boolean>(false);
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [searchPatient, setSearchPatient] = useState<string>("");
  const [filteredPatients, setFilteredPatients] = useState<PatientType[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/api/users/getCurrentUserPermissions", { method: "GET", credentials: "include", headers: { "Content-type": "application/json" } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setPermissions(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/patients/getAll", { method: "GET", credentials: "include", headers: { "Content-type": "application/json" } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setPatients(data.reverse());
        setFilteredPatients(data.reverse());
      });
  }, [refreshDashboard]);

  const filterPatient = (e) => {
    const search = e.target.value;
    const filteredPatients = patients.filter((patient) => {
      return (
        patient.patient_firstname.includes(search) ||
        patient.patient_firstname.includes(search.slice(0, 1).toUpperCase() + search.slice(1)) ||
        patient.patient_secondname.includes(search) ||
        patient.patient_secondname.includes(search.slice(0, 1).toUpperCase() + search.slice(1)) ||
        patient.address?.includes(search) ||
        patient.address?.includes(search.slice(0, 1).toUpperCase() + search.slice(1))
      );
    });

    setFilteredPatients(filteredPatients);
    setSearchPatient(search);
  };

  return (
    <div id="patientRoot">
      <Header search={search} searchHandler={setSearch} searchVis={true} />
      <div className="container-fluid text-center">
        <h2 className="text-center main-font mb-3">Patients</h2>
        <div className="row justify-content-center mb-2">
          <div className="col-10 col-lg-5">
            <input type="text" className="form-control m-0" placeholder="Search for a patient" value={searchPatient} onChange={filterPatient} />
          </div>
        </div>
        {Boolean(permissions?.create_patient) && (
          <div className="btn" onClick={() => setCreatePatientVisible((oldValue) => !oldValue)}>
            <GoPersonAdd size={40} color="blue" />
          </div>
        )}
        {createPatientVisible && <CreatePatient visibilityToggler={setCreatePatientVisible} refreshDashboardHandler={setRefreshDashboard} />}
        <PatientsTable patients={filteredPatients} search={search} />
      </div>
    </div>
  );
};

export default Patient;
