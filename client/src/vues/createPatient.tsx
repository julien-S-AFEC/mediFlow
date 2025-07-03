import React from "react";
import UserCreationWidget from "../components/createPatientWidget";

type Iprops = {
  visibilityToggler: React.Dispatch<React.SetStateAction<boolean>>
}

const CreatePatient: React.FC<Iprops> = ({visibilityToggler}) => {
  return (
    <>

          <UserCreationWidget visibilityToggler={visibilityToggler}/>
    </>
  );
};

export default CreatePatient;
