import { createConnection } from 'mysql'

const db_config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "medi_flow"
}

class UserModel {
    static getUsers() {
        return new Promise((resolve, reject) => {
            const con = createConnection(db_config)
            con.connect((err) => {
                con.query("SELECT * FROM users", (err, result) => {
                    resolve(result)
                })
            })
        })
    }
}

export default UserModel