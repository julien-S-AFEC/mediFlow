import UserModel from "./usersModel.js"
import { Router } from "express"

const usersRouter = Router()
const userModel = new UserModel()

class UsersController {
    getAll(req, res) {
        try {
            userModel.getAll()
                .then(data => {
                    console.log(data)
                    res.status(200).json(data)
                })
        }
        catch (error) {
            res.status(500).json({ "message": "Cannot fetch" })
            console.log(error)
        }
    }
    connectUser(req, res) {
        userModel.connectUser(req.body.email, req.body.password)
            .then(data => {
                res.status(200).json(data)
            })

            .catch(error => {
                res.status(500).json({ "message": "Cannot fetch" })
                console.log(error)
            })
    }
    registerUser(req, res) {
        userModel.registerUser(req.body.name, req.body.email, req.body.password)
            .then(data => {
                res.status(200).json(data)
            })

            .catch(error => {
                res.status(409).json({ "message": error })
            })
    }

}

const userController = new UsersController()

usersRouter.get('/getAll', userController.getAll)
usersRouter.post('/connectUser', userController.connectUser)
usersRouter.post('/registerUser', userController.registerUser)

export default usersRouter