import PrescriptionDosageModel from "./PrescriptionDosageModel.js"
import { Router } from "express"
import { jwtValidation } from "../middlewares/jwt.js";

const prescriptionDosageRouter = Router()

class prescriptionDosageController {
    static create(req, res) {
        PrescriptionDosageModel.create(req.body.prescriptionId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }

    static getById(req, res) {
        PrescriptionDosageModel.getById(req.body.prescriptionId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }


    static store(req, res) {
        PrescriptionDosageModel.store(req.body.prescriptionId, req.body.content)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }
}

prescriptionDosageRouter.post('/create', jwtValidation, prescriptionDosageController.create);
prescriptionDosageRouter.post('/getById', jwtValidation, prescriptionDosageController.getById);
prescriptionDosageRouter.put('/store', jwtValidation, prescriptionDosageController.store);

export default prescriptionDosageRouter