import Joi from "joi";

export const permissionsSchema = Joi.object({
    create_patient: Joi.boolean(),
    create_prescription: Joi.boolean(),
    create_prescription_commentary: Joi.boolean(),
    permission_id: Joi.number(),
});

export const userSchema = Joi.object({
    user_id: Joi.number(),
    username: Joi.string(),
    user_email: Joi.string().email(),
    user_password: Joi.string(),
    user_status: Joi.boolean(),
    role_id: Joi.number(),
    is_verified: Joi.boolean(),
    permissions: Joi.string(),
    ...permissionsSchema.describe().keys,
});

export const patientSchema = Joi.object({
    patient_id: Joi.number(),
    patient_firstname: Joi.string(),
    patient_secondname: Joi.string(),
    gender: Joi.string(),
    birth_date: Joi.date().iso(),
    created_at: Joi.string(),
    address: Joi.string(),
    email: Joi.string().email(),
    insurance_number: Joi.string(),
    institute: Joi.string(),
    doctor: Joi.string(),
    active: Joi.number(),
});

export const instituteSchema = Joi.object({
    institute_address: Joi.string(),
    institute_name: Joi.string(),
    institute_phone_number: Joi.string(),
    inst_id: Joi.number(),
});

export const doctorSchema = Joi.object({
    doctor_id: Joi.number(),
    doctor_firstname: Joi.string(),
    doctor_secondname: Joi.string(),
    doctor_address: Joi.string(),
    doctor_email: Joi.string().email(),
    doctor_phone_number: Joi.string(),
    doctor_institute: Joi.string(),
});

export const prescriptionSchema = Joi.object({
    id: Joi.number(),
    file_path: Joi.string(),
    start_date: Joi.date().iso(),
    end_date: Joi.date().iso(),
    created_at: Joi.date().iso(),
    deleted_at: Joi.date().iso().allow(null, ""),
    commentary_id: Joi.number(),
    patient_id: Joi.number(),
});

export const prescriptionCommentarySchema = Joi.object({
    id: Joi.number(),
    content: Joi.string(),
    created_at: Joi.date(),
    created_by: Joi.string(),
    edited_at: Joi.date(),
    prescription_id: Joi.number(),
});
