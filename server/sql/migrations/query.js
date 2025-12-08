import { createConnection } from 'mysql'


const runSQLQuery = (query, data) => {
    return new Promise((resolve, reject) => {
        const dbConfig = {
            host: process.env.DB_HOST || 'mediFlow-db',
            user: process.env.DB_USER || 'medi_flow',
            password: process.env.DB_PASSWORD || 'medi_flow123',
            database: process.env.DB_NAME || 'medi_flow',
            multipleStatements: true
        }
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