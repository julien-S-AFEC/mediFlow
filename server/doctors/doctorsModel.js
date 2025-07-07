import { pool } from '../sql/dbConfig.js'

class DoctorModel {
    async getAll() {
        const con = await pool.getConnection()
        return con.execute("SELECT * FROM doctors WHERE 1", [])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0])
            })
            .catch(error => {
                con.release();
                throw error
            })
    }
    async getDoctorFromId(id) {
        const con = await pool.getConnection()
        return con.execute("SELECT * FROM doctors WHERE doctors.doctor_id=?", [id])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0])
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    async getDoctorFromPatientId(id) {
        const con = await pool.getConnection()
        return con.execute(`SELECT 
                    doctor_firstname,
                    doctor_secondname,
                    doctor_institute,
                    doctor_email,
                    doctor_phone_number
                    FROM doctor_relation 
                    LEFT JOIN doctors 
                    ON doctor_relation.doctor_id=doctors.doctor_id 
                    WHERE patient_id=?`, [id])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0])
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    async createDoctor(
        firstname,
        secondName,
        address,
        email,
        phone,
        institute
    ) {
        const con = await pool.getConnection()
        return con.execute(`INSERT INTO doctors 
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
            email,
            phone,
            institute
        ])
            .then((rows, fields) => {
                con.release()
                return rows[0]
            })
            .catch(error => {
                con.release()
                    ; throw error
            })
    }

    async updateDoctorCredentialsFromId(
        firstname,
        secondname,
        institute,
        address,
        phoneNumber,
        email,
        doctorId
    ) {
        const con = await pool.getConnection()
        return con.execute(`UPDATE doctors
                    SET
                    doctor_firstname=?, 
                    doctor_secondname=?, 
                    doctor_institute= ?,
                    doctor_address= ?, 
                    doctor_phone_number=?, 
                    doctor_email=?
                    WHERE
                    doctors.doctor_id=?
                    `, [
            firstname,
            secondname,
            institute,
            address,
            phoneNumber,
            email,
            doctorId
        ])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0])
            })
            .catch(error => {
                con.release();
                throw error
            })
    }
}

export default DoctorModel