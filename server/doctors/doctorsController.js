import DoctorModel from "./doctorsModel.js"

export const getAll = (req, res) => {
    DoctorModel.getAll()
        .then((data) => res.status(200).json(data))
        .catch(error => res.status(500).json(error.message))
}

export const getDoctorFromId = (req, res) => {
    DoctorModel.getDoctorFromId(req.body.doctorId)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error))
}

export const getDoctorFromPatientId = (req, res) => {
    DoctorModel.getDoctorFromPatientId(req.body.patientId)
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error))
}

export const createDoctor = (req, res) => {
    DoctorModel.createDoctor(
        req.body.firstname,
        req.body.secondName,
        req.body.address,
        req.body.email,
        req.body.phone,
        req.body.institute,
    )
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error))
}

export const updateDoctorCredentialsFromId = (req, res) => {
    DoctorModel.updateDoctorCredentialsFromId(
        req.body.firstname,
        req.body.secondname,
        req.body.institute,
        req.body.address,
        req.body.phoneNumber,
        req.body.email,
        req.body.doctorId
    )
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json(error))
}
