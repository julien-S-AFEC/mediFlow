import PatientsModel from "./patientsModel.js"
import { Router } from "express"

const patientsRouter = Router()
const patientModel = new PatientsModel()

class PatientsController {
    getAll(req, res) {
        patientModel.getAll()
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }

    getPatientFromId(req, res) {
        patientModel.getPatientFromId(req.body.patientId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }

    createPatient(req, res) {
        console.log(req.body.firstName,
            req.body.secondName,
            req.body.gender,
            req.body.birthDate,
            req.body.address,
            req.body.email,
            req.body.insurance,
            req.body.institute,
            req.body.doctor)
        patientModel.createPatient(
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

    updatePatient(req, res) {
        patientModel.updatePatient(
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

    updateInstituteFromId(req, res) {
        patientModel.updateInstituteFromId(
            req.body.instituteId,
            req.body.patientId
        )
            .then(data => { res.status(200).json(data) })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    }

    updateDoctorFromId(req, res) {
        patientModel.updateDoctorFromId(
            req.body.patientId,
            req.body.doctorId
        )
            .then(data => { res.status(200).json(data) })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    }

    archivePatientFromId(req, res) {
        patientModel.archivePatientFromId(
            req.body.patientId
        )
            .then(data => { res.status(200).json(data) })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    }

    unArchivePatientFromId(req, res) {
        patientModel.unArchivePatientFromId(
            req.body.patientId
        )
            .then(data => { res.status(200).json(data) })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    }
}

const patientsController = new PatientsController()

patientsRouter.get('/getAll', patientsController.getAll)
patientsRouter.post('/getPatientFromId', patientsController.getPatientFromId)
patientsRouter.post('/createPatient', patientsController.createPatient)
patientsRouter.put('/updatePatient', patientsController.updatePatient)
patientsRouter.put('/updateInstituteFromId', patientsController.updateInstituteFromId)
patientsRouter.put('/updateDoctorFromId', patientsController.updateDoctorFromId)
patientsRouter.post('/archivePatientFromId', patientsController.archivePatientFromId)
patientsRouter.post('/unArchivePatientFromId', patientsController.unArchivePatientFromId)

export default patientsRouter