import DoctorModel from "./doctorsModel.js"
import { Router } from "express"

const doctorRouter = Router()
const doctorModel = new DoctorModel()

class DoctorController {
    getAll(req, res) {
        try {
            doctorModel.getAll()
                .then(data => {
                    res.status(200).json(data)
                })
        }
        catch (error) {
            res.status(500).json({ "message": "Cannot fetch" })
            console.log(error)
        }
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

    
}

const doctorController = new DoctorController()

doctorRouter.get('/getAll', doctorController.getAll)
doctorRouter.post('/getPatientFromId', doctorController.getDoctorFromId)
doctorRouter.post('/getDoctorFromPatientId', doctorController.getDoctorFromPatientId)
doctorRouter.post('/createDoctor', doctorController.createDoctor)

export default doctorRouter