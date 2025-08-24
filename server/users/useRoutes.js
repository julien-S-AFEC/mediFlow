import { Router } from "express"
import { jwtValidation } from "../middlewares/jwt.js";
import {
    login,
    getAllWithPermissions,
    getCurrentUserPermissions,
    getUserById,
    registerUser,
    verifyEmail,
    updatePermissionFromName,
    sendResetPasswordEmail
} from "./usersController.js";

const usersRouter = Router()

usersRouter.get('/getAllWithPermissions', jwtValidation, getAllWithPermissions)
usersRouter.post('/login', login)
usersRouter.post('/sendResetPasswordEmail', sendResetPasswordEmail)
usersRouter.post('/verifyEmail/:token', verifyEmail)
usersRouter.post('/registerUser', registerUser)
usersRouter.post('/getUserById', jwtValidation, getUserById)
usersRouter.get('/getCurrentUserPermissions', jwtValidation, getCurrentUserPermissions)
usersRouter.post('/updatePermissionFromName', jwtValidation, updatePermissionFromName)

export default usersRouter