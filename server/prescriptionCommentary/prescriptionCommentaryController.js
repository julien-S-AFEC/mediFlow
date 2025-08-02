import PrescriptionCommentaryModel from "./prescriptionCommentaryModel.js"
import { Router } from "express"
import { jwtValidation } from "../middlewares/jwt.js";

const prescriptionCommentaryRouter = Router()

class PrescriptionCommentaryController {
    static getAllbyPrescId(req, res) {
        PrescriptionCommentaryModel.getAllbyPrescId(req.body.prescriptionId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }

    static create(req, res) {
        PrescriptionCommentaryModel.create(req.body.currentUser, req.body.prescriptionId, req.body.content)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }
    
    static deleteById(req, res) {
        PrescriptionCommentaryModel.deleteById(req.body.commentaryId, req.body.prescriptionId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }
}

prescriptionCommentaryRouter.post('/getAllbyPrescId', jwtValidation, PrescriptionCommentaryController.getAllbyPrescId);
prescriptionCommentaryRouter.post('/create', jwtValidation, PrescriptionCommentaryController.create);
prescriptionCommentaryRouter.post('/deleteById', jwtValidation, PrescriptionCommentaryController.deleteById);

export default prescriptionCommentaryRouter