import express from 'express'
import cors from 'cors'

const PORT = 3000


const app = express()
app.use(cors())
app.get('/', (req, res) => {
    res.send("App running")
})

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`)
})