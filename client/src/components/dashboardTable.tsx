import { useEffect, useState } from "react"
import { Patient } from '../types.ts';
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";

const DashboardTable = () => {

    const [patients, setPatients] = useState<Patient[]>([])
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(() => {
        fetch('http://localhost:3000/api/patients/getAll', { method: 'GET', credentials: 'include', headers: { 'Content-type': 'application/json' } })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => { setPatients(data) })
        fetch('http://localhost:3000/api/auth/isAdmin', { method: 'GET', credentials: 'include', headers: { 'Content-type': 'application/json' } })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => { setIsAdmin(data) })
    }, [])

    return (
        <table className="table">
            <thead>
                <tr>
                    <th className="main-font fw-light" scope="col">id</th>
                    <th className="main-font fw-light" scope="col">Firstname</th>
                    <th className="main-font fw-light" scope="col">Lastname</th>
                    <th className="main-font fw-light" scope="col">Gender</th>
                    <th className="main-font fw-light" scope="col">Age</th>
                    <th className="main-font fw-light" scope="col">Adress</th>
                    <th className="main-font fw-light" scope="col">Email</th>
                    <th className="main-font fw-light" scope="col">Insurrance number</th>
                    <th className="main-font fw-light" scope="col">Institute</th>
                </tr>
            </thead>
            <tbody>
                {patients ? patients.map(patient => (

                    <tr key={patient.id}>

                        <th scope="row">{patient.id}</th>

                        <td>{patient.patient_firstname}</td>
                        <td>{patient.patient_secondname}</td>
                        <td>{patient.gender}</td>
                        <td>{patient.age}</td>
                        <td>{patient.adress}</td>
                        <td>{patient.email}</td>
                        <td>{patient.insurance_number}</td>
                        <td>{patient.institute}</td>
                        {isAdmin && <td>
                            <button className="btn p-1">
                                <CiEdit color="blue" className="pe-auto" />
                            </button>
                        </td>}
                    </tr>

                ))
                    : <div>Loading</div>
                }
            </tbody >
        </table >
    )
}

export default DashboardTable