import { SetStateAction } from "react";
import { Patient } from "./types";

export const snakeCaseToPretty = (word: string): string => {
  return word
    .split("_")
    .map((word) => {
      return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

export const filterPatient = (search: string, patient: Patient) => {
  if (
    patient.patient_firstname.includes(search) ||
    patient.patient_firstname.includes(search.slice(0, 1).toUpperCase() + search.slice(1)) ||
    patient.patient_secondname.includes(search) ||
    patient.patient_secondname.includes(search.slice(0, 1).toUpperCase() + search.slice(1))
  ) {
    return true;
  }
  return false;
};

export const sortByFirstname = (patients: Patient[], patientHandler: React.Dispatch<Patient[]>, state: boolean, stateHandler: React.Dispatch<SetStateAction<boolean>>) => {
  const newPatients = [...patients];
  if (state) {
    newPatients.sort((a, b) => a.patient_firstname.localeCompare(b.patient_firstname));
  } else {
    newPatients.sort((a, b) => b.patient_firstname.localeCompare(a.patient_firstname));
  }
  patientHandler(newPatients);
  stateHandler((oldValue) => !oldValue);
};

export const sortBySecondname = (patients: Patient[], patientHandler: React.Dispatch<Patient[]>, state: boolean, stateHandler: React.Dispatch<SetStateAction<boolean>>) => {
  const newPatients = [...patients];
  if (state) {
    newPatients.sort((a, b) => a.patient_secondname.localeCompare(b.patient_secondname));
  } else {
    newPatients.sort((a, b) => b.patient_secondname.localeCompare(a.patient_secondname));
  }
  patientHandler(newPatients);
  stateHandler((oldValue) => !oldValue);
};

export const sortByGender = (patients: Patient[], patientHandler: React.Dispatch<Patient[]>, state: boolean, stateHandler: React.Dispatch<SetStateAction<boolean>>) => {
  const newPatients = [...patients];
  if (state) {
    newPatients.sort((a, b) => a.gender.localeCompare(b.gender));
  } else {
    newPatients.sort((a, b) => b.gender.localeCompare(a.gender));
  }
  patientHandler(newPatients);
  stateHandler((oldValue) => !oldValue);
};

export const sortByBirthDate = (patients: Patient[], patientHandler: React.Dispatch<Patient[]>, state: boolean, stateHandler: React.Dispatch<SetStateAction<boolean>>) => {
  const newPatients = [...patients];
  if (state) {
    newPatients.sort((a, b) => new Date(b.birth_date).getTime() - new Date(a.birth_date!).getTime());
  } else {
    newPatients.sort((a, b) => new Date(a.birth_date).getTime() - new Date(b.birth_date!).getTime());
  }
  patientHandler(newPatients);
  stateHandler((oldValue) => !oldValue);
};

export const sortByAddress = (patients: Patient[], patientHandler: React.Dispatch<Patient[]>, state: boolean, stateHandler: React.Dispatch<SetStateAction<boolean>>) => {
  const newPatients = [...patients];
  if (state) {
    newPatients.sort((a, b) => b.address?.localeCompare(a.address));
  } else {
    newPatients.sort((a, b) => a.address?.localeCompare(b.address));
  }
  patientHandler(newPatients);
  stateHandler((oldValue) => !oldValue);
};

export const sortByEmail = (patients: Patient[], patientHandler: React.Dispatch<Patient[]>, state: boolean, stateHandler: React.Dispatch<SetStateAction<boolean>>) => {
  const newPatients = [...patients];
  if (state) {
    newPatients.sort((a, b) => b.email?.localeCompare(a.email));
  } else {
    newPatients.sort((a, b) => a.email?.localeCompare(b.email));
  }
  patientHandler(newPatients);
  stateHandler((oldValue) => !oldValue);
};

export const sortByInsuranceNumber = (patients: Patient[], patientHandler: React.Dispatch<Patient[]>, state: boolean, stateHandler: React.Dispatch<SetStateAction<boolean>>) => {
  const newPatients = [...patients];
  if (state) {
    newPatients.sort((a, b) => Number(b.insurance_number) - Number(a.insurance_number));
  } else {
    newPatients.sort((a, b) => Number(a.insurance_number) - Number(b.insurance_number));
  }
  patientHandler(newPatients);
  stateHandler((oldValue) => !oldValue);
};

export const sortByInstituteName = (patients: Patient[], patientHandler: React.Dispatch<Patient[]>, state: boolean, stateHandler: React.Dispatch<SetStateAction<boolean>>) => {
  const newPatients = [...patients];
  if (state) {
    newPatients.sort((a, b) => b.institute_name?.localeCompare(a.institute_name));
  } else {
    newPatients.sort((a, b) => a.institute_name?.localeCompare(b.institute_name));
  }
  patientHandler(newPatients);
  stateHandler((oldValue) => !oldValue);
};

export const sortById = (patients: Patient[], patientHandler: React.Dispatch<Patient[]>, state: boolean, stateHandler: React.Dispatch<SetStateAction<boolean>>) => {
  const newPatients = [...patients];
  if (state) {
    newPatients.sort((a, b) => b.patient_id - a.patient_id);
  } else {
    newPatients.sort((a, b) => a.patient_id - b.patient_id);
  }
  patientHandler(newPatients);
  stateHandler((oldValue) => !oldValue);
};
