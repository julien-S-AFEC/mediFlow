import { pool } from '../sql/dbConfig.js'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 5

class UserModel {
    async connectUser(email, password) {
        const con = await pool.getConnection()
        return con.execute(`SELECT username, user_email, user_password, role_id, user_id FROM users WHERE user_email = ?`, [email])
            .then((rows, fields) => {
                con.release();
                if (!rows) {
                    throw new Error("The user is not found")
                }
                if (bcrypt.compareSync(password, rows[0][0].user_password)) {
                    return JSON.stringify(rows[0])
                }
                else { throw new Error("The password doesnt match") }
            })
            .catch(error => {
                con.release();
                throw new Error("The user is not found")
            })
    }

    async getUserByNameOrEmail(name, email) {
        const con = await pool.getConnection()
        return con.execute("SELECT * FROM USERS WHERE username = ? OR user_email = ?", [name, email])
            .then((rows, fields) => {
                con.release();
                if (!rows) {
                    return false
                }
                return JSON.stringify(rows[0][0])
            })
            .catch(error => {
                con.release();
                throw new Error("The user is not found")
            })
    }

    async createPermissionTable() {
        const con = await pool.getConnection()
        return con.execute(`INSERT INTO permissions() VALUES ()`, [])
            .then((rows, fields) => {
                con.release();
                return rows[0].insertId
            })
            .catch(error => {
                con.release();
                throw new Error("The permission table cannot be created.")
            })
    }

    async registerUser(name, email, password) {
        try {
            const user = await this.getUserByNameOrEmail(name, email)

            if (user) {
                throw new Error("The username or email is already used.")
            }

            const permissionId = await this.createPermissionTable()

            try {
                const con = await pool.getConnection()
                const [rows, fields] = await con.execute(`INSERT INTO users (username, user_email, user_password, role_id, permissions) 
                VALUES (?, ?, ?, ?, ?)`,
                    [name, email, bcrypt.hashSync(password, SALT_ROUNDS), 1, permissionId])
                con.release()
                return JSON.stringify(rows.insertId)

            } catch (error) {
                throw error
            }
        } catch (error) {
            throw error
        }
    }

    async getUserById(id) {
        const con = await pool.getConnection()
        return con.execute(`SELECT * FROM USERS WHERE user_id = ?`, [id])
            .then((rows, fields) => {
                con.release();
                if (!rows) {
                    throw new Error("The user is not found")
                }
                return JSON.stringify(rows[0])
            })
            .catch(error => {
                con.release();
                throw new Error("The user is not found")
            })
    }

    async getCurrentUserPermissions(userId) {
        const user = await this.getUserById(userId)

        const con = await pool.getConnection()
        return con.execute(`SELECT * FROM permissions WHERE permission_id = ?`, [JSON.parse(user)[0].permissions])
            .then((rows, fields) => {
                con.release();
                if (!rows) {
                    throw new Error("The user is not found")
                }
                return JSON.stringify(rows[0][0])
            })
            .catch(error => {
                con.release();
                throw new Error("The user is not found")
            })
    }
}

export default UserModel
