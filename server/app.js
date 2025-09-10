import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import usersRouter from './users/userRoutes.js'
import patientsRouter from './patients/patientsRoutes.js'
import instituteRouter from './institutes/institutesRoute.js'
import doctorRouter from './doctors/doctorRoutes.js'
import prescriptionRouter from './prescriptions/prescriptionRoutes.js'
import prescriptionCommentaryRouter from './prescriptionCommentary/prescriptionRoutes.js'
import sessionRouter from './session/session.js'
import prescriptionDosageRouter from './prescriptionDosage/prescriptionDosageRoutes.js'
import session from 'express-session';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(cors({
  origin: ['hhttp://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));

app.use(express.json())
app.use(session({
    secret: '456789',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60
    }
}));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api/users', usersRouter)
app.use('/api/patients', patientsRouter)
app.use('/api/institutes', instituteRouter)
app.use('/api/doctors', doctorRouter)
app.use('/api/prescriptions', prescriptionRouter)
app.use('/api/prescriptionCommentary', prescriptionCommentaryRouter)
app.use('/api/prescriptionDosage', prescriptionDosageRouter)
app.use('/api/auth', sessionRouter)
app.use('/uploads', express.static('uploads'));

// Get all the front routes.
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`App running on port: ${process.env.PORT}`)
})
