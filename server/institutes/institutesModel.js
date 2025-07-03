import { createConnection } from 'mysql'
import { dbConfig } from '../sql/dbConfig.js'


class InstituteModel {
    getAll() {
        return new Promise((resolve, reject) => {
            const con = createConnection(dbConfig)
            con.connect((err) => {
                if (err) {
                    con.end()
                    reject(err)
                    return
                }
                con.query("SELECT inst_id, institute_name FROM institutes WHERE 1", [], (err, result) => {
                    if (err) {
                        con.end()
                        reject(err)
                        return
                    }
                    else {
                        resolve(JSON.stringify(result))
                    }
                })
            })
        })
    }
}

export default InstituteModel
