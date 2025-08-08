import { Router } from "express"
import { jwtValidation } from "../middlewares/jwt.js";
import { create, getById, store } from "./prescriptionDosageController.js"
const prescriptionDosageRouter = Router()

prescriptionDosageRouter.post('/create', jwtValidation, create);
prescriptionDosageRouter.post('/getById', jwtValidation, getById);
prescriptionDosageRouter.put('/store', jwtValidation, store);

export default prescriptionDosageRouter