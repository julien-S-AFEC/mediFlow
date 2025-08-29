import PatientsModel from "./patientsModel.js"
import { decrypt, encrypt } from "../crypto.js"

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
    PatientsModel.createPatient(
        req.body.patient_firstname || null,
        req.body.patient_secondname || null,
        req.body.gender || null,
        req.body.birth_date || null,
        req.body.address || null,
        req.body.email || null,
        req.body.insurance_number || null,
        req.body.institute || null,
        req.body.doctor || null,
        req.body.created_at
    )
        .then(data => res.status(200).json(data))
        .catch(error => { console.log(error); res.status(500).json(error) })
}

export const updatePatient = async (req, res) => {
    const patient = await PatientsModel.getPatientFromId(req.body.patientId)
    const encryptecData = encrypt({
        patient_firstname: req.body.firstName,
        patient_secondname: req.body.secondName,
        gender: req.body.gender,
        birth_date: req.body.birthDate,
        address: req.body.address,
        email: req.body.email,
        insurance_number: req.body.insurance
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


