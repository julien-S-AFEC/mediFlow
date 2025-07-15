import { useEffect, useState } from "react";
import { User } from "../types";
import Header from "../components/header";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users/getAllWithPermissions", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setUsers(JSON.parse(data));
        console.log(JSON.parse(data));
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (field: string, value: boolean): void => {
    console.log(field, value)
  }

  return (
    <>
      <Header />
      <div className="d-flex flex-column align-items-center gap-3">
        {users &&
          users.map((user) => (
            <div key={user.username} className="d-flex justify-content-around p-1 gap-5">
              <div>{user.username}</div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="switchCheckDefault" onChange={() => handleChange("create_patient", !createPatient)} checked={user.create_patient} />
                <label className="form-check-label" htmlFor="switchCheckDefault">
                  Create patient
                </label>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="switchCheckDefault" onChange={() => handleChange("create_prescription", !createPrescription)} checked={user.create_prescription}/>
                <label className="form-check-label" htmlFor="switchCheckDefault">
                  Create prescription
                </label>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="switchCheckDefault" onChange={() => handleChange("create_prescription_commentary", !createPrescriptionCommentary)} checked={user.create_prescription_commentary}/>
                <label className="form-check-label" htmlFor="switchCheckDefault">
                  Create prescription commentary
                </label>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default UserManagement;
