import React, { useEffect, useState } from "react";
import { Institute, Doctor } from "../../types";

type Iprops = {
  visibilityToggler: React.Dispatch<React.SetStateAction<boolean>>;
  refreshDashboardHandler: React.Dispatch<React.SetStateAction<boolean>>
};

const CreatePatient: React.FC<Iprops> = ({ visibilityToggler, refreshDashboardHandler }) => {
  const date = new Date();
  const [firstNameText, setFirstNameText] = useState("");
  const [secondNameText, setSecondNameText] = useState("");
  const [genderText, setGenderText] = useState("");
  const [birthDateText, setBirthDateText] = useState(date.toISOString().slice(0, 10));
  const [addressText, setAddresText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [insuranceText, setInsuranceText] = useState("");
  const [institutes, setInstitute] = useState<Institute[]>([]);
  const [instituteText, setInstituteText] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorText, setDoctorText] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/institutes/getAll", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((data) => setInstitute(data));

    fetch("http://localhost:3000/api/doctors/getAll", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(data => { setDoctors(data) });
  }, []);

  const createPatient = (): void => {

    fetch("http://localhost:3000/api/patients/createPatient", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        patient_firstname: firstNameText,
        patient_secondname: secondNameText,
        gender: genderText,
        birth_date: birthDateText,
        address: addressText,
        email: emailText,
        insurance_number: insuranceText,
        institute: instituteText,
        doctor: doctorText,
        created_at: new Date()
          .toLocaleString("fr-FR", { timeZone: "UTC" })
          .replace(/\//g, '-')
          .replace(',', '')
      }),
    }).then(() => {
      setFirstNameText("");
      setSecondNameText("");
      setGenderText("");
      setBirthDateText(date.toISOString().slice(0, 10));
      setAddresText("");
      setEmailText("");
      setInsuranceText("");
      setInstituteText("");
      setDoctorText("");
      visibilityToggler((oldValue) => !oldValue);
      refreshDashboardHandler((oldValue) => !oldValue);
    });
  }

  return (
    <div className="modal show d-block fade" tabIndex={-1} role="dialog">
      <div className="modal-dialog " role="document">
        <div className="modal-content" style={{ backgroundColor: "#d8e7d8" }}>
          <div className="modal-header">
            <h5 className="modal-title">Create New Patient</h5>
            <button type="button" className="btn-close" onClick={() => visibilityToggler((v) => !v)} aria-label="Close" />
          </div>

          <div className="modal-body">
            <form onSubmit={(e) => {
              e.preventDefault();
              createPatient();
              refreshDashboardHandler((oldValue) => !oldValue);
            }}>
              <div className="row align-items-center">
                <div className="col-6 pt-3">
                  <label className="form-label">Firstname</label>
                  <input type="text" required className="form-control" placeholder="Eva" value={firstNameText} onChange={(e) => setFirstNameText(e.target.value)} />
                </div>
                <div className="col-6 pt-3">
                  <label className="form-label">Secondname</label>
                  <input type="text" required className="form-control" placeholder="Green" value={secondNameText} onChange={(e) => setSecondNameText(e.target.value)} />
                </div>
                <div className="col-6 pt-3">
                  <label className="form-label">Gender</label>
                  <select className="form-select" required value={genderText} onChange={(e) => setGenderText(e.target.value)}>
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="col-6 pt-3">
                  <label className="form-label">Birth date</label>
                  <input type="date" className="form-control" value={birthDateText} onChange={(e) => setBirthDateText(e.target.value)} />
                </div>
                <div className="col-12 pt-3">
                  <label className="form-label">Address</label>
                  <textarea className="form-control" placeholder="83 Camden High Street..." value={addressText} onChange={(e) => setAddresText(e.target.value)} />
                </div>
                <div className="col-6 pt-3">
                  <label className="form-label">Email address</label>
                  <input type="email" className="form-control" placeholder="evaGreen@gmail.com" value={emailText} onChange={(e) => setEmailText(e.target.value)} />
                </div>
                <div className="col-6 pt-3">
                  <label className="form-label">Insurance number</label>
                  <input type="text" className="form-control" placeholder="1234567891234" value={insuranceText} onChange={(e) => setInsuranceText(e.target.value.replace(/\s/g, ""))} />
                </div>
                <div className="col-6 pt-3">
                  <label className="form-label">Institute</label>
                  <select className="form-select" value={instituteText} onChange={(e) => setInstituteText(e.target.value)}>
                    <option value="">Select institute</option>
                    {institutes.map((institute) => (
                      <option key={institute.inst_id} value={institute.inst_id}>
                        {institute.inst_id + " " + institute.institute_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-6 pt-3">
                  <label className="form-label">Doctor</label>
                  <select className="form-select" value={doctorText} onChange={(e) => setDoctorText(e.target.value)}>
                    <option value="">Select doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.doctor_id} value={doctor.doctor_id}>
                        {doctor.doctor_id + " " + doctor.doctor_firstname + " " + doctor.doctor_secondname}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center mt-5">
                <button type="submit" className="btn btn-primary" >
                  Create Patient
                </button>
                <button type="button" className="btn btn-danger" onClick={() => visibilityToggler((v) => !v)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePatient;
