import { createConnection } from 'mysql'

const QUERY = `INSERT INTO roles(role_name) VALUES ('admin')`

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
            con.query(query, (err, result) => {
                con.end()
                resolve(result)
            })
        })
    })
}

runQuery(QUERY)