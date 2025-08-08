import InstituteModel from "./institutesModel.js"



export const getAll = (req, res) => {
    InstituteModel.getAll()
        .then(data => res.status(200).json(data))
        .catch((error) => res.status(500).json(error))
}

export const getInstituteFromPatientId = (req, res) => {
    InstituteModel.getInstituteFromPatientId(req.body.patientId)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error))
}

export const getFromId = (req, res) => {
    InstituteModel.getFromId(req.body.instituteId)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error))
}

export const updateInstituteCredentialsFromId = (req, res) => {
    InstituteModel.updateInstituteCredentialsFromId(
        req.body.name,
        req.body.address,
        req.body.phoneNumber,
        req.body.id
    )
        .then(data => res.status(200).json(data))
        .catch((error) => res.status(500).json(error));
}

export const createInstitute = (req, res) => {
    InstituteModel.createInstitute(req.body.instName, req.body.instPhone, req.body.instAdress)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error))
}

