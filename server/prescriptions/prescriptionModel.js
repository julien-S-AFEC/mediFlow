import { pool } from '../config/db.js'
import Tesseract from 'tesseract.js';

const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
}

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
    },


    changeIsArchivedById: async (prescriptionId, isArchived) => {
        return pool.execute(`UPDATE 
            prescriptions
            SET
            is_archived=?
            WHERE
            prescriptions.id=?
            `, [isArchived, prescriptionId])
            .then((rows, fields) => {
                return rows[0]
            })
            .catch(error => {
                throw error
            })
    },

    getPrescriptionText: async (prescriptionPath) => {
        return await tesseract.recognize(prescriptionPath, config)
            .then(data => {
                console.log(data);
                return data
            })
            .catch(error => {
                throw error
            })
    }
}
export default PrescriptionModel