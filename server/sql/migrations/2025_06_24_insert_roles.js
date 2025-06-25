import runQuery from "./query.js"

const QUERY = `INSERT INTO roles(role_name) VALUES (?)`

const userData = "test"

runQuery(QUERY, userData)