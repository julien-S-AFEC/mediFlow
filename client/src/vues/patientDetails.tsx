import React, { useEffect, useState } from "react";
import { Doctor, Institute, Patient, Permissions } from "../types";
import { Link, useParams } from "react-router-dom";
import PatientDetailsWidget from "../components/patients/patientDetailsWidget.tsx";
import DoctorDetailsWidget from "../components/doctors/doctorDetailsWidget.tsx";
import InstituteDetailsWidget from "../components/institutes/instituteDetailsWidget.tsx";
import Header from "../components/header";

const PatientDetails: React.FC = () => {
  const params = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [doctor, setDoctor] = useState<Doctor[]>();
  const [institute, setInstitute] = useState<Institute>();
  const [permissions, setPermissions] = useState<Permissions>();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/patients/getPatientFromId", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ patientId: params.patientId }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((patient) => {
        setPatient(patient);
      })
      .catch((error) => {
        throw error;
      });

    fetch("http://localhost:3000/api/doctors/getDoctorFromPatientId", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ patientId: params.patientId }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((doctor) => {
        setDoctor(JSON.parse(doctor));
      })
      .catch((error) => {
        throw error;
      });

    fetch("http://localhost:3000/api/institutes/getInstituteFromPatientId", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ patientId: params.patientId }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((institute) => setInstitute(JSON.parse(institute)))
      .catch((error) => {
        throw error;
      });

    fetch("http://localhost:3000/api/users/getCurrentUserPermissions", { method: "GET", credentials: "include", headers: { "Content-type": "application/json" } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setPermissions(data));
  }, [refresh]);

  return (
    <>
      <Header />
      <div className="container-fluid">
        <Link to="/dashboard" className="btn btn-primary">
          Back
        </Link>
        <div className="row">
          <div className="col-8 d-flex justify-content-center ">
            <img src="/img/ordo.jpg" alt="" />
          </div>
          <div className="col-4">
            {patient ? (
              <div className="d-flex flex-column gap-3">
                {patient && <PatientDetailsWidget patientId={params.patientId} patient={patient} permissions={permissions} refreshHandler={setRefresh} />}
                {doctor && <DoctorDetailsWidget patientId={params.patientId} doctor={doctor} permissions={permissions} refreshHandler={setRefresh} />}
                {institute && <InstituteDetailsWidget patientId={params.patientId} institute={institute} permissions={permissions} refreshHandler={setRefresh} />}
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                <div className="spinner-border text-primary" role="status" aria-label="Loading..."></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDetails;
