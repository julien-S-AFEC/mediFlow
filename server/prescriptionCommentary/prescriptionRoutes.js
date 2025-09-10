import { Router } from "express"
import { getAllbyPrescId, create, deleteById } from './prescriptionCommentaryController.js'
import { jwtValidation } from "../middlewares/jwt.js";
import { sanitizeData } from "../middlewares/sanityzer.js";

const prescriptionCommentaryRouter = Router()

prescriptionCommentaryRouter.post('/getAllbyPrescId', jwtValidation, getAllbyPrescId);
prescriptionCommentaryRouter.post('/create', jwtValidation, sanitizeData, create);
prescriptionCommentaryRouter.post('/deleteById', jwtValidation, deleteById);

export default prescriptionCommentaryRouter