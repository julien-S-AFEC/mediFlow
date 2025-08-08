import { Router } from "express"
import {
    getAll,
    getInstituteFromPatientId,
    getFromId,
    updateInstituteCredentialsFromId,
    createInstitute
} from './institutesController.js'

const instituteRouter = Router()
instituteRouter.get('/getAll', getAll)
instituteRouter.post('/getInstituteFromPatientId', getInstituteFromPatientId)
instituteRouter.post('/getFromId', getFromId)
instituteRouter.put('/updateInstituteCredentialsFromId', updateInstituteCredentialsFromId)
instituteRouter.post('/createInstitute', createInstitute)


export default instituteRouter