import { pool } from '../sql/dbConfig.js'

class PrescriptionCommentaryModel {
    static async getContentById(id) {
        const con = await pool.getConnection()
        return con.execute(`
            SELECT
            prescription_commentary.content
            FROM prescription_commentary
            WHERE
            prescription_commentary.commentary_id=?
                `, [id])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0][0].content)
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    static async store(id, content) {
        const con = await pool.getConnection()
        return con.execute(`
            UPDATE
            prescription_commentary
            SET
            content=?
            WHERE
            prescription_commentary.commentary_id=?`, [content, id])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0].content)
            })
            .catch(error => {
                con.release();
                throw error
            })
    }
}

export default PrescriptionCommentaryModel