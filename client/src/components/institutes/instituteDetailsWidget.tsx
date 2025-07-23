import React from "react";
import { snakeCaseToPretty } from "../../utils.tsx";
import UpdateInstituteWidget from "./updateInstituteDropdown.tsx";
import { Institute, Permissions } from "../../types.ts";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

type Iprops = {
  institute?: Institute;
  permissions?: Permissions;
  patientId?: string;
  refreshHandler: React.Dispatch<React.SetStateAction<boolean>>;
};

const InstituteDetailsWidget: React.FC<Iprops> = ({ institute, patientId, permissions, refreshHandler }) => {
  const [toggleUpdateInstitute, setToggleUpdateInstitute] = useState<boolean>(false);

  return (
    <>
      {!toggleUpdateInstitute ? (
        <div>
          <div className="d-flex align-items-center gap-3">
            <h4 className="maint-font fw-normal text-center main-font">Institute</h4>
            {Boolean(permissions?.create_patient) && (
              <button className="btn m-0 p-0">
                <CiEdit onClick={() => setToggleUpdateInstitute(true)} />
              </button>
            )}
          </div>
          <div className="p-3 rounded-3 shadow main-font">
            {institute &&
              Object.entries(institute).map(([prop, attr]) => {
                return (
                  <div className="row mt-2" key={prop}>
                    <div className="col-5 fs-light">{snakeCaseToPretty(prop)}</div>
                    <div className="col-5"> {attr || "Not provided"}</div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column">
          <UpdateInstituteWidget visHandler={setToggleUpdateInstitute} patientId={patientId} refreshHandler={refreshHandler} />
        </div>
      )}
    </>
  );
};

export default InstituteDetailsWidget;
