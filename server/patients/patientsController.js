import PatientsModel from "./patientsModel.js"
import { Router } from "express"
import { encryptData } from "../middlewares/encryption.js"
import { decrypt, encrypt } from "../crypto.js"

const patientsRouter = Router()

class PatientsController {
    static getAll(req, res) {
        PatientsModel.getAll()
            .then(data => {
                const decryptedData = data.map(user => {
                    return decrypt(user, user.created_at, 5);
                });

                res.status(200).json(decryptedData);
            })
            .catch(error => res.status(500).json(error));
    }

    static getPatientFromId(req, res) {
        PatientsModel.getPatientFromId(req.body.patientId)
            .then(data => res.status(200).json(decrypt(data, data.created_at, 5)))
            .catch(error => res.status(500).json(error))
    }

    static getPatientFromInstId(req, res) {
        PatientsModel.getPatientFromInstId(req.body.instituteId)
            .then(data => {
                const decryptedData = data.map(user => {
                    return decrypt(user, user.created_at, 5);
                });

                res.status(200).json(decryptedData);
            })
            .catch(error => res.status(500).json(error))
    }

    static getPatientFromDoctorId(req, res) {
        PatientsModel.getPatientFromDoctorId(req.body.doctorId)
            .then(data => {
                const decryptedData = data.map(user => {
                    return decrypt(user, user.created_at, 5);
                });

                res.status(200).json(decryptedData);
            })
            .catch(error => res.status(500).json(error))
    }

    static createPatient(req, res) {
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

    static async updatePatient(req, res) {
        const patient = await PatientsModel.getPatientFromId(req.body.patientId)
        const encryptecData = encrypt({
            patient_firstname: req.body.firstName,
            patient_secondname:req.body.secondName,
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
                res.status(500).json({ message: error.message });
            });
    }

    static updateInstituteFromId(req, res) {
        PatientsModel.updateInstituteFromId(
            req.body.instituteId,
            req.body.patientId
        )
            .then(data => { res.status(200).json(data) })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    }

    static updateDoctorFromId(req, res) {
        PatientsModel.updateDoctorFromId(
            req.body.patientId,
            req.body.doctorId
        )
            .then(data => { res.status(200).json(data) })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    }

    static archivePatientFromId(req, res) {
        PatientsModel.archivePatientFromId(
            req.body.patientId
        )
            .then(data => { res.status(200).json(data) })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    }

    static unArchivePatientFromId(req, res) {
        PatientsModel.unArchivePatientFromId(
            req.body.patientId
        )
            .then(data => { res.status(200).json(data) })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    }
}

patientsRouter.get('/getAll', PatientsController.getAll)
patientsRouter.post('/getPatientFromId', PatientsController.getPatientFromId)
patientsRouter.post('/getPatientFromInstId', PatientsController.getPatientFromInstId)
patientsRouter.post('/getPatientFromDoctorId', PatientsController.getPatientFromDoctorId)
patientsRouter.post('/createPatient', encryptData, PatientsController.createPatient)
patientsRouter.put('/updatePatient', PatientsController.updatePatient)
patientsRouter.put('/updateInstituteFromId', PatientsController.updateInstituteFromId)
patientsRouter.put('/updateDoctorFromId', PatientsController.updateDoctorFromId)
patientsRouter.post('/archivePatientFromId', PatientsController.archivePatientFromId)
patientsRouter.post('/unArchivePatientFromId', PatientsController.unArchivePatientFromId)

export default patientsRouter