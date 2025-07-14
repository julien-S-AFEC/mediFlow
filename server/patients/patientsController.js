import PatientsModel from "./patientsModel.js"
import { Router } from "express"

const patientsRouter = Router()

class PatientsController {
    static getAll(req, res) {
        PatientsModel.getAll()
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }

    static getPatientFromId(req, res) {
        PatientsModel.getPatientFromId(req.body.patientId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }

    static createPatient(req, res) {
        PatientsModel.createPatient(
            req.body.firstName || null,
            req.body.secondName || null,
            req.body.gender || null,
            req.body.birthDate || null,
            req.body.address || null,
            req.body.email || null,
            req.body.insurance || null,
            req.body.institute || null,
            req.body.doctor || null
        )
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }

    static updatePatient(req, res) {
        PatientsModel.updatePatient(
            req.body.patientId,
            req.body.firstName,
            req.body.secondName,
            req.body.gender,
            req.body.birthDate,
            req.body.address,
            req.body.email,
            req.body.insurance)
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
patientsRouter.post('/createPatient', PatientsController.createPatient)
patientsRouter.put('/updatePatient', PatientsController.updatePatient)
patientsRouter.put('/updateInstituteFromId', PatientsController.updateInstituteFromId)
patientsRouter.put('/updateDoctorFromId', PatientsController.updateDoctorFromId)
patientsRouter.post('/archivePatientFromId', PatientsController.archivePatientFromId)
patientsRouter.post('/unArchivePatientFromId', PatientsController.unArchivePatientFromId)

export default patientsRouter