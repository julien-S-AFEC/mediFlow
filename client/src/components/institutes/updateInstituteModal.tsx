import React, { useState } from "react";
import { Institute } from "../../types";

type Iprops = {
  institute?: Institute;
  visHandler: React.Dispatch<React.SetStateAction<boolean>>;
  refreshHandler: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateInstituteCredentials: React.FC<Iprops> = ({ institute, visHandler, refreshHandler }) => {
  const [name, setName] = useState<string>(institute?.institute_name || "");
  const [address, setAddress] = useState<string>(institute?.institute_address || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(institute?.institute_phone_number || "");

  const updateInstituteCredentials = (): void => {
    fetch("http://localhost:3000/api/institutes/updateInstituteCredentialsFromId", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        address: address,
        phoneNumber: phoneNumber,
        id: institute?.inst_id,
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
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content" style={{ backgroundColor: "#d8e7d8" }}>
          <div className="modal-header">
            <h5 className="modal-title">Update Institute</h5>
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
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" placeholder="EHPAD Le Clos Fleuri" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col-12 col-lg-6 pt-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" placeholder="Green" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="col-12 col-lg-6 pt-3">
                  <label className="form-label">Phone number</label>
                  <input type="text" className="form-control" placeholder="0658741..." value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
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

export default UpdateInstituteCredentials;
