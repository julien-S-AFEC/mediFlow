import { pool } from '../sql/dbConfig.js'


class InstituteModel {
    async getAll() {
        const con = await pool.getConnection()
        return con.execute(`SELECT 
            inst_id, 
            institute_name, 
            institute_address, 
            institute_phone_number 
            FROM institutes 
            WHERE 1`, [])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0])
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    async getInstituteFromPatientId(id) {
        const con = await pool.getConnection()
        return con.execute(`SELECT 
                    institute_name,
                    institute_address,
                    institute_phone_number
                    FROM 
                    patients
                    LEFT JOIN
                    institutes
                    ON
                    patients.institute_id=institutes.inst_id 
                    WHERE patient_id=?`, [id])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0][0])
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    async updateInstituteCredentialsFromId(name, addres, phoneNumber, id) {
        const con = await pool.getConnection()
        return con.execute(`UPDATE 
                institutes 
                SET
                institutes.institute_name=?,
                institutes.institute_address=?,
                institutes.institute_phone_number= ?
                WHERE
                institutes.inst_id=?
                `, [name, addres, phoneNumber, id])
            .then((rows, fields) => {
                con.release()
                return JSON.stringify(rows[0])
            })
            .catch(error => {
                con.release();
                throw error
            })
    }

    async createInstitute(instName, instPhone, instAdress) {
        const con = await pool.getConnection()
        return con.execute(`INSERT INTO 
                institutes
                (
                institute_name, 
                institute_address, 
                institute_phone_number
                )
                VALUES (?, ?, ?)
                `, [instName, instPhone, instAdress])
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

export default InstituteModel
