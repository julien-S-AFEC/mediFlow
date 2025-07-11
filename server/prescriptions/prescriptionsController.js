import PrescriptionModel from "./prescriptionModel.js"
import { Router } from "express"
import { configurationStorage } from "../multerConf.js"
import express from 'express'
const multer = configurationStorage()

const prescriptionRouter = Router()
const prescriptionModel = new PrescriptionModel()

class PrescriptionController {
    upload(req, res) {
        prescriptionModel.upload(req.file.path, req.body.patientId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }

    getAllByPatientId(req, res) {
        prescriptionModel.getAllByPatientId(req.body.patientId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }

    getById(req, res) {
        prescriptionModel.getById(req.body.prescriptionId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }
}

const prescriptionController = new PrescriptionController()

prescriptionRouter.post('/upload', multer.single('prescription'), prescriptionController.upload);
prescriptionRouter.post('/getAllByPatientId', prescriptionController.getAllByPatientId);
prescriptionRouter.post('/getById', prescriptionController.getById);

export default prescriptionRouter