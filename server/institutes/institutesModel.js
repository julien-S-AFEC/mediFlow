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

    getInstituteFromPatientId(id) {
        return new Promise((resolve, reject) => {
            const con = createConnection(dbConfig)
            con.connect((err) => {
                if (err) {
                    con.end()
                    reject(err)
                }
                con.query(`SELECT 
                    institute_name,
                    institute_address,
                    institute_phone_number
                    FROM 
                    patients
                    LEFT JOIN
                    institutes
                    ON
                    patients.institute_id=institutes.inst_id 
                    WHERE patient_id=?`, [id], (err, result) => {
                    if (err) {
                        con.end
                        reject(err)
                    }
                    else {
                        con.end()
                        resolve(JSON.stringify(result[0]))
                    }
                })
            })
        })
    }

    updateInstituteFromId(instituteId, patientId) {

        return new Promise((resolve, reject) => {

            const con = createConnection(dbConfig)
            con.query(`
                UPDATE 
                patients 
                SET
                patients.institute_id=?
                WHERE
                patients.patient_id=?
                `, [instituteId, patientId], (err, result) => {
                if (err) {
                    con.end
                    reject(err)
                }
                else {
                    con.end()
                    resolve(result)
                }
            })
        })
    }
}

export default InstituteModel
