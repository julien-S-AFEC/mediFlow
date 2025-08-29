import { useEffect, useState } from "react";
import { User } from "../../types";
import ErrorWidget from "../errorWidget";

const UserAccount: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [isNameDisabled, setIsNameDisabled] = useState<boolean>(true);
  const [isEmailDisabled, setIsEmailDisabled] = useState<boolean>(true);
  const [isPasswordDisabled, setIsPasswordDisabled] = useState<boolean>(true);
  const [warningMessage, setWarningMessage] = useState<string>();
  const [isWarningVisible, setIsWarningVisible] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/getCurrentUser", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setCurrentUser(data.user);
        setName(data.user.username);
        setEmail(data.user.user_email);
      })
      .catch((error) => console.log(error));
  }, []);

  const changeName = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/users/changeNameFromId", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        userId: currentUser.user_id,
        newName: name,
      }),
    })
      .then(() => {
        setWarningMessage("Name successfully updated.");
        setIsWarningVisible(true);
      })
      .catch((error) => console.log(error));
  };

  const changeEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/users/changeEmailFromId", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        userId: currentUser.user_id,
        newEmail: email,
      }),
    })
      .then(() => {
        setWarningMessage("Email successfully updated.");
        setIsWarningVisible(true);
      })
      .catch((error) => console.log(error));
  };

  const changePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/users/changePasswordFromId", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        userId: currentUser.user_id,
        newPassword: password,
      }),
    })
      .then(() => {
        setPassword("");
        setWarningMessage("Password successfully updated.");
        setIsWarningVisible(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {currentUser && (
        <form action="#" className="d-flex flex-column justify-content-between align-items-center gap-4">
          {isWarningVisible && <ErrorWidget message={warningMessage} />}
          <div key={currentUser.user_id} className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-1">
              <label htmlFor="" className="main-font">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setIsNameDisabled(false);
                }}
                className="form-control"
              />
              <button className="btn btn-primary" disabled={isNameDisabled} onClick={changeName}>
                Change name
              </button>
            </div>
            <div className="d-flex flex-column gap-1">
              <label htmlFor="" className="main-font">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsEmailDisabled(false);
                }}
                className="form-control"
              />
              <button className="btn btn-primary" disabled={isEmailDisabled} onClick={changeEmail}>
                Change email
              </button>
            </div>
            <div className="d-flex flex-column gap-1">
              <label htmlFor="" className="main-font">
                New password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsPasswordDisabled(false);
                }}
              />
              <button className="btn btn-primary" disabled={isPasswordDisabled} onClick={changePassword}>
                Change password
              </button>
            </div>
            <hr className="w-100" />
            <h4 className="main-font fs-light">Permissions</h4>
            <div className="d-flex gap-3 align-items-center">
              <div className="main-font">Can create a patient: </div>
              <div>{currentUser.create_patient ? "True" : "False"}</div>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <div className="main-font">Can create a prescription: </div>
              <div>{currentUser.create_prescription ? "True" : "False"}</div>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <div className="main-font">Can create a prescription commentary: </div>
              <div>{currentUser.create_prescription_commentary ? "True" : "False"}</div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default UserAccount;
