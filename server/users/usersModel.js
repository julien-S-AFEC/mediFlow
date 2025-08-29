import { pool } from '../config/db.js'
import bcrypt from 'bcrypt'

const UserModel = {
    getAllWithPermissions: async () => {
        try {
            const [rows] = await pool.execute(`SELECT 
                            username, 
                            user_email, 
                            user_status, 
                            role_name, 
                            create_patient, 
                            create_prescription, 
                            create_prescription_commentary, 
                            permission_id,
                            is_verified
                            FROM 
                            users
                            LEFT JOIN
                            permissions
                            ON
                            permissions.permission_id=users.permissions
                            LEFT JOIN
                            roles
                            ON
                            roles.id=users.role_id
                            WHERE 1`, [])
            if (!rows.length) {
                throw new Error("The users are not found")
            }
            return rows
        }
        catch (error) {
            throw new Error(error.message)
        }
    },

    login: async (email, password) => {
        try {
            const user = await pool.execute(`SELECT 
                username, 
                user_email, 
                user_password, 
                role_id, 
                user_id,
                is_verified,
                create_patient,
                create_prescription,
                create_prescription_commentary
                FROM 
                users 
                LEFT JOIN
                permissions
                ON
                permissions.permission_id=users.permissions
                WHERE user_email = ?`, [email])
            if (!user[0].length) {
                return { status: 'failed', statusCode: 404, message: "The user is not found." }
            }
            return { status: 'success', user: user[0][0] }
        }
        catch (error) {
            throw error
        }
    },

    getUserByEmail: async (email) => {
        try {
            const [rows] = await pool.execute(`SELECT 
                username, 
                user_email, 
                user_password, 
                role_id, 
                user_id,
                is_verified,
                create_patient,
                create_prescription,
                create_prescription_commentary
                FROM 
                users 
                LEFT JOIN
                permissions
                ON
                permissions.permission_id=users.permissions
                WHERE user_email = ?`, [email])
            if (rows.length) {
                return { status: "success", user: rows[0] }
            }
            return { status: "failed" }
        }
        catch (error) {
            throw new Error(error.message)
        }
    },

    getUserByNameOrEmail: async (name, email) => {
        try {
            const [rows] = await pool.execute("SELECT * FROM users WHERE username = ? OR user_email = ?", [name, email])
            return rows
        }
        catch (error) {
            throw new Error(error.message)
        }
    },

    createPermissionTable: async () => {
        try {
            const [rows] = await pool.execute(`INSERT INTO permissions() VALUES ()`, [])
            if (!rows.insertId) {
                throw new Error("The permission table cannot be created.")
            }
            return rows.insertId
        }
        catch (error) {
            throw new Error(error.message)
        }
    },

    registerUser: async (name, email, password) => {
        try {
            const user = await UserModel.getUserByNameOrEmail(name, email)
            if (user.length) {
                return { status: 'failed', statusCode: 401, message: "The username or email is already used." }
            }

            const permissionId = await UserModel.createPermissionTable()

            const [rows, fields] = await pool.execute(`INSERT INTO users (username, user_email, user_password, role_id, permissions) 
                VALUES (?, ?, ?, ?, ?)`,
                [name, email, password, 1, permissionId])

            const createdUser = await UserModel.getUserById(rows.insertId)
            return { status: 'success', message: "User successfully created.", user: createdUser }

        } catch (error) {
            throw error
        }
    },

    verifyEmail: async (email) => {
        try {
            const [result] = await pool.execute('UPDATE users SET is_verified = true WHERE user_email = ?', [email]);
            return result;
        }
        catch (error) {
            throw error
        }
    },

    changePasswordFromJWT: async (email, password) => {
        try {
            const [result] = await pool.execute('UPDATE users SET user_password=? WHERE user_email=?', [password, email]);
            return result;
        }
        catch (error) {
            throw error
        }
    },

    getUserById: async (id) => {
        try {
            const [rows] = await pool.execute(`SELECT * 
                FROM users 
                LEFT JOIN
                permissions
                ON
                permissions.permission_id=users.permissions
                LEFT JOIN
                roles
                ON
                roles.id=users.role_id
                WHERE user_id = ?`, [id])

            if (!rows.length) {
                throw new Error("The user is not found")
            }
            return rows[0]
        }
        catch (error) {
            throw new Error(error.message)
        }
    },

    getCurrentUserPermissions: async (userId) => {
        try {
            const user = await UserModel.getUserById(userId)
            if (!Object.keys(user)) {
                throw new Error("The user is not found.")
            }
            const [rows] = await pool.execute(`SELECT * FROM permissions WHERE permission_id = ?`, [user.permissions])
            return rows[0]
        }
        catch (error) {
            throw new Error(error)
        }
    },

    updatePermissionFromName: async (permissionId, field, value) => {
        try {
            if (!["create_patient", "create_prescription", "create_prescription_commentary"].includes(field)) {
                throw new Error("Invalid field name.")
            }
            const [rows] = await pool.execute(`UPDATE
            permissions
            SET 
            ${field} = ?
            WHERE 
            permissions.permission_id=?
            `, [value, permissionId])
            if (!rows) {
                throw new Error("Cannot modify the field.")
            }
            return rows[0]
        }
        catch (error) {
            throw new Error(error)
        }
    },

    changeNameFromId: async (id, newName) => {
        try {
            const [rows] = await pool.execute(`
                UPDATE
                users
                SET
                username=?
                WHERE
                users.user_id=?
                `, [newName, id])
            return rows
        }
        catch (error) {
            throw new Error(error.message)
        }
    },

    changeEmailFromId: async (id, newName) => {
        try {
            const [rows] = await pool.execute(`
                UPDATE
                users
                SET
                user_email=?
                WHERE
                users.user_id=?
                `, [newName, id])
            return rows
        }
        catch (error) {
            throw new Error(error.message)
        }
    },

    changePasswordFromId: async (id, newName) => {
        try {
            const [rows] = await pool.execute(`
                UPDATE
                users
                SET
                user_password=?
                WHERE
                users.user_id=?
                `, [newName, id])
            return rows
        }
        catch (error) {
            throw new Error(error.message)
        }
    }
}

export default UserModel
