import InstituteModel from "./institutesModel.js"
import { Router } from "express"

const instituteRouter = Router()
const instituteModel = new InstituteModel()

class InstituteController {
    getAll(req, res) {
        instituteModel.getAll()
        .then(data => res.status(200).json(data))
        .catch((err) => res.status(500).json(err))
    }
}

const instituteController = new InstituteController()

instituteRouter.get('/getAll', instituteController.getAll)


export default instituteRouter