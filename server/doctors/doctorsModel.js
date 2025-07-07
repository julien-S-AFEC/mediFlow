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
                        resolve(JSON.stringify([]))
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
                        resolve(JSON.stringify(result)[0])
                    }
                })
            })
        })
    }

    getDoctorFromPatientId(id) {
        console.log(id)
        return new Promise((resolve, reject) => {
            const con = createConnection(dbConfig)
            con.connect((err) => {
                if (err) {
                    con.end()
                    reject(err)
                }
                con.query(`SELECT 
                    doctor_firstname,
                    doctor_secondname,
                    doctor_institute,
                    doctor_email,
                    doctor_phone_number
                    FROM doctor_relation 
                    LEFT JOIN doctors 
                    ON doctor_relation.doctor_id=doctors.doctor_id 
                    WHERE patient_id=?;
                    `, [id], (err, result) => {
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
                        resolve(JSON.stringify(result))
                    }
                })
            })
        })
    }

    createDoctor(
        firstname,
        secondName,
        address,
        email,
        phone,
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
                    doctor_institute)
                    VALUES (?, ?, ?, ?, ?, ?)`, [
                firstname,
                secondName,
                address,
                email, ,
                phone,
                institute
            ], (err, result) => {
                if (err) {
                    con.end
                    reject(err)
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