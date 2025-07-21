import { pool } from '../sql/dbConfig.js'

class PrescriptionModel {
    static async create(prescriptionId) {
        const con = await pool.getConnection()
        return con.execute(`INSERT INTO
                prescription_dosage
                (content, prescription_id)
                VALUES
                (?, ?)
                `, ['[{"col1": "", "col2": "", "col3": "", "col4": "", "col5": ""}]', prescriptionId])
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
        return con.execute(`
            SELECT content
            FROM 
            prescription_dosage
            WHERE
            prescription_dosage.prescription_id=?
            `, [prescriptionId])
            .then((rows, fields) => {
                con.release()
                return rows[0][0].content
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    static async store(prescriptionId, content) {
        const con = await pool.getConnection()
        return con.execute(`
            UPDATE 
            prescription_dosage 
            SET 
            content = ?
            WHERE (prescription_id = ?);
            `, [JSON.stringify(content), prescriptionId])
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

export default PrescriptionModel