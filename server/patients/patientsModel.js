import { createConnection } from 'mysql'
import { dbConfig } from '../sql/dbConfig.js'

class PatientModel {
    getAll() {
        return new Promise((resolve, reject) => {
            const con = createConnection(dbConfig)
            con.connect((err) => {
                if (err) {
                    con.end()
                    reject(err)
                }
                con.query("SELECT * FROM patients LEFT JOIN institutes ON patients.institute_id = institutes.inst_id WHERE 1", (err, result) => {
                    if (err) {
                        con.end
                        reject(err)
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
    getPatientFromId(id) {
        return new Promise((resolve, reject) => {
            const con = createConnection(dbConfig)
            con.connect((err) => {
                if (err) {
                    con.end()
                    reject(err)
                }
                con.query(`SELECT patient_firstname, 
                    patient_secondname, 
                    gender, 
                    age, 
                    address, 
                    email, 
                    insurance_number, 
                    created_at, 
                    institute_name, 
                    institute_address, 
                    institute_phone_number  
                    FROM 
                    patients 
                    LEFT JOIN institutes ON patients.institute_id = institutes.inst_id 
                    WHERE patient_id=?`, [id], (err, result) => {
                    if (err) {
                        con.end
                        reject(err)
                    }
                    else if (!result) {
                        con.end()
                        reject("Cannot get the patient")
                    }
                    else {
                        con.end()
                        resolve(result[0])
                    }
                })
            })
        })
    }

    getOrCreateInstitute(instName)

    createPatient(
        firstName,
        secondName,
        gender,
        age,
        address,
        email,
        insurance,
        institute,
        doctor) {
        return new Promise((resolve, reject) => {
            const con = createConnection(dbConfig)


                // con.query(`INSERT INTO patients 
                //     (
                //     patient_firstname, 
                //     patient_secondname, 
                //     gender, 
                //     age, 
                //     address, 
                //     email, 
                //     insurance_number, 
                //     institute_id)
                //     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
                //     firstName,
                //     secondName,
                //     gender,
                //     age,
                //     address,
                //     email,
                //     insurance,
                //     institute], (err, result) => {
                //         if (err) {
                //             con.end
                //             reject(err)
                //         }
                //         else if (!result) {
                //             con.end()
                //             reject("Cannot get the patient")
                //         }
                //         else {
                //             con.end()
                //             resolve(result[0])
                //         }
                //     })
            })
        })
    }
}

export default PatientModel