import { Router } from "express"
import {
    getAll,
    getPatientFromId,
    getPatientFromInstId,
    getPatientFromDoctorId,
    createPatient,
    updatePatient,
    updateInstituteFromId,
    updateDoctorFromId,
    archivePatientFromId,
    unArchivePatientFromId
} from './patientsController.js'
import { encryptData } from "../middlewares/encryption.js"
import { jwtValidation } from "../middlewares/jwt.js";

const patientsRouter = Router()

patientsRouter.get('/getAll', jwtValidation, getAll)
patientsRouter.post('/getPatientFromId', jwtValidation, getPatientFromId)
patientsRouter.post('/getPatientFromInstId', jwtValidation, getPatientFromInstId)
patientsRouter.post('/getPatientFromDoctorId', jwtValidation, getPatientFromDoctorId)
patientsRouter.post('/createPatient', jwtValidation, encryptData, createPatient)
patientsRouter.put('/updatePatient', jwtValidation, updatePatient)
patientsRouter.put('/updateInstituteFromId', jwtValidation, updateInstituteFromId)
patientsRouter.put('/updateDoctorFromId', jwtValidation, updateDoctorFromId)
patientsRouter.post('/archivePatientFromId', jwtValidation, archivePatientFromId)
patientsRouter.post('/unArchivePatientFromId', jwtValidation, unArchivePatientFromId)

export default patientsRouter