import React, { useEffect, useState } from "react";
import { Institute } from "../../types";

type Iprops = {
  visHandler: React.Dispatch<React.SetStateAction<boolean>>;
  patientId?: string;
  refreshHandler: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateInstituteWidget: React.FC<Iprops> = ({ visHandler, patientId, refreshHandler }) => {
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [instituteText, setInstituteText] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/api/institutes/getAll", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setInstitutes(data);
      });
  }, []);

  const updatePatientInstitute = () => {
    fetch("http://localhost:3000/api/patients/updateInstituteFromId", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        instituteId: instituteText,
        patientId: patientId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          refreshHandler((oldValue) => !oldValue);
          visHandler(false)
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <select className="form-select" value={instituteText} onChange={(e) => setInstituteText(e.target.value)}>
        <option value="">Select institute</option>
        {institutes &&
          institutes.map((institute) => (
            <option key={institute.inst_id} value={institute.inst_id}>
              {institute.inst_id + " " + institute.institute_name}
            </option>
          ))}
      </select>
      <div className="d-flex justify-content-center gap-3 pt-3">
        <div className="btn btn-primary" onClick={updatePatientInstitute}>
          Accept
        </div>
        <div className="btn btn-danger" onClick={() => visHandler(false)}>
          Cancel
        </div>
      </div>
    </>
  );
};

export default UpdateInstituteWidget;
