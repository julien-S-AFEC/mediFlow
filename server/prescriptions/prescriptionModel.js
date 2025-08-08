import { pool } from '../config/db.js'

const PrescriptionModel = {
    upload: async (filePath, patientId) => {
        return pool.execute(`INSERT INTO
                prescriptions
                (file_path,
                patient_id)
                VALUES
                (?, ?)
                `, [filePath, patientId])
            .then((rows, fields) => {
                return rows[0]
            })
            .catch(error => {
                throw error
            })
    },

    getAllByPatientId: async (patientId) => {
        try {
            const result = await pool.execute(`SELECT *
            FROM 
            prescriptions
            WHERE
            prescriptions.patient_id=?
            `, [patientId])
            return result[0]
        }
        catch (error) {
            throw Error(`Cannot get the prescriptions: ${error}`)
        }
    },

    getById: async (prescriptionId) => {
        return pool.execute(`SELECT 
            prescriptions.file_path
            FROM 
            prescriptions
            WHERE
            prescriptions.id=?
            `, [prescriptionId])
            .then((rows, fields) => {
                return rows[0][0].file_path
            })
            .catch(error => {
                throw error
            })
    }
}

export default PrescriptionModel