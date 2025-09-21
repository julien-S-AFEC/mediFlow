import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Patient } from "../types";
import { GoArchive } from "react-icons/go";

type Iprops = {
  patient?: Patient;
};

const ConfirmArchiveModal: React.FC<Iprops> = ({ patient }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const archivePatient = useCallback(() => {
    fetch("http://localhost:3000/api/patients/archivePatientFromId", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        patientId: patient?.patient_id,
      }),
    }).then(() => {
      setShow(false);
      navigate("/patients");
    });
  }, []);

  return (
    <>
      <button type="button" className="btn w-100" onClick={() => setShow(true)} data-tooltip-id="mediFlowTooltip" data-tooltip-content="Archive patient">
        <GoArchive color="red" size={30}/>
      </button>

      {show && (
        <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Archive</h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to archive this patient?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={archivePatient}>
                  Confirm
                </button>
                <button type="button" className="btn btn-danger" onClick={() => setShow(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmArchiveModal;
