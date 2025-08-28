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
    changeNameFromId,
    changeEmailFromId,
    changePasswordFromId,
    sendAnotherVerificationEmail,
    getUserByMail
} from "./usersController.js";

const usersRouter = Router()

usersRouter.get('/getAllWithPermissions', jwtValidation, getAllWithPermissions)
usersRouter.post('/login', login)
usersRouter.post('/verifyEmail', verifyEmail)
usersRouter.post('/registerUser', registerUser)
usersRouter.post('/getUserById', jwtValidation, getUserById)
usersRouter.get('/getCurrentUserPermissions', jwtValidation, getCurrentUserPermissions)
usersRouter.post('/updatePermissionFromName', jwtValidation, updatePermissionFromName)
usersRouter.put('/changeNameFromId', jwtValidation, changeNameFromId)
usersRouter.put('/changeEmailFromId', jwtValidation, changeEmailFromId)
usersRouter.put('/changePasswordFromId', jwtValidation, changePasswordFromId)
usersRouter.post('/sendAnotherVerificationEmail', jwtValidation, sendAnotherVerificationEmail)
usersRouter.post('/getUserByMail', jwtValidation, getUserByMail)

export default usersRouter