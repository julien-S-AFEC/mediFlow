import PatientsModel from "./patientsModel.js"
import { decrypt, encrypt } from "../crypto.js"
import { patientSchema } from "../config/joi.js";

export const getAll = async (req, res) => {
    PatientsModel.getAll()
        .then(data => {
            const decryptedData = data.map(user => {
                return decrypt(user, user.created_at, 5);
            });

            res.status(200).json(decryptedData);
        })
        .catch(error => res.status(500).json(error));
}

export const getPatientFromId = async (req, res) => {
    PatientsModel.getPatientFromId(req.body.patientId)
        .then(data => res.status(200).json(decrypt(data, data.created_at, 5)))
        .catch(error => res.status(500).json(error))
}

export const getPatientFromInstId = async (req, res) => {
    PatientsModel.getPatientFromInstId(req.body.instituteId)
        .then(data => {
            const decryptedData = data.map(user => {
                return decrypt(user, user.created_at, 5);
            });

            res.status(200).json(decryptedData);
        })
        .catch(error => res.status(500).json(error))
}

export const getPatientFromDoctorId = async (req, res) => {
    PatientsModel.getPatientFromDoctorId(req.body.doctorId)
        .then(data => {
            const decryptedData = data.map(user => {
                return decrypt(user, user.created_at, 5);
            });

            res.status(200).json(decryptedData);
        })
        .catch(error => res.status(500).json(error))
}

export const createPatient = async (req, res) => {
    const { error, value } = patientSchema.validate(req.body)

    PatientsModel.createPatient(
        value.patient_firstname || null,
        value.patient_secondname || null,
        value.gender || null,
        value.birth_date || null,
        value.address || null,
        value.email || null,
        value.insurance_number || null,
        value.institute || null,
        value.doctor || null,
        value.created_at
    )
        .then(data => res.status(200).json(data))
        .catch(error => { console.log(error); res.status(500).json(error) })
}

export const updatePatient = async (req, res) => {
    const patient = await PatientsModel.getPatientFromId(req.body.patientId)
    const { error, value } = patientSchema.validate(req.body)

    const encryptecData = encrypt({
        patient_firstname: value.firstName,
        patient_secondname: value.secondName,
        gender: value.gender,
        birth_date: value.birthDate,
        address: value.address,
        email: value.email,
        insurance_number: value.insurance
    }, patient.created_at, 5)

    PatientsModel.updatePatient(
        req.body.patientId,
        encryptecData.patient_firstname,
        encryptecData.patient_secondname,
        encryptecData.gender,
        encryptecData.birth_date,
        encryptecData.address,
        encryptecData.email,
        encryptecData.insurance_number
    )
        .then(data => { res.status(200).json(data) })
        .catch(error => {
            res.status(500).json({ message: error });
        });
}

export const updateInstituteFromId = async (req, res) => {
    PatientsModel.updateInstituteFromId(
        req.body.instituteId,
        req.body.patientId
    )
        .then(data => { res.status(200).json(data) })
        .catch(error => {
            res.status(500).json({ message: error });
        });
}

export const updateDoctorFromId = async (req, res) => {
    PatientsModel.updateDoctorFromId(
        req.body.patientId,
        req.body.doctorId
    )
        .then(data => { res.status(200).json(data) })
        .catch(error => {
            res.status(500).json({ message: error });
        });
}

export const archivePatientFromId = async (req, res) => {
    PatientsModel.archivePatientFromId(
        req.body.patientId
    )
        .then(data => { res.status(200).json(data) })
        .catch(error => {
            res.status(500).json({ message: error });
        });
}

export const unArchivePatientFromId = async (req, res) => {
    PatientsModel.unArchivePatientFromId(
        req.body.patientId
    )
        .then(data => { res.status(200).json(data) })
        .catch(error => {
            res.status(500).json({ message: error });
        });
}


