import React from "react";
import UserCreationWidget from "../components/patients/createPatientWidget";

type Iprops = {
  visibilityToggler: React.Dispatch<React.SetStateAction<boolean>>
  refreshDashboardHandler: React.Dispatch<React.SetStateAction<boolean>>
}

const CreatePatient: React.FC<Iprops> = ({ visibilityToggler, refreshDashboardHandler }) => {
  return (
    <>
      <UserCreationWidget visibilityToggler={visibilityToggler} refreshDashboardHandler={refreshDashboardHandler} />
    </>
  );
};

export default CreatePatient;
