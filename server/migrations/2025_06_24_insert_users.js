import { createConnection } from 'mysql'

const QUERY = `INSERT INTO user(username, email, user_password, user_status, role_id) VALUES ('moi', 'moi@gmail.com', 'moi123', 1, 1)`

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: "",
    database: "medi_flow"
}

const runQuery = (query) => {
    return new Promise((resolve, reject) => {
        const con = createConnection(dbConfig)
        con.connect((err) => {
            console.log(err)
            con.query(query, (err, result) => {
                console.log(result)
                con.end()
                resolve(result)
            })
        })
    })
}

runQuery(QUERY)