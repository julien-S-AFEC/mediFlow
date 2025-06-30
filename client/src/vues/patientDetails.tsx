import React, { useEffect, useState } from 'react';
import { Patient } from '../types';
import {snakeCaseToPretty} from '../utils.js'
import { Link, useParams } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";

import Header from '../components/header';

const PatientDetails: React.FC = () => {
    const params = useParams()
    const [patient, setPatient] = useState<Patient>()

    useEffect(() => {
        fetch("http://localhost:3000/api/patients/getPatientFromId", {
            method: "POST",
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ "patientId": params.patientId })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then((patient => { setPatient(patient); 
                 Object.entries(patient).map(([prop, attr]) => {console.log(prop, attr)})
             }))
             .catch(error => {throw error})
    }, [])

    return (
        <>
            <Header />
            {
                patient ?
                    <div className="container text-center ">
                        {Object.entries(patient).map(([prop, attr]) => {
                            return (
                                <div className="row mt-2" key={prop}>
                                    <div className="col-5 fs-light">{snakeCaseToPretty(prop)}</div>
                                    <div className='col-5'>{attr || "Non renseigné"}</div>
                                    <CiEdit color="blue" className="col-2" />
                                </div>
                            )
                        })}


                        <Link to="/dashboard" className="btn btn-primary">Back</Link>
                    </div>

                    :
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                        <div className="spinner-border text-primary" role="status" aria-label="Loading...">
                        </div>
                    </div>
            }
        </>
    )
}

export default PatientDetails