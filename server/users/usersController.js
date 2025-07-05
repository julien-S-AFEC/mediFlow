import UserModel from "./usersModel.js"
import { Router } from "express"

const usersRouter = Router()
const userModel = new UserModel()

class UsersController {
    connectUser(req, res) {
        userModel.connectUser(req.body.email, req.body.password)
            .then(data => {
                const credentials = JSON.parse(data)[0]
                req.session.user = {
                    username: credentials.username,
                    role_id: credentials.role_id,
                    user_id: credentials.user_id
                }
                res.status(200).json(data)
            })

            .catch(error => {
                res.status(409).json({ "message": error })
                console.log(error)
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
                res.status(409).json({ message: error.message || error });
            });
    }

    getUserById(req, res) {
        userModel.getUserById(req.body.userId)
            .then(data => { res.status(200).json(data) })

            .catch(error => {
                res.status(409).json({ message: error.message || error });
            });
    }

    getCurrentUserPermissions(req, res) {
        userModel.getCurrentUserPermissions(req.session.user.user_id)
            .then(data => { res.status(200).json(data) })

            .catch(error => {
                res.status(409).json({ message: error.message || error });
            });
    }
}

const userController = new UsersController()

usersRouter.post('/connectUser', userController.connectUser)
usersRouter.post('/registerUser', userController.registerUser)
usersRouter.post('/getUserById', userController.getUserById)
usersRouter.get('/getCurrentUserPermissions', userController.getCurrentUserPermissions)

export default usersRouter