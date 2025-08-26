import React, { useState } from "react";

type Iprops = {
  visibilityToggler: React.Dispatch<React.SetStateAction<boolean>>;
  refreshDashboardHandler: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateDoctor: React.FC<Iprops> = ({ visibilityToggler, refreshDashboardHandler }) => {
  const [firstname, setFirstname] = useState("");
  const [secondName, setSecondName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [institute, setInstitute] = useState("");

  const createDoctor = (): void => {
    fetch("http://localhost:3000/api/doctors/createDoctor", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        firstname: firstname,
        secondName: secondName,
        address: address,
        email: email,
        phone: phone,
        institute: institute,
      }),
    }).then(() => {
      setFirstname("");
      setSecondName("");
      setAddress("");
      setEmail("");
      setPhone("");
      setInstitute("");
      visibilityToggler((oldValue) => !oldValue);
      refreshDashboardHandler((oldValue) => !oldValue);
    });
  }

  return (
    <div className="modal show d-block fade" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content" style={{ backgroundColor: "#d8e7d8" }}>
          <div className="modal-header">
            <h5 className="modal-title">Create New Doctor</h5>
            <button type="button" className="btn-close" onClick={() => visibilityToggler((v) => !v)} aria-label="Close" />
          </div>

          <div className="modal-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createDoctor();
                refreshDashboardHandler((oldValue) => !oldValue);
              }}
            >
              <div className="row align-items-center">
                <div className="col-12 col-lg-6 pt-3">
                  <label className="form-label">First name</label>
                  <input type="text" required className="form-control" placeholder="Robert" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                </div>
                <div className="col-12 col-lg-6 pt-3">
                  <label className="form-label">Second name</label>
                  <input type="text" className="form-control" placeholder="Duchamp" value={secondName} onChange={(e) => setSecondName(e.target.value)} />
                </div>
                <div className="col-12 pt-3">
                  <label className="form-label">Institute</label>
                  <input type="text" className="form-control" placeholder="Centre clinical ..." value={institute} onChange={(e) => setInstitute(e.target.value)} />
                </div>
                <div className="col-12 pt-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" placeholder="83 Camden High Street..." value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="col-12 pt-3">
                  <label className="form-label">Email</label>
                  <input type="text" className="form-control" placeholder="robertDuchamp@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="col-12 pt-3">
                  <label className="form-label">Phone number</label>
                  <input type="text" className="form-control" placeholder="0330..." value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center mt-5">
                <button type="submit" className="btn btn-primary">
                  Create doctor
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

export default CreateDoctor;
