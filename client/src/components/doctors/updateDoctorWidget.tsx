import React, { useEffect, useState } from "react";
import { Doctor } from "../../types";

type Iprops = {
  doctors?: Doctor[];
  permissions?: Permissions;
  patientId?: string;
  visibilityToggler: React.Dispatch<React.SetStateAction<boolean>>;
  refreshHandler: React.Dispatch<React.SetStateAction<boolean>>;
  doctorText: string;
  doctorTextHandler: React.Dispatch<React.SetStateAction<string>>;
};

const UpdateDoctorWidget: React.FC<Iprops> = ({ patientId, visibilityToggler, refreshHandler }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorText, setDoctorText] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/api/doctors/getAll", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setDoctors(JSON.parse(data));
      });
  }, []);

  const updatePatientDoctor = () => {
    fetch("http://localhost:3000/api/patients/updateDoctorFromId", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        doctorId: doctorText.slice(0, 1),
        patientId: patientId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setDoctorText("");
          visibilityToggler(false);
          refreshHandler((oldValue) => !oldValue);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="d-flex flex-column">
      <select className="form-select" value={doctorText} onChange={(e) => setDoctorText(e.target.value)}>
        <option value="">Select doctor</option>
        {doctors &&
          doctors.map((doctor) => (
            <option key={doctor.doctor_id} value={doctor.doctor_id}>
              {doctor.doctor_id + " " + doctor.doctor_firstname + " " + doctor.doctor_secondname}
            </option>
          ))}
      </select>
      <div className="d-flex justify-content-center gap-3 pt-3">
        <div className="btn btn-primary" onClick={updatePatientDoctor}>
          Accept
        </div>
        <div className="btn btn-danger" onClick={() => visibilityToggler(false)}>
          Cancel
        </div>
      </div>
    </div>
  );
};

export default UpdateDoctorWidget;
