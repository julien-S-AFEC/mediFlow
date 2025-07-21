import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import usersRouter from './users/usersController.js'
import patientsRouter from './patients/patientsController.js'
import instituteRouter from './institutes/institutesController.js'
import doctorRouter from './doctors/doctorsController.js'
import prescriptionRouter from './prescriptions/prescriptionsController.js'
import prescriptionCommentaryRouter from './prescriptionCommentary/prescriptionCommentaryController.js'
import authRouter from './auth/auth.js'
import session from 'express-session';
import prescriptionDosageRouter from './prescriptionDosage/prescriptionDosageController.js'

const PORT = 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json())
app.use(session({
    secret: 'ma-cle-secrete',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.use('/api/users', usersRouter)
app.use('/api/patients', patientsRouter)
app.use('/api/institutes', instituteRouter)
app.use('/api/doctors', doctorRouter)
app.use('/api/prescriptions', prescriptionRouter)
app.use('/api/prescriptionCommentary', prescriptionCommentaryRouter)
app.use('/api/prescriptionDosage', prescriptionDosageRouter)
app.use('/api/auth', authRouter)
app.use('/uploads', express.static('uploads'));
app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`)
})
