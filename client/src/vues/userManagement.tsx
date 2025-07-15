import { useEffect, useState } from "react";
import { User } from "../types";
import Header from "../components/header";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [createPatient, setCreatePatient] = useState<boolean>()
  const [createPrescription, setCreatePrescription] = useState<boolean>()
  const [createPrescriptionCommentary, setCreatePrescriptionCommentary] = useState<boolean>()

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
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (permissionId: number, field: string, value: boolean): void => {
    fetch("http://localhost:3000/api/users/updatePermissionFromName", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        permissionId: permissionId,
        field: field,
        value: value
      })
    })
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
                <input className="form-check-input" type="checkbox" role="switch" id="switchCheckDefault" onChange={(e) => handleChange(user.permission_id, "create_patient", e.target.checked)} defaultChecked={user.create_patient} />
                <label className="form-check-label" htmlFor="switchCheckDefault">
                  Create patient
                </label>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="switchCheckDefault" onChange={(e) => handleChange(user.permission_id, "create_prescription", e.target.checked)} defaultChecked={user.create_prescription} />
                <label className="form-check-label" htmlFor="switchCheckDefault">
                  Create prescription
                </label>
              </div>
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="switchCheckDefault" onChange={(e) => handleChange(user.permission_id, "create_prescription_commentary", e.target.checked)} defaultChecked={user.create_prescription_commentary} />
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
