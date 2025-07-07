import mysql from 'mysql2/promise'; // ✅ Use the promise version


export const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "medi_flow",
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
}

export const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "medi_flow",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})
