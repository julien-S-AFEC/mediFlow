import React from "react";
import { snakeCaseToPretty } from "../../utils.tsx";
import { Patient, Permissions } from "../../types.ts";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import UpdatePatientWidget from "./updatePatientWidget.tsx";

type Iprops = {
  patient?: Patient;
  permissions?: Permissions;
  patientId?: string;
  refreshHandler: React.Dispatch<React.SetStateAction<boolean>>;
};

const PatientDetailsWidget: React.FC<Iprops> = ({ patient, patientId, permissions, refreshHandler }) => {
  const [toggleUpdatePatientModal, setToggleUpdatePatientModal] = useState<boolean>(false);

  return (
    <div className="d-flex flex-column gap-1">
      <div className="d-flex align-items-center gap-4">
        <h4 className="main-font fw-normal text-center">Patient</h4>
        {Boolean(permissions?.create_patient) && <CiEdit onClick={() => setToggleUpdatePatientModal(true)} />}
      </div>
      <div className="d-flex flex-column gap-2 p-3 rounded-3">
        {patient &&
          Object.entries(patient)
            .filter(([p, _]) => !["patient_id", "active"].includes(p))
            .map(([prop, attr]) => {
              return (
                <div className="row main-font" key={prop}>
                  <div className="col-5 fs-light">{snakeCaseToPretty(prop)}</div>
                  <div className="col-5"> {prop === "birth_date" || prop === "created_at" ? new Date(attr).toLocaleDateString() : attr || "Not provided"}</div>
                </div>
              );
            })}
      </div>
      {toggleUpdatePatientModal && <UpdatePatientWidget patient={patient} patientId={patientId} visibilityToggler={setToggleUpdatePatientModal} refreshHandler={refreshHandler} />}
    </div>
  );
};

export default PatientDetailsWidget;
