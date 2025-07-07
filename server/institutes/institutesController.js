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



    updateInstituteCredentialsFromId(req, res) {
        instituteModel.updateInstituteCredentialsFromId(
            req.body.name,
            req.body.address,
            req.body.phoneNumber,
            req.body.id
        )
            .then(data => { res.status(200).json(data) })

            .catch(error => {
                res.status(500).json({ message: error.message || error });
            });
    }

    createInstitute(req, res) {
        instituteModel.createInstitute(req.body.instName, req.body.instPhone, req.body.instAdress)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }
}

const instituteController = new InstituteController()

instituteRouter.get('/getAll', instituteController.getAll)
instituteRouter.post('/getInstituteFromPatientId', instituteController.getInstituteFromPatientId)
instituteRouter.put('/updateInstituteCredentialsFromId', instituteController.updateInstituteCredentialsFromId)
instituteRouter.post('/createInstitute', instituteController.createInstitute)


export default instituteRouter