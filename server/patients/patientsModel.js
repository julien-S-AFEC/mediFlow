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
                con.query(`SELECT 
                    patient_firstname, 
                    patient_secondname, 
                    gender, 
                    birth_date, 
                    address, 
                    email, 
                    insurance_number, 
                    created_at
                    FROM 
                    patients 
                    WHERE patients.patient_id=?`, [id, id], (err, result) => {
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

    createPatient(
        firstName,
        secondName,
        gender,
        birth_date,
        address,
        email,
        insurance,
        institute,
        doctor) {

        return new Promise((resolve, reject) => {
            const con = createConnection(dbConfig)
            con.query(`INSERT INTO patients 
                    (
                    patient_firstname, 
                    patient_secondname, 
                    gender, 
                    birth_date, 
                    address, 
                    email, 
                    insurance_number, 
                    institute_id)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
                firstName,
                secondName,
                gender,
                birth_date,
                address,
                email,
                insurance,
                institute
            ], (err, result) => {
                if (err) {
                    con.end
                    reject(err)
                }
                else {
                    if (doctor) {
                        con.end()
                        this.createDoctorRelationTable(doctor, result.insertId)
                            .then(() => {
                                resolve(result[0])
                            })
                        return
                    }
                    con.end()
                    resolve(result[0])
                }
            })
        })
    }
    createDoctorRelationTable(doctoId, patientId) {
        return new Promise((resolve, reject) => {

            const con = createConnection(dbConfig)
            con.query(`INSERT INTO doctor_relation 
                    (doctor_id, patient_id) VALUES (?, ?)`, [doctoId, patientId], (err, result) => {
                if (err) {
                    con.end
                    reject(err)
                }
                else {
                    con.end()
                    resolve(result)
                }
            }
            )
        })
    }

    updatePatient(
        patientId,
        firstName,
        secondName,
        gender,
        birthDate,
        address,
        email,
        insurance) {

        return new Promise((resolve, reject) => {
            const con = createConnection(dbConfig)
            con.query(`
                UPDATE 
                patients 
                SET
                patient_firstname=?,
                patient_secondname=?,
                gender=?,
                birth_date=?,
                address=?,
                email=?,
                insurance_number=?
                WHERE patients.patient_id=?`, [
                firstName,
                secondName,
                gender,
                birthDate,
                address,
                email,
                insurance,
                patientId
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

    updateDoctorFromId(patientId, doctorId) {

        return new Promise((resolve, reject) => {

            const con = createConnection(dbConfig)
            con.query(`
                UPDATE 
                doctor_relation 
                SET
                end_date=NOW()
                WHERE
                doctor_relation.doctor_id=? and doctor_relation.patient_id=?
                `, [doctorId, patientId], (err, result) => {
                if (err) {
                    con.end
                    reject(err)
                }
                else {
                    con.query(`
                INSERT INTO 
                doctor_relation 
                (doctor_id,
                patient_id,
                start_date
                )
                VALUES
                (?, ?, NOW())
                `, [doctorId, patientId], (err, result) => {
                        if (err) {
                            con.end
                            reject(err)
                        }
                        else {
                            con.end()
                            resolve(result)
                        }
                    })
                }
            })
        })
    }
}

export default PatientModel