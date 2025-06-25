import express from 'express'
import cors from 'cors'
import UserModel from './models/userModel.js'

const PORT = 3000

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send("App running")
})

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`)
})