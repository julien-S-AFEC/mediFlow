import PrescriptionCommentaryModel from "./prescriptionCommentarymodel.js"


export const getAllbyPrescId = (req, res) => {
    PrescriptionCommentaryModel.getAllbyPrescId(req.body.prescriptionId)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error.message))
}

export const create = (req, res) => {
    PrescriptionCommentaryModel.create(req.body.currentUser, req.body.prescriptionId, req.body.content)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error.message))
}

export const deleteById = (req, res) => {
    PrescriptionCommentaryModel.deleteById(req.body.commentaryId, req.body.prescriptionId)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error.message))
}
