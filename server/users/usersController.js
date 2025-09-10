import UserModel from "./usersModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import sendEmail from "../utils/mailer.js";
import jsonWebToken from 'jsonwebtoken'

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
        const token = jwt.sign({ userName: result.user.username, userRole: result.user.role_id, userId: result.user.user_id, userEmail: result.user.user_email }, process.env.JWT_SECRET, { expiresIn: '4h' });

        req.session.user = {
            username: result.user.username,
            role_id: result.user.role_id,
            user_id: result.user.user_id,
            user_email: result.user.user_email,
            is_verified: result.user.is_verified,
            create_patient: result.user.create_patient,
            create_prescription: result.user.create_prescription,
            create_prescription_commentary: result.user.create_prescription_commentary,
            jwt: `Bearer ${token}`
        }

        return res.status(200).json({ status: "success", user: result.user })
    }
    catch (error) {
        return res.status(500).json(error.message)
    }
}

export const verifyEmail = async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.userEmail;

        if (decoded) {
            await UserModel.verifyEmail(email);
        }
        res.status(200).json({ status: "success" })

    } catch (error) {
        res.status(400).json({ status: "failed", error: error.message });
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

        const token = jwt.sign({ userName: result.user.username, userRole: result.user.role_id, userId: result.user.user_id, userEmail: result.user.user_email }, process.env.JWT_SECRET, { expiresIn: '8h' });
        req.session.user = {
            username: result.user.username,
            role_id: result.user.role_id,
            user_id: result.user.user_id,
            user_email: result.user.user_email,
            is_verified: result.user.is_verified,
            create_patient: result.create_patient,
            create_prescription: result.create_prescription,
            create_prescription_commentary: result.create_prescription_commentary,
            jwt: `Bearer ${token}`
        };

        const link = `http://localhost:3000/emailVerified/${token}`;

        await sendEmail({
            to: result.user.user_email,
            subject: 'Account verification.',
            html: `<p>Hello ${result.user.username},</p>
         <p> Thank you for signing up. Click on the link below to check your account:</p>
         <a href="${link}">${link}</a>`
        });

        return res.status(200).json(result)
    }
    catch (error) {
        return res.status(500).json(error.message)
    }
}

export const sendAnotherVerificationEmail = async (req, res) => {
    const { username, role_id, user_id, user_email } = req.body

    try {
        const token = jwt.sign({ userName: username, userRole: role_id, userId: user_id, userEmail: user_email }, process.env.JWT_SECRET, { expiresIn: '8h' });

        const link = `http://localhost:3000/emailVerified/${token}`;

        await sendEmail({
            to: user_email,
            subject: 'Medi Flow account verification.',
            html: `<p>Hello ${username},</p>
         <p> Thank you for signing up. Click on the link below to check your account:</p>
         <a href="${link}">${link}</a>`
        });

        return res.status(200).json({ status: "success" })
    }
    catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
}

export const sendResetPasswordMail = async (req, res) => {
    const { email } = req.body
    try {
        const checkuser = await UserModel.getUserByEmail(email)
        if (checkuser.status === 'failed') {
            return res.status(200).json({ status: "failed", message: "The user is not found." })
        }

        const token = jwt.sign({ userEmail: email }, process.env.JWT_SECRET, { expiresIn: '24h' });

        const link = `http://localhost:3000/resetPassword/${token}`;

        await sendEmail({
            to: email,
            subject: 'Medi Flow password reset.',
            html: `<p>Hello,</p>
            <p> We received a request to reset your password. If you made this request, please click the link below to create a new password:</p>
            <a href="${link}">${link}</a>
            <p>This link will expire in 1 hour for your security.</p>
            <p>If you did not request a password reset, you can safely ignore this email. Your account will remain secure.</p>
            <p>Best regards,</p>
            <p>The Medi Flow Team</p>
            `
        });

        return res.status(200).json({ status: "success" })
    }
    catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
}

export const changePasswordFromJWT = async (req, res) => {
    const { token, password } = req.body
    try {
        const email = jsonWebToken.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json("The json web token is not valid or expired.")
            }
            const result = await UserModel.changePasswordFromJWT(decoded.userEmail, bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS)))
            return res.status(200).json({ status: 'success' })
        })
    }

    catch (error) {
        return res.status(500).json(error.message)
    }
}

export const getUserByMail = async (req, res) => {
    const { email } = req.body
    try {
        const result = await UserModel.getUserByEmail(email)

        if (result.status === 'success') {
            const token = jwt.sign({ userEmail: result.user.user_email }, process.env.JWT_SECRET, { expiresIn: '8h' });

            return res.status(200).json({ status: 'success', jwt: token })
        }
        else {
            return res.status(200).json({ status: 'failed', message: "The user is not found." })
        }
    }

    catch (error) {
        return res.status(500).json(error.message)
    }
}

export const getUserById = (req, res) => {
    UserModel.getUserById(req.body.userId)
        .then(data => {
            delete data.user_password
            res.status(200).json(data)
        })

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
        .then(data => {
            req.session.user[field] = value
            res.status(200).json("Modification successfully done.")
        })

        .catch(error => {
            res.status(500).json({ message: error.message });
        })
}

export const changeNameFromId = (req, res) => {
    UserModel.changeNameFromId(req.body.userId, req.body.newName)
        .then(data => {
            req.session.user.username = req.body.newName
            res.status(200).json(data)
        })

        .catch(error => {
            res.status(500).json({ message: error.message });
        });
}

export const changeEmailFromId = (req, res) => {
    UserModel.changeEmailFromId(req.body.userId, req.body.newEmail)
        .then(data => {
            req.session.user.user_email = req.body.newName
            res.status(200).json(data)
        })

        .catch(error => {
            res.status(500).json({ message: error.message });
        });
}

export const changePasswordFromId = (req, res) => {
    UserModel.changePasswordFromId(req.body.userId, bcrypt.hashSync(req.body.newPassword, parseInt(process.env.SALT_ROUNDS)))
        .then(data => {
            res.status(200).json(data)
        })

        .catch(error => {
            res.status(500).json({ message: error.message })
        })
}
