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

    getAll(req, res) {
        prescriptionModel.getAll(req.body.patientId)
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json(error.message))
    }
}

const prescriptionController = new PrescriptionController()

prescriptionRouter.post('/upload', multer.single('prescription'), prescriptionController.upload);
prescriptionRouter.post('/getAll', prescriptionController.getAll);

export default prescriptionRouter