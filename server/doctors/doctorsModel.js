import { pool } from '../config/db.js'

const DoctorModel = {
    getAll: async () => {
        return pool.execute("SELECT * FROM doctors WHERE 1", [])
            .then((rows, fields) => {
                return rows[0]
            })
            .catch(error => {
                throw error
            })
    },
    getDoctorFromId: async (id) => {
        return pool.execute("SELECT * FROM doctors WHERE doctors.doctor_id=?", [id])
            .then((rows, fields) => {
                return rows[0]
            })
            .catch(error => {
                throw error
            })
    },

    getDoctorFromPatientId: async (id) => {
        return pool.execute(`SELECT 
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
                return rows[0]
            })
            .catch(error => {
                throw error
            })
    },

    createDoctor: async (
        firstname,
        secondName,
        address,
        email,
        phone,
        institute
    ) => {
        return pool.execute(`INSERT INTO doctors 
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
                return rows[0]
            })
            .catch(error => {
                throw error
            })
    },

    updateDoctorCredentialsFromId: (
        firstname,
        secondname,
        institute,
        address,
        phoneNumber,
        email,
        doctorId
    ) => {
        return pool.execute(`UPDATE doctors
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
                return rows[0]
            })
            .catch(error => {
                throw error
            })
    }
}

export default DoctorModel