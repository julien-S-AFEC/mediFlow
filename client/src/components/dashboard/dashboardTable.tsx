import React, { useEffect, useState } from "react"
import { Patient, Permissions } from '../../types.ts';
import Loader from '../loader.tsx'
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

type Iprops = {
    refreshState: boolean
}

const DashboardTable: React.FC<Iprops> = ({ refreshState }) => {

    const [patients, setPatients] = useState<Patient[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:3000/api/patients/getAll', { method: 'GET', credentials: 'include', headers: { 'Content-type': 'application/json' } })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => { setPatients(data) })
    }, [refreshState])

    return (
        <table className="table table-hover table-responsive mt-5">
            <thead>
                <tr>
                    <th className="main-font fw-light" scope="col">id</th>
                    <th className="main-font fw-light" scope="col">Firstname</th>
                    <th className="main-font fw-light" scope="col">Lastname</th>
                    <th className="main-font fw-light" scope="col">Gender</th>
                    <th className="main-font fw-light" scope="col">Birth date</th>
                    <th className="main-font fw-light" scope="col">Adress</th>
                    <th className="main-font fw-light" scope="col">Email</th>
                    <th className="main-font fw-light" scope="col">Insurrance number</th>
                    <th className="main-font fw-light" scope="col">Institute</th>
                </tr>
            </thead>
            <tbody>
                {patients ? patients.map(patient => (
                    <tr key={patient.patient_id} onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: 'pointer' }}>

                        <th scope="row">{patient.patient_id}</th>

                        <td>{patient.patient_firstname}</td>
                        <td>{patient.patient_secondname}</td>
                        <td>{patient.gender}</td>
                        <td>{new Date(patient.birth_date).toLocaleDateString()}</td>
                        <td>{patient.address}</td>
                        <td>{patient.email}</td>
                        <td>{patient.insurance_number}</td>
                        <td>{patient.institute_name || "Not provided"}</td>
                    </tr>
                ))
                    : <Loader />
                }
            </tbody >
        </table >
    )
}

export default DashboardTable