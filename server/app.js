import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import doctorRouter from './doctors/doctorRoutes.js'
import documentationRouter from './documentation/documentationRoute.js'
import instituteRouter from './institutes/institutesRoute.js'
import patientsRouter from './patients/patientsRoutes.js'
import prescriptionCommentaryRouter from './prescriptionCommentary/prescriptionRoutes.js'
import prescriptionDosageRouter from './prescriptionDosage/prescriptionDosageRoutes.js'
import prescriptionRouter from './prescriptions/prescriptionRoutes.js'
import sessionRouter from './session/session.js'
import usersRouter from './users/userRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'https://mediflow.soutadejulien.com'],
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

app.use(express.static(path.join(__dirname, '../', 'client/dist')));

app.use('/api/users', usersRouter)
app.use('/api/patients', patientsRouter)
app.use('/api/institutes', instituteRouter)
app.use('/api/doctors', doctorRouter)
app.use('/api/prescriptions', prescriptionRouter)
app.use('/api/prescriptionCommentary', prescriptionCommentaryRouter)
app.use('/api/prescriptionDosage', prescriptionDosageRouter)
app.use('/api/documentation', documentationRouter)
app.use('/api/auth', sessionRouter)
app.use('/uploads', express.static('uploads'));

app.get(/^(?!\/api)(?!\/uploads).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'client/dist/index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`App running on port: ${process.env.PORT}`)
})