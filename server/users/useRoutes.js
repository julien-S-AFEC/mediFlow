import { Router } from "express"
import { jwtValidation } from "../middlewares/jwt.js";
import {
    login,
    getAllWithPermissions,
    getCurrentUserPermissions,
    getUserById,
    registerUser,
    updatePermissionFromName
} from "./usersController.js";

const usersRouter = Router()

usersRouter.get('/getAllWithPermissions', jwtValidation, getAllWithPermissions)
usersRouter.post('/login', login)
usersRouter.post('/registerUser', registerUser)
usersRouter.post('/getUserById', jwtValidation, getUserById)
usersRouter.get('/getCurrentUserPermissions', jwtValidation, getCurrentUserPermissions)
usersRouter.post('/updatePermissionFromName', jwtValidation, updatePermissionFromName)

export default usersRouter