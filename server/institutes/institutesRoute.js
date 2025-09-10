import { Router } from "express"
import {
    getAll,
    getInstituteFromPatientId,
    getFromId,
    updateInstituteCredentialsFromId,
    createInstitute
} from './institutesController.js'
import { sanitizeData } from "../middlewares/sanityzer.js"

const instituteRouter = Router()
instituteRouter.get('/getAll', getAll)
instituteRouter.post('/getInstituteFromPatientId', getInstituteFromPatientId)
instituteRouter.post('/getFromId', getFromId)
instituteRouter.put('/updateInstituteCredentialsFromId', sanitizeData, updateInstituteCredentialsFromId)
instituteRouter.post('/createInstitute', sanitizeData, createInstitute)


export default instituteRouter