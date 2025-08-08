import { pool } from '../config/db.js'

const PatientModel = {
    getAll: async () => {
        return pool.execute(`SELECT * FROM patients LEFT JOIN institutes ON patients.institute_id = institutes.inst_id WHERE 1`, [])
            .then((rows, fields) => {
                return rows[0]
            })
            .catch(error => {
                throw error
            })
    },

    getPatientFromId: async (id) => {
        return pool.execute(`SELECT 
                    patient_id, 
                    patient_firstname, 
                    patient_secondname, 
                    gender, 
                    birth_date, 
                    address, 
                    email, 
                    insurance_number, 
                    created_at,
                    active
                    FROM 
                    patients 
                    WHERE patients.patient_id=?`, [id])
            .then((rows, fields) => {
                return rows[0][0]
            })
            .catch(error => {
                throw error
            })
    },

    getPatientFromInstId: async (id) => {
        return pool.execute(`SELECT 
                    patient_id, 
                    patient_firstname, 
                    patient_secondname, 
                    gender, 
                    birth_date, 
                    address, 
                    email, 
                    insurance_number, 
                    created_at,
                    active
                    FROM 
                    patients 
                    WHERE patients.institute_id=?`, [id])
            .then((rows, fields) => {
                return rows[0]
            })
            .catch(error => {
                throw error
            })
    },

    getPatientFromDoctorId: async (id) => {
        return pool.execute(`SELECT 
                    patients.patient_id, 
                    patient_firstname, 
                    patient_secondname, 
                    gender, 
                    birth_date, 
                    address, 
                    email, 
                    insurance_number, 
                    created_at,
                    active
                   FROM doctor_relation
                   LEFT JOIN
                   patients
                   ON
                   patients.patient_id = doctor_relation.patient_id
                   WHERE doctor_relation.doctor_id=?`, [id])
            .then((rows, fields) => {
                return rows[0]
            })
            .catch(error => {

                throw error
            })
    },

    createPatient: async (
        firstName,
        secondName,
        gender,
        birth_date,
        address,
        email,
        insurance,
        institute,
        doctor,
        createdAt) => {
        return pool.execute(`INSERT INTO patients 
                    (
                    patient_firstname, 
                    patient_secondname, 
                    gender, 
                    birth_date, 
                    address, 
                    email, 
                    insurance_number, 
                    institute_id,
                    created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            firstName,
            secondName,
            gender,
            birth_date,
            address,
            email,
            insurance,
            institute,
            createdAt
        ])
            .then((rows, fields) => {
                if (doctor) {
                    PatientModel.createDoctorRelationTable(doctor, rows[0].insertId)
                }
                return PatientModel.getPatientFromId(rows[0].insertId)
            })
            .catch(error => {
                throw error
            })
    },

    createDoctorRelationTable: async (doctoId, patientId) => {
        return pool.execute(`INSERT INTO doctor_relation 
                    (doctor_id, patient_id) VALUES (?, ?)`, [doctoId, patientId])
            .then((rows, fields) => {

                return rows[0]
            })
            .catch(error => {
                throw error
            })
    },

    updatePatient: async (
        patientId,
        firstName,
        secondName,
        gender,
        birthDate,
        address,
        email,
        insurance) => {
        return pool.execute(`UPDATE 
                patients 
                SET
                patient_firstname=?,
                patient_secondname=?,
                gender=?,
                birth_date=?,
                address=?,
                email=?,
                insurance_number=?
                WHERE patients.patient_id=?`, [
            firstName,
            secondName,
            gender,
            birthDate,
            address,
            email,
            insurance,
            patientId
        ])
            .then((rows, fields) => {
                return rows[0][0]
            })
            .catch(error => {
                throw error
            })
    },

    updateInstituteFromId: async (instituteId, patientId) => {
        return pool.execute(`UPDATE 
                patients 
                SET
                patients.institute_id=?
                WHERE
                patients.patient_id=?
                `, [instituteId, patientId])
            .then((rows, fields) => {
                return rows[0][0]
            })
            .catch(error => {
                throw error
            })
    },

    updateDoctorFromId: (patientId, doctorId) => {
        return pool.execute(`INSERT INTO 
                doctor_relation 
                (doctor_id,
                patient_id,
                start_date
                )
                VALUES
                (?, ?, NOW())
                `, [doctorId, patientId])
            .then((rows, fields) => {
                return rows[0]
            })
            .catch(error => {
                throw error
            })
    },

    archivePatientFromId: async (patientId) => {
        return pool.execute(`UPDATE
                patients
                SET
                active=0
                WHERE
                patients.patient_id=?
                `, [patientId])
            .then((rows, fields) => {
                return rows[0]
            })
            .catch(error => {
                throw error
            })
    },

    unArchivePatientFromId: async (patientId) => {
        return pool.execute(`UPDATE
                patients
                SET
                active=1
                WHERE
                patients.patient_id=?
                `, [patientId])
            .then((rows, fields) => {
                return rows[0]
            })
            .catch(error => {
                throw error
            })
    }
}

export default PatientModel