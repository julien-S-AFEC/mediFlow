import { Router } from "express"
import { jwtValidation } from "../middlewares/jwt.js";
import { configurationStorage } from "../config/multerConf.js"
import { upload, getAllByPatientId, getById } from './prescriptionsController.js'

const prescriptionRouter = Router()
const multer = configurationStorage()

prescriptionRouter.post('/upload', jwtValidation, multer.single('prescription'), upload);
prescriptionRouter.post('/getAllByPatientId', jwtValidation, getAllByPatientId);
prescriptionRouter.post('/getById', jwtValidation, getById);

export default prescriptionRouter