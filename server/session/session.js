import { Router } from 'express'
const sessionRouter = Router()

const isConnected = (req, res) => {
    if (req.session?.user) {
        res.status(200).json({ "isConnected": true })
    }
    else {
        res.status(200).json({ "isConnected": false })
    }
}

const getCurrentUser = (req, res) => {
    if (req.session?.user) {
        res.status(200).json({ user: req.session.user })
    }
    else {
        res.status(500).json({ message: "user not found."})
    }
}

const isAdmin = (req, res) => {
    if (req.session?.user) {
        res.status(200).json(req.session.user.role_id === 2)
    } else {
        res.status(500).json('cant find session')
    }
}

const logOut = (req, res) => {
    if (req.session?.user) {
        req.session.destroy(() => {
            res.status(200).json("Session deleted")
        })
    }
    else[
        res.status(500).json({ "message": "Cannot access to the session" })
    ]
}

sessionRouter.get('/isConnected', isConnected)
sessionRouter.get('/getCurrentUser', getCurrentUser)
sessionRouter.get('/isAdmin', isAdmin)
sessionRouter.get('/logOut', logOut)

export default sessionRouter