import session from 'express-session'
import { Router } from 'express'

const authRouter = Router()

const isConnected = (req, res) => {
    if (req.session?.user) {
        res.status(200).json({ "isConnected": true })
    }
    else {
        res.status(200).json({ "isConnected": false })
    }
}

const isAdmin = (req, res) => {
    if (req.session?.user) {
        res.status(200).json(req.session.user.role_id === 2)
    } else {
        res.status(200).json('cant find session')
    }
}

const logOut = (req, res) => {
    if (req.session?.user) {
        req.session.destroy(() => {
            res.status(200).json("Session deleted")
        })
    }
    else[
        res.status(500).json("Cannot access to the session")
    ]
}

authRouter.get('/isConnected', isConnected)
authRouter.get('/isAdmin', isAdmin)
authRouter.get('/logOut', logOut)

export default authRouter