import mysql from 'mysql2/promise';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import runSQLQuery from '../sql/migrations/query.js';
import { dirname } from 'path';

export const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

export const pool = mysql.createPool({
    host: process.env.DB_HOST || 'mediFlow-db',
    user: process.env.DB_USER || 'medi_flow',
    password: process.env.DB_PASSWORD || 'medi_flow123',
    database: process.env.DB_NAME || 'medi_flow',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export const runStartupSQL = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'mediFlow-db',
            user: process.env.DB_USER || 'medi_flow',
            password: process.env.DB_PASSWORD || 'medi_flow123',
            database: process.env.DB_NAME || 'medi_flow',
            multipleStatements: true
        });

        // Check if tables exist (not just database)
        const [rows] = await connection.query("SHOW TABLES LIKE 'users'");
        if (rows.length === 0) {
            console.log('Tables not found, running startup SQL...');
            const startupSQL = fs.readFileSync(path.join(__dirname, '../initdb/01_startup.sql'), 'utf8');
            await connection.query(startupSQL);
            console.log('Startup SQL executed successfully');
        } else {
            console.log('Tables already exist, skipping startup SQL');
        }
        await connection.end();
    } catch (error) {
        console.error('Error running startup SQL:', error);
    }
}
