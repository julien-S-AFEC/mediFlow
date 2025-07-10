import React, { useEffect, useState } from "react";
import { Patient, Permissions } from "../../types.ts";
import Loader from "../loader.tsx";
import { useNavigate } from "react-router-dom";
import { LuUndo } from "react-icons/lu";

type Iprops = {
  refreshState: boolean;
  permissions?: Permissions;
  refreshHandler: React.Dispatch<React.SetStateAction<boolean>>;
};

const ArchivedPatientTable: React.FC<Iprops> = ({ refreshState, refreshHandler, permissions }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const navigate = useNavigate();

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
  }, [refreshState]);

  const unArchivePatient = (patientId: string): void => {
    fetch("http://localhost:3000/api/patients/unArchivePatientFromId", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        patientId: patientId,
      }),
    }).then(() => refreshHandler((oldValue) => !oldValue));
  };

  return (
    <table className="table table-hover table-responsive mt-5">
      <thead>
        <tr>
          <th className="main-font fw-light" scope="col">
            id
          </th>
          <th className="main-font fw-light" scope="col">
            Firstname
          </th>
          <th className="main-font fw-light" scope="col">
            Lastname
          </th>
          <th className="main-font fw-light" scope="col">
            Gender
          </th>
          <th className="main-font fw-light" scope="col">
            Birth date
          </th>
          <th className="main-font fw-light" scope="col">
            Adress
          </th>
          <th className="main-font fw-light" scope="col">
            Email
          </th>
          <th className="main-font fw-light" scope="col">
            Insurrance number
          </th>
          <th className="main-font fw-light" scope="col">
            Institute
          </th>
        </tr>
      </thead>
      <tbody>
        {patients ? (
          patients
            .filter((p) => !p.active)
            .map((patient) => (
              <tr key={patient.patient_id}>
                <th scope="row">{patient.patient_id}</th>

                <td onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>{patient.patient_firstname}</td>
                <td onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>{patient.patient_secondname}</td>
                <td onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>{patient.gender}</td>
                <td onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>{new Date(patient.birth_date).toLocaleDateString()}</td>
                <td onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>{patient.address}</td>
                <td onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>{patient.email}</td>
                <td onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>{patient.insurance_number}</td>
                <td onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>{patient.institute_name || "Not provided"}</td>
                <td>
                  {permissions && permissions.create_patient ? (
                    <button className="bg-transparent border-0" onClick={() => unArchivePatient(patient.patient_id)}>
                      <LuUndo />
                    </button>
                  ) : null}{" "}
                </td>
              </tr>
            ))
        ) : (
          <Loader />
        )}
      </tbody>
    </table>
  );
};

export default ArchivedPatientTable;
