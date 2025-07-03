import { createConnection } from 'mysql'
import { dbConfig } from '../sql/dbConfig.js'

class DoctorModel {
    getAll() {
        return new Promise((resolve, reject) => {
            const con = createConnection(dbConfig)
            con.connect((err) => {
                if (err) {
                    con.end()
                    reject(err)
                }
                con.query("SELECT * FROM doctors WHERE 1", (err, result) => {
                    if (err) {
                        con.end
                        reject(err)
                    }
                    else if (!result) {
                        con.end()
                        reject("Cannot get the doctor table")
                    }
                    else {
                        con.end()
                        resolve(JSON.stringify(result))
                    }
                })
            })
        })
    }
    getDoctorFromId(id) {
        return new Promise((resolve, reject) => {
            const con = createConnection(dbConfig)
            con.connect((err) => {
                if (err) {
                    con.end()
                    reject(err)
                }
                con.query(`SELECT *
                    FROM 
                    doctors 
                    WHERE doctor_id=?`, [id], (err, result) => {
                    if (err) {
                        con.end
                        reject(err)
                    }
                    else if (!result) {
                        con.end()
                        reject("Cannot get the doctor")
                    }
                    else {
                        con.end()
                        resolve(result[0])
                    }
                })
            })
        })
    }

    createDoctor(
        firstName,
        secondName,
        address,
        email,
        phoneNumber,
        institute
    ) {

        return new Promise((resolve, reject) => {
            const con = createConnection(dbConfig)
            con.query(`INSERT INTO doctors 
                    (
                    doctor_firstname, 
                    doctor_secondname, 
                    doctor_address, 
                    doctor_email, 
                    doctor_phone_number, 
                    doctor_institute
                    VALUES (?, ?, ?, ?, ?, ?)`, [
                firstName,
                secondName,
                address,
                email, ,
                institute,
                phoneNumber
            ], (err, result) => {
                if (err) {
                    con.end
                    reject(err)
                }
                else if (!result) {
                    con.end()
                    reject("Cannot create the doctor")
                }
                else {
                    con.end()
                    resolve(result[0])
                }
            })
        })
    }
}

export default DoctorModel