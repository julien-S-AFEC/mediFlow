import runSQLQuery from "./query.js"

const QUERY = `INSERT INTO user(username, email, user_password, user_status, role_id) VALUES (?, ?, ?, ?,?)`

const userData = ['toi', 'toi@gmail.com', 'toi123', 1, 1]

runSQLQuery(QUERY, userData)