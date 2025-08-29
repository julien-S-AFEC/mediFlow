export interface User extends Permissions {
  user_id: number;
  username: string;
  user_email: string;
  user_password: string;
  user_status: string;
  role_id: number;
  is_verified: boolean;
  permissions: string;
}

export type Patient = {
  patient_id: number;
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
  institute_id: number;
  active: number;
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
  inst_id: number;
};

export type Doctor = {
  doctor_id: number;
  doctor_firstname: string;
  doctor_secondname: string;
  doctor_address: string;
  doctor_email: string;
  doctor_phone_number: string;
  doctor_institute: string;
};

export type Prescription = {
  id: number;
  file_path: string;
  start_date: string;
  end_date: string;
  created_at: string;
  deleted_at: string;
  commentary_id: number;
  patient_id: number;
};

export type PrescriptionCommentary = {
  id?: number;
  content: string;
  created_at: Date;
  created_by?: string;
  edited_at?: Date;
  prescription_id?: number;
};
