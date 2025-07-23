import React from "react";
import { snakeCaseToPretty } from "../../utils.tsx";
import UpdateDoctorWidget from "./updateDoctorDropdown.tsx";
import { Doctor, Permissions } from "../../types.ts";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

type Iprops = {
  doctor: Doctor[];
  permissions?: Permissions;
  patientId?: string;
  refreshHandler: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorDetailsWidget: React.FC<Iprops> = ({ doctor, patientId, permissions, refreshHandler }) => {
  const [toggleUpdateDoctor, setToggleUpdateDoctor] = useState<boolean>(false);

  return (
    <>
      {!toggleUpdateDoctor && (
        <div>
          <div className="d-flex align-items-center gap-3">
            <h4 className="maint-font fw-normal text-center main-font">Doctor</h4>
            {Boolean(permissions?.create_patient) && <CiEdit onClick={() => setToggleUpdateDoctor(true)} />}
          </div>
          <div className="p-3 rounded-3 main-font">
            {Boolean(doctor.length) &&
              Object.entries(doctor[doctor.length - 1]).map(([prop, attr]) => {
                return (
                  <div className="row mt-2" key={prop}>
                    <div className="col-5 fs-light">{snakeCaseToPretty(prop)}</div>
                    <div className="col-5"> {attr || "not provided"}</div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {toggleUpdateDoctor && (
        <div className="d-flex flex-column">
          <UpdateDoctorWidget patientId={patientId} visibilityToggler={setToggleUpdateDoctor} refreshHandler={refreshHandler} />
        </div>
      )}
    </>
  );
};

export default DoctorDetailsWidget;
