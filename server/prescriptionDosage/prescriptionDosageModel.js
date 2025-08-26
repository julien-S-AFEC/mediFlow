import { pool } from '../config/db.js'

const PrescriptionDosageModel = {
    create: async (prescriptionId, content) => {
        try {
            const [rows] = await pool.execute(
                `INSERT INTO
                prescription_dosage
                (content, prescription_id)
            VALUES
                (?, ?)
            `,
                [content, prescriptionId]);

            if (rows.affectedRows === 0) {
                throw new Error("The prescription cannot be inserted.");
            }
            return rows[0]
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
    },

    getById: async (prescriptionId) => {
        try {
            const [rows] = await pool.execute(`
            SELECT 
            content
            FROM 
            prescription_dosage
            WHERE
            prescription_dosage.prescription_id=?
            `, [prescriptionId])

            if (!rows.length) {
                throw new Error("The prescription is not found.")
            }
            return rows[0].content
        }
        catch (error) {
            throw new Error(error.message)
        }
    },

    store: async (prescriptionId, content) => {
        try {
            const [rows] = await pool.execute(`
            UPDATE 
            prescription_dosage 
            SET 
            content = ?
            WHERE (prescription_id = ?);
            `, [content, prescriptionId])

            if (!rows.affectedRows) {
                throw new Error("The prescription is not found.")
            }
            return {status: 'Accepted'}
        }

        catch (error) {
            throw new Error(error.message)
        }
    }
}

export default PrescriptionDosageModel