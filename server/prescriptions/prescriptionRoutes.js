import { Router } from "express"
import { jwtValidation } from "../middlewares/jwt.js";
import { configurationStorage } from "../config/multerConf.js"
import { upload, getAllByPatientId, getById, changeIsArchivedById, getPrescriptionText } from './prescriptionsController.js'

const prescriptionRouter = Router()
const multer = configurationStorage()

prescriptionRouter.post('/upload', jwtValidation, multer.single('prescription'), upload);
prescriptionRouter.post('/getAllByPatientId', jwtValidation, getAllByPatientId);
prescriptionRouter.post('/getById', jwtValidation, getById);
prescriptionRouter.put('/changeIsArchivedById', jwtValidation, changeIsArchivedById);
prescriptionRouter.post('/getPrescriptionText', jwtValidation, getPrescriptionText);

export default prescriptionRouter