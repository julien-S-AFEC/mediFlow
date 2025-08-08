import PrescriptionModel from "./prescriptionModel.js"

export const upload = async (req, res) => {
    const result = await PrescriptionModel.upload(req.file.path, req.body.patientId)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error.message))
}

export const getAllByPatientId = async (req, res) => {
    try {
        const result = await PrescriptionModel.getAllByPatientId(req.body.patientId)
        return res.status(200).json(result)
    }
    catch (error) {
        return res.status(500).json(error.message)
    }
}

export const getById = async (req, res) => {
    PrescriptionModel.getById(req.body.prescriptionId)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error.message))
}
