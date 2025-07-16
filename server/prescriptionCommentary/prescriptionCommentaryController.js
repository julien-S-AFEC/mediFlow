import PrescriptionCommentaryModel from "./prescriptionCommentaryModel.js"
import { Router } from "express"

const prescriptionCommentaryRouter = Router()

class PrescriptionCommentaryController {
    static getAllbyPrescId(req, res) {
        console.log(req.body.prescriptionId)
        PrescriptionCommentaryModel.getAllbyPrescId(req.body.prescriptionId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }

    static create(req, res) {
        console.log('aaa', req.body)
        PrescriptionCommentaryModel.create(req.body.prescriptionId, req.body.content)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }
}

prescriptionCommentaryRouter.post('/getAllbyPrescId', PrescriptionCommentaryController.getAllbyPrescId);
prescriptionCommentaryRouter.post('/create', PrescriptionCommentaryController.create);

export default prescriptionCommentaryRouter