import React from "react";
import UserCreationWidget from "../components/createPatientWidget";

const CreatePatient: React.FC = () => {
  return (
    <>
      <div className="d-flex flex-column my-2">
        <h2 className="text-center main-font fw-light text-dark">Create a new patient</h2>
        <div className="container border rounded-5 p-5 bg-primary-color">
          <UserCreationWidget />
        </div>
      </div>
    </>
  );
};

export default CreatePatient;
