import { pool } from '../config/db.js'

const PrescriptionCommentaryModel = {
    getAllbyPrescId: async (prescription) => {
        try {
            const [rows] = await pool.execute(`
            SELECT
            id, content, created_at, created_by
            FROM prescription_commentary
            WHERE
            prescription_commentary.prescription_id=?
                `, [prescription])

            return rows
        }
        catch (error) {
            throw new Error(error.message)
        }
    },

    create: async (currentUser, prescriptionId, content) => {
        try {
            await pool.execute(`
            INSERT INTO
            prescription_commentary
            (prescription_id, content, created_by)
            VALUES
            (?, ?, ?)`, [prescriptionId, content, currentUser])

            const allCommentaries = await PrescriptionCommentaryModel.getAllbyPrescId(prescriptionId)
            return allCommentaries
        }
        catch (error) {
            throw new Error(error.message)
        }
    },

    deleteById: async (commentaryId, prescriptionId) => {
        try {
            const [rows] = await pool.execute(
                `DELETE FROM prescription_commentary WHERE (id = ?);`,
                [commentaryId])
            const allCommentaries = await PrescriptionCommentaryModel.getAllbyPrescId(prescriptionId)
            return allCommentaries
        }
        catch (error) {
            throw new Error(error.message)
        }
    }
}

export default PrescriptionCommentaryModel