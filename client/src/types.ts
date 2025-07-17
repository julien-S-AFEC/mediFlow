export interface User extends Permissions {
  user_id: string;
  username: string;
  user_email: string;
  user_password: string;
  user_status: string;
  role_id: string;
  permissions: string;
}

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
  active: string;
};

export interface Permissions {
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
}

export type Institute = {
  institute_address: string;
  institute_name: string;
  institute_phone_number: string;
  inst_id: string;
};

export type Doctor = {
  doctor_id: string;
  doctor_firstname: string;
  doctor_secondname: string;
  doctor_address: string;
  doctor_email: string;
  doctor_phone_number: string;
  doctor_institute: string;
};

export type Prescription = {
  id: string;
  file_path: string;
  start_date: string;
  end_date: string;
  created_at: string;
  deleted_at: string;
  commentary_id: string;
  patient_id: string;
};

export type PrescriptionCommentary = {
  id: string;
  content: string;
  created_at: string;
  created_by: string;
  edited_at: string;
  prescription_id: string;
};
