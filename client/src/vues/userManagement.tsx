import { useEffect, useState } from "react";
import { User } from "../types";
import Header from "../components/header";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users/getAllWithPermissions", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      credentials: 'include'
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (permissionId: number, field: string, value: boolean): void => {
    fetch("http://localhost:3000/api/users/updatePermissionFromName", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        permissionId: permissionId,
        field: field,
        value: value,
      }),
    })
    .catch(error => console.log('error -> ', error))
  };

  return (
    <>
      <Header />
      <div className="container align-items-center">
        <h1 className="main-font text-center mb-5">Users</h1>
        {users &&
          users.map((user) => (
            <div key={user.username} className="d-flex flex-column flex-md-row justify-content-around align-items-center p-1 gap-2 gap-md-5 border-bottom mb-3 main-font">
              <div>
                <div>{user.username}</div>
              </div>
              <div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id={`createPatient${user.permission_id}`}
                    onChange={(e) => handleChange(user.permission_id, "create_patient", e.target.checked)}
                    defaultChecked={user.create_patient}
                  />
                  <label className="form-check-label" htmlFor={`createPatient${user.permission_id}`}>
                    Create patient
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id={`createPresc${user.permission_id}`}
                    onChange={(e) => handleChange(user.permission_id, "create_prescription", e.target.checked)}
                    defaultChecked={user.create_prescription}
                  />
                  <label className="form-check-label" htmlFor={`createPresc${user.permission_id}`}>
                    Create prescription
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id={`prescCommInput${user.permission_id}`}
                    onChange={(e) => handleChange(user.permission_id, "create_prescription_commentary", e.target.checked)}
                    defaultChecked={user.create_prescription_commentary}
                  />
                  <label className="form-check-label" htmlFor={`prescCommInput${user.permission_id}`}>
                    Create prescription commentary
                  </label>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default UserManagement;
