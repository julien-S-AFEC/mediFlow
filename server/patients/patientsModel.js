import { createConnection } from 'mysql'
import { dbConfig } from '../sql/dbConfig.js'

class PatientModel {
    getAll() {
        return new Promise((resolve, reject) => {
            const con = createConnection(dbConfig)
            con.connect((err) => {
                if (err) {
                    con.end()
                    throw err
                }
                con.query("SELECT * FROM patients WHERE 1", (err, result) => {
                    if (err) {
                        con.end
                        throw err
                    }
                    else if (!result) {
                        con.end()
                        reject("Cannot get the patients table")
                    }
                    else {
                        con.end()
                        resolve(result)
                    }
                })
            })
        })
    }
}

export default PatientModel