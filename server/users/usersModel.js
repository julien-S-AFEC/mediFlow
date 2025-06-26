import { createConnection } from 'mysql'

const db_config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "medi_flow"
}

class UserModel {
    getAll() {
        return new Promise((resolve, reject) => {
            const con = createConnection(db_config)
            con.connect((err) => {
                if (err) {
                    con.end()
                    throw err
                }
                con.query("SELECT * FROM users", (err, result) => {
                    resolve(result)
                })
            })
            con.end()
        })
    }

    connectUser(email, password) {
        return new Promise((resolve, reject) => {

            const con = createConnection(db_config)
            con.connect((err) => {
                if (err) {
                    con.end()
                    throw err
                }
                con.query(`SELECT username, user_email FROM users WHERE user_email = ? and user_password = ?`, [email, password], (err, result) => {
                    con.end()
                    if (err) {
                        throw err
                    }
                    resolve(JSON.stringify(result))
                })
            })
        })
    }

    registerUser(name, email, password) {
        return new Promise((resolve, reject) => {

            const con = createConnection(db_config)
            con.connect((err) => {
                if (err) {
                    con.end()
                    throw err
                }
                con.query("SELECT * FROM USERS WHERE username = ? OR user_email = ?", [name, email], (err, result) => {
                    if (err) {
                        con.end()
                        throw err
                    }
                    if (!result.length) {
                        con.query("INSERT INTO users (`username`, `user_email`, `user_password`, `role_id`) VALUES (?, ?, ?, ?)",
                            [name, email, password, 1], (err, result) => {
                                if (err) {
                                    con.end()
                                    throw err
                                }
                                con.end()
                                resolve(JSON.stringify(result))
                            }
                        )
                    }
                    else {
                        reject("Name or email already used")
                    }
                })
            })
        })
    }
}

export default UserModel