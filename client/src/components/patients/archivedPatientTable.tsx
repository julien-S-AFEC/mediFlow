import React, { useCallback, useEffect, useState } from "react";
import { Patient, Permissions } from "../../types.ts";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LuUndo } from "react-icons/lu";
import Loading from "../loading.tsx";

type Iprops = {
  refreshState: boolean;
  permissions?: Permissions;
  refreshHandler: React.Dispatch<React.SetStateAction<boolean>>;
};

const ArchivedPatientTable: React.FC<Iprops> = ({ refreshState, refreshHandler, permissions }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const navigate: NavigateFunction = useNavigate();
  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    setMobile(window.screen.width < 950);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/patients/getAll", {
      method: "GET",
      credentials: "include",
      headers: { "Content-type": "application/json" }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setPatients(data);
      });
  }, [refreshState]);

  const unArchivePatient = useCallback((patientId: number): void => {
    fetch("http://localhost:3000/api/patients/unArchivePatientFromId", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        patientId: patientId,
      }),
    }).then(() => refreshHandler((oldValue) => !oldValue));
  }, []);

  return (
    <table className="table table-hover table-responsive mt-5">
      <thead>
        <tr>
          {!mobile && (
            <th className="main-font fw-light" scope="col">
              id
            </th>
          )}
          <th className="main-font fw-light" scope="col">
            Firstname
          </th>
          <th className="main-font fw-light" scope="col">
            Lastname
          </th>
          <th className="main-font fw-light" scope="col">
            Gender
          </th>
          {!mobile && (
            <>
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
              <th className="main-font fw-light" scope="col">
                Restore
              </th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {patients ? (
          patients
            .filter((p) => !p.active)
            .map((patient) => (
              <tr key={patient.patient_id}>
                {!mobile && (
                  <th className="main-font" scope="row">
                    {patient.patient_id}
                  </th>
                )}
                <td className="main-font" onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>
                  {patient.patient_firstname}
                </td>
                <td className="main-font" onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>
                  {patient.patient_secondname}
                </td>
                <td className="main-font" onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>
                  {patient.gender}
                </td>
                {!mobile && (
                  <>
                    <td className="main-font" onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>
                      {new Date(patient.birth_date).toLocaleDateString()}
                    </td>

                    <td className="main-font" onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>
                      {patient.address}
                    </td>
                    <td className="main-font" onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>
                      {patient.email}
                    </td>
                    <td className="main-font" onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>
                      {patient.insurance_number}
                    </td>
                    <td className="main-font" onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>
                      {patient.institute_name || "Not provided"}
                    </td>
                  </>
                )}
                <td>
                  {Boolean(permissions?.create_patient) && (
                    <button className="bg-transparent border-0" onClick={() => unArchivePatient(patient.patient_id)} data-tooltip-id="mediFlowTooltip" data-tooltip-content="Unarchive the patient">
                      <LuUndo />
                    </button>
                  )}
                </td>
              </tr>
            ))
        ) : (
          <Loading />
        )}
      </tbody>
    </table>
  );
};

export default ArchivedPatientTable;
