import { pool } from '../sql/dbConfig.js'

class PatientModel {
    async getAll() {
        const con = await pool.getConnection()
        return con.execute(`SELECT * FROM patients LEFT JOIN institutes ON patients.institute_id = institutes.inst_id WHERE 1`, [])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0])
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    async getPatientFromId(id) {
        const con = await pool.getConnection()
        return con.execute(`SELECT 
                    patient_id, 
                    patient_firstname, 
                    patient_secondname, 
                    gender, 
                    birth_date, 
                    address, 
                    email, 
                    insurance_number, 
                    created_at,
                    active
                    FROM 
                    patients 
                    WHERE patients.patient_id=?`, [id])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0][0])
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    async createPatient(
        firstName,
        secondName,
        gender,
        birth_date,
        address,
        email,
        insurance,
        institute,
        doctor) {

        const con = await pool.getConnection()
        return con.execute(`INSERT INTO patients 
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
        ])
            .then((rows, fields) => {
                con.release()
                if (doctor) {
                    this.createDoctorRelationTable(doctor, rows[0].insertId)
                }
                return this.getPatientFromId(rows[0].insertId)
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    async createDoctorRelationTable(doctoId, patientId) {
        const con = await pool.getConnection()
        return con.execute(`INSERT INTO doctor_relation 
                    (doctor_id, patient_id) VALUES (?, ?)`, [doctoId, patientId])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0])
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    async updatePatient(
        patientId,
        firstName,
        secondName,
        gender,
        birthDate,
        address,
        email,
        insurance) {
        const con = await pool.getConnection()
        return con.execute(`UPDATE 
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
        ])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0][0])
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    async updateInstituteFromId(instituteId, patientId) {
        const con = await pool.getConnection()
        return con.execute(`UPDATE 
                patients 
                SET
                patients.institute_id=?
                WHERE
                patients.patient_id=?
                `, [instituteId, patientId])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0][0])
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    async updateDoctorFromId(patientId, doctorId) {
        const con = await pool.getConnection()
        return con.execute(`INSERT INTO 
                doctor_relation 
                (doctor_id,
                patient_id,
                start_date
                )
                VALUES
                (?, ?, NOW())
                `, [doctorId, patientId])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0])
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    async archivePatientFromId(patientId) {
        const con = await pool.getConnection()
        return con.execute(`UPDATE
                patients
                SET
                active=0
                WHERE
                patients.patient_id=?
                `, [patientId])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0])
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    async unArchivePatientFromId(patientId) {
        const con = await pool.getConnection()
        return con.execute(`UPDATE
                patients
                SET
                active=1
                WHERE
                patients.patient_id=?
                `, [patientId])
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

export default PatientModel