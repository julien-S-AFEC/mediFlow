import { pool } from '../sql/dbConfig.js'

class PrescriptionCommentaryModel {
    static async getAllbyPrescId(commentaryId) {
        const con = await pool.getConnection()
        return con.execute(`
            SELECT
            content, created_at
            FROM prescription_commentary
            WHERE
            prescription_commentary.prescription_id=?
                `, [commentaryId])
            .then((rows, fields) => {
                con.release()
                return rows[0]
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    static async create(currentUser, prescriptionId, content) {
        const con = await pool.getConnection()
        return con.execute(`
            INSERT INTO
            prescription_commentary
            (prescription_id, content, created_by)
            VALUES
            (?, ?, ?)`, [prescriptionId, content, currentUser])
            .then((rows, fields) => {
                con.release()
                return rows[0]
            })
            .catch(error => {
                con.release();
                throw error
            })
    }
}

export default PrescriptionCommentaryModel