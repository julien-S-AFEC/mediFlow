import React, { useEffect, useState } from "react";
import { Patient, Permissions } from "../../types.ts";
import Loader from "../loader.tsx";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

type Iprops = {
  refreshState: boolean;
};

const DashboardTable: React.FC<Iprops> = ({ refreshState }) => {
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

  return (
    <div className="table-responsive">
      <table className="table mt-5">
        <thead>
          <tr>
            <th className="main-font fw-light text-nowrap" scope="col">
              id
            </th>
            <th className="main-font fw-light text-nowrap" scope="col">
              Firstname
            </th>
            <th className="main-font fw-light text-nowrap" scope="col">
              Lastname
            </th>
            <th className="main-font fw-light text-nowrap" scope="col">
              Gender
            </th>
            <th className="main-font fw-light text-nowrap" scope="col">
              Birth date
            </th>
            <th className="main-font fw-light text-nowrap" scope="col">
              Adress
            </th>
            <th className="main-font fw-light text-nowrap" scope="col">
              Email
            </th>
            <th className="main-font fw-light text-nowrap" scope="col">
              Insurrance number
            </th>
            <th className="main-font fw-light text-nowrap" scope="col">
              Institute
            </th>
          </tr>
        </thead>
        <tbody>
          {patients ? (
            patients
              .filter((p) => p.active)
              .map((patient) => (
                <tr key={patient.patient_id} onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>
                  <th scope="row">{patient.patient_id}</th>

                  <td className="text-nowrap">{patient.patient_firstname}</td>
                  <td className="text-nowrap">{patient.patient_secondname}</td>
                  <td className="text-nowrap">{patient.gender}</td>
                  <td className="text-nowrap">{new Date(patient.birth_date).toLocaleDateString()}</td>
                  <td className="text-nowrap">{patient.address}</td>
                  <td className="text-nowrap">{patient.email}</td>
                  <td className="text-nowrap">{patient.insurance_number}</td>
                  <td className="text-nowrap">{patient.institute_name || "Not provided"}</td>
                </tr>
              ))
          ) : (
            <Loader />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
