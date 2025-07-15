import PrescriptionCommentaryModel from "./prescriptionCommentaryModel.js"
import { Router } from "express"

const prescriptionCommentaryRouter = Router()

class PrescriptionCommentaryController {
    static getContentById(req, res) {
        PrescriptionCommentaryModel.getContentById(req.body.commentaryId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }

    static store(req, res) {
        PrescriptionCommentaryModel.store(req.body.id, req.body.content)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }
}

prescriptionCommentaryRouter.post('/getContentById', PrescriptionCommentaryController.getContentById);
prescriptionCommentaryRouter.post('/store', PrescriptionCommentaryController.store);

export default prescriptionCommentaryRouter