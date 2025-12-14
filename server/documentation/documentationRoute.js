import { Router } from "express";
import { getAll } from "./documentationController.js";

const documentationRouter = Router()

documentationRouter.get('/book/getAll', getAll)

export default documentationRouter