export type Patient = {
  patient_id: string;
  patient_firstname: string;
  patient_secondname: string;
  gender: string;
  birth_date: string;
  created_at: string;
  address: string;
  email: string;
  insurance_number: string;
  institute_name: string;
  institute_address: string;
  institute_phone_number: string;
  institute_id: string;
};

export type Permissions = {
  create_patient: boolean;
  update_patient: boolean;
  delete_patient: boolean;
  create_prescription: boolean;
  update_description: boolean;
  delete_prescription: boolean;
  create_prescription_commentary: boolean;
  update_prescription_commentary: boolean;
  delete_prescription_commentar: boolean;
  permission_id: number;
};

export type Institute = {
  institute_address: string;
  institute_name: string;
  institute_phone_number: string;
  inst_id: string;
};

export type Doctor= {
  doctor_id: string;
  doctor_firstname: string;
  doctor_secondname: string;
  doctor_adress: string;
  doctor_email: string;
  doctor_phone_number: string;
  doctor_institute: string;
};
