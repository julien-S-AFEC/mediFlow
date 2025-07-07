import PatientsModel from "./patientsModel.js"
import { Router } from "express"

const patientsRouter = Router()
const patientModel = new PatientsModel()

class PatientsController {
    getAll(req, res) {
        try {
            patientModel.getAll()
                .then(data => {
                    res.status(200).json(data)
                })
        }
        catch (error) {
            res.status(500).json({ "message": "Cannot fetch" })
            console.log(error)
        }
    }

    getPatientFromId(req, res) {
        patientModel.getPatientFromId(req.body.patientId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }

    createPatient(req, res) {
        patientModel.createPatient(
            req.body.firstNameText || null,
            req.body.secondNameText || null,
            req.body.genderText || null,
            req.body.birthDateText || null,
            req.body.addressText || null,
            req.body.emailText || null,
            req.body.insuranceText || null,
            req.body.instituteText || null,
            req.body.doctorText || null
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
                res.status(500).json({ message: error.message || error });
            });
    }

    updateInstituteFromId(req, res) {
        patientModel.updateInstituteFromId(
            req.body.instituteId,
            req.body.patientId
        )
            .then(data => { res.status(200).json(data) })

            .catch(error => {
                res.status(500).json({ message: error.message || error });
            });
    }

    updateDoctorFromId(req, res) {
        patientModel.updateDoctorFromId(
            req.body.patientId,
            req.body.doctorId
        )
            .then(data => { res.status(200).json(data) })

            .catch(error => {
                res.status(500).json({ message: error.message || error });
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



export default patientsRouter