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
}

const patientsController = new PatientsController()

patientsRouter.get('/getAll', patientsController.getAll)

export default patientsRouter