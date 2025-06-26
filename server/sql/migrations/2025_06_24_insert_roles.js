import runSQLQuery from "./query.js"

const QUERY = `INSERT INTO roles(role_name) VALUES (?)`

const userData = "test"

runSQLQuery(QUERY, userData)