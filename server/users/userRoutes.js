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
    getUserByMail,
    changePasswordFromJWT,
    sendResetPasswordMail
} from "./usersController.js";
import authLimiter from "../middlewares/rateLimit.js";

const usersRouter = Router()

usersRouter.get('/getAllWithPermissions', jwtValidation, getAllWithPermissions)
usersRouter.post('/login', authLimiter, login)
usersRouter.post('/verifyEmail', verifyEmail)
usersRouter.post('/registerUser', authLimiter, registerUser)
usersRouter.post('/getUserById', jwtValidation, getUserById)
usersRouter.get('/getCurrentUserPermissions', jwtValidation, getCurrentUserPermissions)
usersRouter.post('/updatePermissionFromName', jwtValidation, updatePermissionFromName)
usersRouter.put('/changeNameFromId', jwtValidation, changeNameFromId)
usersRouter.put('/changeEmailFromId', jwtValidation, changeEmailFromId)
usersRouter.put('/changePasswordFromId', jwtValidation, changePasswordFromId)
usersRouter.post('/sendAnotherVerificationEmail', jwtValidation, sendAnotherVerificationEmail)
usersRouter.post('/sendResetPasswordMail', sendResetPasswordMail)
usersRouter.post('/getUserByMail', getUserByMail)
usersRouter.post('/changePasswordFromJWT', changePasswordFromJWT)

export default usersRouter