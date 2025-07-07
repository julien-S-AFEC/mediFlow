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
                con.query("SELECT inst_id, institute_name, institute_address, institute_phone_number FROM institutes WHERE 1", [], (err, result) => {
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

    updateInstituteCredentialsFromId(name, addres, phoneNumber, id) {

        return new Promise((resolve, reject) => {

            const con = createConnection(dbConfig)
            con.query(`
                UPDATE 
                institutes 
                SET
                institutes.institute_name=?,
                institutes.institute_address=?,
                institutes.institute_phone_number= ?
                WHERE
                institutes.inst_id=?
                `, [name, addres, phoneNumber, id], (err, result) => {
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

    createInstitute(instName, instPhone, instAdress) {

        return new Promise((resolve, reject) => {

            const con = createConnection(dbConfig)
            con.query(`
                INSERT INTO 
                institutes
                (
                institute_name, 
                institute_address, 
                institute_phone_number
                )
                VALUES (?, ?, ?)
                `, [instName, instPhone, instAdress], (err, result) => {
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
