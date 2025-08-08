import UserModel from "./usersModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const getAllWithPermissions = (req, res) => {
    UserModel.getAllWithPermissions()
        .then(data => { res.status(200).json(data) })

        .catch(error => {
            res.status(409).json({ message: error.message });
        });
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await UserModel.login(email, password)

        if (result.status === 'failed') {
            return res.status(result.statusCode).json(result.message)
        }
        const match = await bcrypt.compare(password, result.user.user_password)
        if (!match) {
            return res.status(401).json("The password is incorrect.")
        }
        const token = jwt.sign({ userName: result.user.username, userRole: result.user.role_id, userId: result.user.user_id }, process.env.JWT_SECRET, { expiresIn: '4h' });

        req.session.user = {
            username: result.user.username,
            role_id: result.user.role_id,
            user_id: result.user.user_id,
            user_email: result.user.user_email,
            jwt: `Bearer ${token}`
        }

        return res.status(200).json({status: "success", user: result.user})
    }
    catch (error) {
        return res.status(500).json(error.message)
    }
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashedPass = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS))
        const result = await UserModel.registerUser(name, email, hashedPass)

        if (result.status === 'failed') {
            return res.status(result.statusCode).json(result.message)
        }
        const token = jwt.sign({ userName: result.user.username, userRole: result.user.role_id, userId: result.user.user_id }, process.env.JWT_SECRET, { expiresIn: '4h' });

        req.session.user = {
            username: result.user.username,
            role_id: result.user.role_id,
            user_id: result.user.user_id,
            user_email: result.user.user_email,
            jwt: `Bearer ${token}`
        };
        return res.status(200).json(result)
    }
    catch (error) {
        return res.status(500).json(error.message)
    }
}

export const getUserById = (req, res) => {
    UserModel.getUserById(req.body.userId)
        .then(data => { 
            delete data.user_password
            res.status(200).json(data) })

        .catch(error => {
            res.status(409).json({ message: error.message });
        });
}

export const getCurrentUserPermissions = (req, res) => {
    if (!req.session && req.session.user) {
        res.status(500).json({ message: "The session cannot be found." });
    }
    UserModel.getCurrentUserPermissions(req.session.user.user_id)
        .then(data => { res.status(200).json(data) })

        .catch(error => {
            res.status(500).json({ message: `Cannot get the user permissions: ${error.message}` });
        });
}

export const updatePermissionFromName = (req, res) => {
    const { permissionId, field, value } = req.body
    UserModel.updatePermissionFromName(permissionId, field, value)
        .then(data => { res.status(200).json("Modification successfully done.") })

        .catch(error => {
            res.status(500).json({ message: error.message });
        });
}
