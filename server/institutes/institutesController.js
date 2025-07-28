import InstituteModel from "./institutesModel.js"
import { Router } from "express"

const instituteRouter = Router()

class InstituteController {
    static getAll(req, res) {
        InstituteModel.getAll()
            .then(data => res.status(200).json(data))
            .catch((error) => res.status(500).json(error))
    }

    static getInstituteFromPatientId(req, res) {
        InstituteModel.getInstituteFromPatientId(req.body.patientId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }

    static getFromId(req, res) {
        InstituteModel.getFromId(req.body.instituteId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }

    static updateInstituteCredentialsFromId(req, res) {
        InstituteModel.updateInstituteCredentialsFromId(
            req.body.name,
            req.body.address,
            req.body.phoneNumber,
            req.body.id
        )
            .then(data => res.status(200).json(data))
            .catch((error) => res.status(500).json(error));
    }

    static createInstitute(req, res) {
        InstituteModel.createInstitute(req.body.instName, req.body.instPhone, req.body.instAdress)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error))
    }
}

instituteRouter.get('/getAll', InstituteController.getAll)
instituteRouter.post('/getInstituteFromPatientId', InstituteController.getInstituteFromPatientId)
instituteRouter.post('/getFromId', InstituteController.getFromId)
instituteRouter.put('/updateInstituteCredentialsFromId', InstituteController.updateInstituteCredentialsFromId)
instituteRouter.post('/createInstitute', InstituteController.createInstitute)


export default instituteRouter