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
                    role_id: credentials.role_id
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
            .then(data => {
                const credentials = JSON.parse(data)[0]
                req.session.user = {
                    username: credentials.username,
                    role_id: credentials.role_id
                }
                res.status(200).json(data)
            })

            .catch(error => {
                res.status(409).json({ "message": error })
            })
    }
}

const userController = new UsersController()

usersRouter.post('/connectUser', userController.connectUser)
usersRouter.post('/registerUser', userController.registerUser)

export default usersRouter