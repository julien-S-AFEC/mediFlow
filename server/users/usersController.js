import UserModel from "./usersModel.js"
import { Router } from "express"
import jsonwebtoken from 'jsonwebtoken'
import { jwtValidation } from "../middlewares/jwt.js";

const usersRouter = Router()
const userModel = new UserModel()

class UsersController {
    getAllWithPermissions(req, res) {
        userModel.getAllWithPermissions()
            .then(data => { res.status(200).json(data) })

            .catch(error => {
                res.status(409).json({ message: error.message });
            });
    }

    connectUser(req, res) {
        userModel.connectUser(req.body.email, req.body.password)
            .then(data => {
                const token = jsonwebtoken.sign({ userName: data[0].username, userRole: data[0].role_id, userId: data[0].user_id }, process.env.JWT_SECRET, { expiresIn: '4h' });

                const credentials = data[0]
                req.session.user = {
                    username: credentials.username,
                    role_id: credentials.role_id,
                    user_id: credentials.user_id,
                    jwt: `Bearer ${token}`
                }
                res.status(200).json({ user: data[0], jwtToken: token })
            })

            .catch(error => {
                console.log(error.message)
                res.status(500).json({ message: error.message || 'Erreur inconnue' })
            })
    }

    registerUser(req, res) {
        userModel.registerUser(req.body.name, req.body.email, req.body.password)
            .then(userId => {
                return userModel.getUserById(userId);
            })
            .then(userCredentials => {
                if (userCredentials) {
                    const credentials = JSON.parse(userCredentials)[0]
                    req.session.user = {
                        username: credentials.username,
                        role_id: credentials.role_id,
                        user_id: credentials.user_id
                    };
                }
                res.status(200).json(userCredentials);
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    }

    getUserById(req, res) {
        userModel.getUserById(req.body.userId)
            .then(data => { res.status(200).json(data) })

            .catch(error => {
                res.status(409).json({ message: error.message });
            });
    }

    getCurrentUserPermissions(req, res) {
        userModel.getCurrentUserPermissions(req.session.user.user_id)
            .then(data => { res.status(200).json(data) })

            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    }

    updatePermissionFromName(req, res) {
        userModel.updatePermissionFromName(req.body.permissionId, req.body.field, req.body.value)
            .then(data => { res.status(200).json(data) })

            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    }
}

const userController = new UsersController()

usersRouter.get('/getAllWithPermissions', jwtValidation, userController.getAllWithPermissions)
usersRouter.post('/connectUser', userController.connectUser)
usersRouter.post('/registerUser', userController.registerUser)
usersRouter.post('/getUserById', jwtValidation, userController.getUserById)
usersRouter.get('/getCurrentUserPermissions', jwtValidation, userController.getCurrentUserPermissions)
usersRouter.post('/updatePermissionFromName', jwtValidation, userController.updatePermissionFromName)

export default usersRouter