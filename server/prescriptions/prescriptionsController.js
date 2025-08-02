import PrescriptionModel from "./prescriptionModel.js"
import { Router } from "express"
import { configurationStorage } from "../multerConf.js"
import { jwtValidation } from "../middlewares/jwt.js";

const multer = configurationStorage()

const prescriptionRouter = Router()

class PrescriptionController {
    static upload(req, res) {
        PrescriptionModel.upload(req.file.path, req.body.patientId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }

    static getAllByPatientId(req, res) {
        PrescriptionModel.getAllByPatientId(req.body.patientId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }

    static getById(req, res) {
        PrescriptionModel.getById(req.body.prescriptionId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }
}

prescriptionRouter.post('/upload', jwtValidation, multer.single('prescription'), PrescriptionController.upload);
prescriptionRouter.post('/getAllByPatientId', jwtValidation, PrescriptionController.getAllByPatientId);
prescriptionRouter.post('/getById', jwtValidation, PrescriptionController.getById);

export default prescriptionRouter