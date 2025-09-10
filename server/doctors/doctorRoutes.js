import { Router } from "express"
import {
    getAll,
    getDoctorFromId,
    getDoctorFromPatientId,
    createDoctor,
    updateDoctorCredentialsFromId
} from './doctorsController.js'
import { sanitizeData } from "../middlewares/sanityzer.js"

const doctorRouter = Router()

doctorRouter.get('/getAll', getAll)
doctorRouter.post('/getDoctorFromId', getDoctorFromId)
doctorRouter.post('/getDoctorFromPatientId', getDoctorFromPatientId)
doctorRouter.post('/createDoctor', sanitizeData, createDoctor)
doctorRouter.put('/updateDoctorCredentialsFromId', sanitizeData, updateDoctorCredentialsFromId)

export default doctorRouter