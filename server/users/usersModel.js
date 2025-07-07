import { createConnection } from 'mysql'
import { dbConfig } from '../sql/dbConfig.js'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 5

//TOOD, Switch createConnection to pool

class UserModel {
    connectUser(email, password) {
        return new Promise((resolve, reject) => {

            const con = createConnection(dbConfig)
            con.connect((err) => {
                if (err) {
                    con.end()
                    reject(err)
                }
                con.query(`SELECT username, user_email, user_password, role_id, user_id FROM users WHERE user_email = ?`, [email], (err, result) => {
                    con.end()
                    if (err) {
                        reject(err)
                    }
                    else if (!result.length) {
                        reject("User not found")
                    }
                    else {
                        if (bcrypt.compareSync(password, result[0].user_password)) {
                            resolve(JSON.stringify(result))
                        }
                        else {
                            reject("Invalid password")
                        }
                    }
                })
            })
        })
    }

    registerUser(name, email, password) {
        return new Promise((resolve, reject) => {

            const con = createConnection(dbConfig)
            con.connect((err) => {
                if (err) {
                    con.end()
                    reject(err)
                    return
                }
                con.query("SELECT * FROM USERS WHERE username = ? OR user_email = ?", [name, email], (err, userResult) => {
                    if (err) {
                        con.end()
                        reject(err)
                        return
                    }
                    if (!userResult.length) {
                        con.query("INSERT INTO `permissions`() VALUES ();", ((err, permissionResult) => {
                            if (err) {
                                con.end()
                                reject(err)
                                return
                            }
                            const permissionId = permissionResult.insertId
                            con.query("INSERT INTO users (`username`, `user_email`, `user_password`, `role_id`, `permissions`) VALUES (?, ?, ?, ?, ?)",
                                [name, email, bcrypt.hashSync(password, SALT_ROUNDS), 1, permissionId], (err, result) => {
                                    if (err) {
                                        con.end()
                                        reject(err)
                                    }
                                    con.end()
                                    resolve(JSON.stringify(JSON.parse(result.insertId)))
                                }
                            )
                        }))
                    }
                    else {
                        reject("Name or email already used")
                    }
                })
            })
        })
    }

    getUserById(id) {
        return new Promise((resolve, reject) => {

            const con = createConnection(dbConfig)
            con.connect((err) => {
                if (err) {
                    con.end()
                    throw err
                }
                con.query("SELECT * FROM USERS WHERE user_id = ?", [id], (err, result) => {
                    if (err) {
                        con.end()
                        reject(err)
                    }
                    else if (!result) {
                        con.end()
                        reject("Can't get the user")
                    }
                    else {
                        con.end()
                        resolve(JSON.stringify(result))
                    }
                })
            })
        })
    }

    getCurrentUserPermissions(userId) {
        return new Promise((resolve, reject) => {
            this.getUserById(userId)
                .then(data => {
                    const permissionId = JSON.parse(data)[0].permissions
                    const con = createConnection(dbConfig)
                    con.query("SELECT * FROM permissions WHERE permission_id = ?", [permissionId], (err, result) => {
                        if (err) {
                            reject(err)
                            con.end()
                            return
                        }
                        resolve(result[0])
                        con.end()
                    })
                })
                .catch(error => reject(error))
        })
    }
}

export default UserModel
