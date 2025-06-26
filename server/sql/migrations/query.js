import { createConnection } from 'mysql'


const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: "",
    database: "medi_flow"
}

const runSQLQuery = (query, data) => {
    return new Promise((resolve, reject) => {
        const con = createConnection(dbConfig)
        con.connect((err) => {
            console.log(err)
            con.query(query, data, (err, result) => {
                con.end()
                resolve(result)
            })
        })
    })
}

export default runSQLQuery