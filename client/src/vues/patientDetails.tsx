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
  const [refresh, setRefresh] = useState<boolean>(false)

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
      .then(patient => {
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
      .then((institute) => {
        {
          console.log(institute)
          setInstitute(JSON.parse(institute)); 
          }
      })
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
        {patient ? (
          <div className="row justify-content-center gap-3 mt-5">
            <div className="col-11">
              <Link to="/dashboard" className="btn btn-primary">
                Back
              </Link>
            </div>

            <div className="col-4">
              <PatientDetailsWidget patientId={params.patientId} patient={patient} permissions={permissions} refreshHandler={setRefresh} />
            </div>

            <div className="col-4">
              {doctor && <DoctorDetailsWidget patientId={params.patientId} doctor={doctor} permissions={permissions} refreshHandler={setRefresh} />}
            </div>
            <div className="col-4">
              {institute && <InstituteDetailsWidget patientId={params.patientId} institute={institute} permissions={permissions} refreshHandler={setRefresh} />}
            </div>
          </div >
        ) : (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
            <div className="spinner-border text-primary" role="status" aria-label="Loading..."></div>
          </div>
        )}
      </div>
    </>
  );
};

export default PatientDetails;



// OLD INPUT
//  <div className="row mt-2" key={prop}>
//                 <div className="col-5 fs-light">{snakeCaseToPretty(prop)}</div>
//                 <div className="col-5"> {prop === "birth_date" || prop === "created_at" ? new Date(attr).toLocaleDateString() : attr || "Not provided"}</div>
//                 {permissions?.update_patient ? <CiEdit color="blue" className="col-2" /> : <div></div>}
//               </div>