import PrescriptionDosageModel from "./prescriptionDosageModel.js"


export const create = (req, res) => {
    PrescriptionDosageModel.create(req.body.prescriptionId, JSON.stringify([{"col1": "", "col2": "", "col3": "", "col4": "", "col5": ""}]))
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error.message))
}

export const getById = (req, res) => {
    PrescriptionDosageModel.getById(req.body.prescriptionId)
        .then(data => res.status(200).json(JSON.parse(data)))
        .catch(error => res.status(500).json(error.message))
}


export const store = (req, res) => {
    PrescriptionDosageModel.store(req.body.prescriptionId, JSON.stringify(req.body.content))
        .then(data => res.status(200).json("Prescription dosage content successfully changed."))
        .catch(error => res.status(500).json(error.message))
}
