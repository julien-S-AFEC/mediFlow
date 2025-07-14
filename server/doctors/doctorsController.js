import DoctorModel from "./doctorsModel.js"
import { Router } from "express"

const doctorRouter = Router()

class DoctorController {
    static getAll(req, res) {
        DoctorModel.getAll()
            .then((data) => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }

    static getDoctorFromId(req, res) {
        DoctorModel.getDoctorFromId(req.body.doctorId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }

    static getDoctorFromPatientId(req, res) {
        DoctorModel.getDoctorFromPatientId(req.body.patientId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }

    static createDoctor(req, res) {
        DoctorModel.createDoctor(
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

    static updateDoctorCredentialsFromId(req, res) {
        DoctorModel.updateDoctorCredentialsFromId(
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
}

doctorRouter.get('/getAll', DoctorController.getAll)
doctorRouter.post('/getDoctorFromId', DoctorController.getDoctorFromId)
doctorRouter.post('/getDoctorFromPatientId', DoctorController.getDoctorFromPatientId)
doctorRouter.post('/createDoctor', DoctorController.createDoctor)
doctorRouter.put('/updateDoctorCredentialsFromId', DoctorController.updateDoctorCredentialsFromId)

export default doctorRouter