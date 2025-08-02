import React, { useState } from "react";

type Iprops = {
  visibilityToggler: React.Dispatch<React.SetStateAction<boolean>>;
  refreshDashboardHandler: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateInstitute: React.FC<Iprops> = ({ visibilityToggler, refreshDashboardHandler }) => {
  const [instituteName, setInstituteName] = useState("");
  const [instituteAdress, setInstituteAdress] = useState("");
  const [institutePhone, setInstitutePhone] = useState("");

  const createInstitute = (): void => {
    fetch("http://localhost:3000/api/institutes/createInstitute", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        instName: instituteName,
        instPhone: instituteAdress,
        instAdress: institutePhone
        
      }),
    }).then(() => {
      setInstituteName("");
      setInstituteAdress("");
      setInstitutePhone("");
      visibilityToggler((oldValue) => !oldValue);
      refreshDashboardHandler((oldValue) => !oldValue);
    });
  }

  return (
    <div className="modal show d-block fade" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content" style={{ backgroundColor: "#d8e7d8" }}>
          <div className="modal-header">
            <h5 className="modal-title">Create New Institute</h5>
            <button type="button" className="btn-close" onClick={() => visibilityToggler((v) => !v)} aria-label="Close" />
          </div>
          <div className="modal-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createInstitute();
                refreshDashboardHandler((oldValue) => !oldValue);
              }}
            >
              <div className="row align-items-center">
                <div className="col-12 col-lg-6 pt-3">
                  <label className="form-label">Name</label>
                  <input type="text" required className="form-control" placeholder="EHPAD du clos fleuri ..." value={instituteName} onChange={(e) => setInstituteName(e.target.value)} />
                </div>
                <div className="col-12 col-lg-6 pt-3">
                  <label className="form-label">Phone number</label>
                  <input type="text" className="form-control" placeholder="00668877..." value={institutePhone} onChange={(e) => setInstitutePhone(e.target.value)} />
                </div>
                <div className="col-12 pt-3">
                  <label className="form-label">Adress</label>
                  <input type="text" required className="form-control" placeholder="83 Camden High Street..." value={instituteAdress} onChange={(e) => setInstituteAdress(e.target.value)} />
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center mt-5">
                <button type="submit" className="btn btn-primary">
                  Create Institute
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

export default CreateInstitute;
