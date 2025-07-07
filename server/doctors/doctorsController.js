import DoctorModel from "./doctorsModel.js"
import { Router } from "express"

const doctorRouter = Router()
const doctorModel = new DoctorModel()

class DoctorController {
    getAll(req, res) {
        doctorModel.getAll()
            .then((data) => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }

    getDoctorFromId(req, res) {
        doctorModel.getDoctorFromId(req.body.doctorId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }

    getDoctorFromPatientId(req, res) {
        doctorModel.getDoctorFromPatientId(req.body.patientId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }

    createDoctor(req, res) {
        doctorModel.createDoctor(
            req.body.firstname,
            req.body.secondName,
            req.body.address,
            req.body.email,
            req.body.phone,
            req.body.institute,
        )
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }

    updateDoctorCredentialsFromId(req, res) {
        doctorModel.updateDoctorCredentialsFromId(
            req.body.firstname,
            req.body.secondname,
            req.body.institute,
            req.body.address,
            req.body.phoneNumber,
            req.body.email,
            req.body.doctorId
        )
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }
    test(req, res) {
        doctorModel.test()
            .then((data) => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }
}

const doctorController = new DoctorController()

doctorRouter.get('/getAll', doctorController.getAll)
doctorRouter.post('/getDoctorFromId', doctorController.getDoctorFromId)
doctorRouter.post('/getDoctorFromPatientId', doctorController.getDoctorFromPatientId)
doctorRouter.post('/createDoctor', doctorController.createDoctor)
doctorRouter.put('/updateDoctorCredentialsFromId', doctorController.updateDoctorCredentialsFromId)
doctorRouter.get('/test', doctorController.test)

export default doctorRouter