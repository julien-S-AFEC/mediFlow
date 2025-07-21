import { pool } from '../sql/dbConfig.js'

class PrescriptionCommentaryModel {
    static async getAllbyPrescId(commentaryId) {
        const con = await pool.getConnection()
        return con.execute(`
            SELECT
            id, content, created_at, created_by
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
            .then(async (rows, fields) => {
                con.release()
                const allCommentaries = await this.getAllbyPrescId(prescriptionId)
                return allCommentaries
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    static async deleteById(commentaryId, prescriptionId) {
        const con = await pool.getConnection()
        return con.execute(
            `DELETE FROM prescription_commentary WHERE (id = ?);`,
            [commentaryId])
            .then(async (rows, fields) => {
                con.release()
                const allCommentaries = await this.getAllbyPrescId(prescriptionId)
                return allCommentaries
            })
            .catch(error => {
                con.release();
                throw error
            })
    }
}

export default PrescriptionCommentaryModel