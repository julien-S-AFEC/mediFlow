import React, { useState } from "react";
import { Doctor } from "../../types";

type Iprops = {
  doctor?: Doctor;
  visHandler: React.Dispatch<React.SetStateAction<boolean>>;
  refreshHandler: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateDoctorCredentials: React.FC<Iprops> = ({ doctor, visHandler, refreshHandler }) => {
  const [firstname, setFirstname] = useState<string>(doctor?.doctor_firstname || "");
  const [secondname, setSecondname] = useState<string>(doctor?.doctor_secondname || "");
  const [institute, setinstitute] = useState<string>(doctor?.doctor_institute || "");
  const [address, setAddress] = useState<string>(doctor?.doctor_address || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(doctor?.doctor_phone_number || "");
  const [email, setEmail] = useState<string>(doctor?.doctor_email || "");

  const updateInstituteCredentials = (): void => {
    fetch("http://localhost:3000/api/doctors/updateDoctorCredentialsFromId", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        firstname: firstname,
        secondname: secondname,
        institute: institute,
        address: address,
        phoneNumber: phoneNumber,
        email: email,
        doctorId: doctor?.doctor_id
      }),
    })
      .then(() => {
        refreshHandler((oldValue) => !oldValue);
        visHandler((oldValue) => !oldValue);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="modal show d-block fade" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content" style={{ backgroundColor: "#d8e7d8" }}>
          <div className="modal-header">
            <h5 className="modal-title">Update Doctor</h5>
            <button type="button" className="btn-close" onClick={() => visHandler((v) => !v)} aria-label="Close" />
          </div>

          <div className="modal-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="row align-items-center">
                <div className="col-12 col-lg-6 pt-3">
                  <label className="form-label">Firstname</label>
                  <input type="text" className="form-control" placeholder="Robert" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                </div>
                <div className="col-12 col-lg-6 pt-3">
                  <label className="form-label">Secondname</label>
                  <input type="text" className="form-control" placeholder="Duchamp" value={secondname} onChange={(e) => setSecondname(e.target.value)} />
                </div>
                <div className="col-12 col-lg-6 pt-3">
                  <label className="form-label">Institute</label>
                  <input type="text" className="form-control" placeholder="Centre clinical ..." value={institute} onChange={(e) => setinstitute(e.target.value)} />
                </div>
                <div className="col-12 col-lg-6 pt-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" placeholder="1 rue ..." value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="col-12 col-lg-6 pt-3">
                  <label className="form-label">Phone number</label>
                  <input type="text" className="form-control" placeholder="0658741..." value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="col-12 col-lg-6 pt-3">
                  <label className="form-label">Email</label>
                  <input type="text" className="form-control" placeholder="robert.duchamp@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center mt-5">
                <button type="submit" className="btn btn-primary" onClick={updateInstituteCredentials}>
                  Update
                </button>
                <button type="button" className="btn btn-danger" onClick={() => visHandler((v) => !v)}>
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

export default UpdateDoctorCredentials;
