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
import { sanitizeData } from "../middlewares/sanityzer.js";

const usersRouter = Router()

usersRouter.get('/getAllWithPermissions', jwtValidation, getAllWithPermissions)
usersRouter.post('/login', authLimiter, sanitizeData, login)
usersRouter.post('/verifyEmail', verifyEmail)
usersRouter.post('/registerUser', authLimiter, sanitizeData, registerUser)
usersRouter.post('/getUserById', jwtValidation, getUserById)
usersRouter.get('/getCurrentUserPermissions', jwtValidation, getCurrentUserPermissions)
usersRouter.post('/updatePermissionFromName', jwtValidation, updatePermissionFromName)
usersRouter.put('/changeNameFromId', jwtValidation, sanitizeData, changeNameFromId)
usersRouter.put('/changeEmailFromId', jwtValidation, sanitizeData, changeEmailFromId)
usersRouter.put('/changePasswordFromId', jwtValidation, sanitizeData, changePasswordFromId)
usersRouter.post('/sendAnotherVerificationEmail', jwtValidation, sendAnotherVerificationEmail)
usersRouter.post('/sendResetPasswordMail', sendResetPasswordMail)
usersRouter.post('/getUserByMail', getUserByMail)
usersRouter.post('/changePasswordFromJWT', sanitizeData, changePasswordFromJWT)

export default usersRouter