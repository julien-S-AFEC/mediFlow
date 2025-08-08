import { Router } from "express"
import {
    getAll,
    getDoctorFromId,
    getDoctorFromPatientId,
    createDoctor,
    updateDoctorCredentialsFromId
} from './doctorsController.js'

const doctorRouter = Router()

doctorRouter.get('/getAll', getAll)
doctorRouter.post('/getDoctorFromId', getDoctorFromId)
doctorRouter.post('/getDoctorFromPatientId', getDoctorFromPatientId)
doctorRouter.post('/createDoctor', createDoctor)
doctorRouter.put('/updateDoctorCredentialsFromId', updateDoctorCredentialsFromId)

export default doctorRouter