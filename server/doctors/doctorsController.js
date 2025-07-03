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
        doctorModel.getDoctorFromId(req.body.patientId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }

    createDoctor(req, res) {
        doctorModel.createPatient(
            req.body.firstNameText || null,
            req.body.secondNameText || null,
            req.body.addressText || null,
            req.body.emailText || null,
            req.body.phoneNumberText || null,
            req.body.instituteText || null,
        )
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }
}

const doctorController = new DoctorController()

doctorRouter.get('/getAll', doctorController.getAll)
doctorRouter.post('/getPatientFromId', doctorController.getDoctorFromId)
doctorRouter.post('/createPatient', doctorController.createDoctor)

export default doctorRouter