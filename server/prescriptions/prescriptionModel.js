import { pool } from '../sql/dbConfig.js'

class PrescriptionModel {
    static async upload(filePath, patientId) {
        const commentaryResult = await this.createPrescriptionCommentary()
        const con = await pool.getConnection()
        return con.execute(`INSERT INTO
                prescriptions
                (file_path,
                 commentary_id, 
                patient_id)
                VALUES
                (?, ?, ?)
                `, [filePath, commentaryResult.insertId, patientId])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0])
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    static async createPrescriptionCommentary() {
        const con = await pool.getConnection()
        return con.execute(`INSERT INTO
                prescription_commentary
                (content)
                VALUES
                (DEFAULT)
                `, [])
            .then((rows, fields) => {
                con.release()
                return rows[0]
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    static async getAllByPatientId(patientId) {
        const con = await pool.getConnection()
        return con.execute(`SELECT *
            FROM 
            prescriptions
            LEFT JOIN
            prescription_commentary
            ON
            prescriptions.commentary_id=prescription_commentary.commentary_id
            WHERE
            prescriptions.patient_id=?
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

    static async getById(prescriptionId) {
        const con = await pool.getConnection()
        return con.execute(`SELECT 
            prescriptions.file_path
            FROM 
            prescriptions
            WHERE
            prescriptions.id=?
            `, [prescriptionId])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0][0].file_path)
            })
            .catch(error => {
                con.release();
                throw error
            })
    }
}

export default PrescriptionModel