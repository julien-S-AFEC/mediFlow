import UserModel from "./usersModel.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import sendEmail from "../utils/mailer.js";

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
        console.log('result ->', result)

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
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.user_email;

        await UserModel.verifyEmail(email);

        res.sendFile(path.join(__dirname, 'localhost:3000/emailConfirmed'));

    } catch (error) {
        res.status(400).json({ message: "Lien invalide ou expiré." });
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
            create_patient: result.create_patient,
            create_prescription: result.create_prescription,
            create_prescription_commentary: result.create_prescription_commentary,
            jwt: `Bearer ${token}`
        };
        //Standby until i get the smtp validation from Brevo.
        const link = `http://localhost:3000/api/user/verifyEmail/${token}`;

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

export const sendResetPasswordEmail = async (req, res) => {
    try {
        const link = `http://localhost:3000/api/user/resetPassword/${token}`;

        await sendEmail({
            to: result.user.user_email,
            subject: 'Reset your password..',
            html: `<p>Hello ${result.user.username},</p>
         <p> Here is the link to reset your password:</p>
         <a href="${link}">${link}</a>`
        });
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
