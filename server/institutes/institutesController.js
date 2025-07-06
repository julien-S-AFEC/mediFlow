import InstituteModel from "./institutesModel.js"
import { Router } from "express"

const instituteRouter = Router()
const instituteModel = new InstituteModel()

class InstituteController {
    getAll(req, res) {
        instituteModel.getAll()
            .then(data => res.status(200).json(data))
            .catch((err) => res.status(500).json(err))
    }

    getInstituteFromPatientId(req, res) {
        instituteModel.getInstituteFromPatientId(req.body.patientId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }

    updateInstituteFromId(req, res) {
        instituteModel.updateInstituteFromId(
            req.body.instituteId,
            req.body.patientId
        )
            .then(data => { res.status(200).json(data) })

            .catch(error => {
                res.status(500).json({ message: error.message || error });
            });
    }
}

const instituteController = new InstituteController()

instituteRouter.get('/getAll', instituteController.getAll)
instituteRouter.post('/getInstituteFromPatientId', instituteController.getInstituteFromPatientId)
instituteRouter.put('/updateInstituteFromId', instituteController.updateInstituteFromId)


export default instituteRouter