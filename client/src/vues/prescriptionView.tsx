import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const PrescriptionView: React.FC = () => {
    const params = useParams()
    const prescriptionId = params.fileId
    const patientId = params.patientId
    const [path, setPath] = useState<string>()

    useEffect(() => {
        fetch("http://localhost:3000/api/prescriptions/getById", {
            method: "POST",
            credentials: "include",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ prescriptionId })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => { console.log(JSON.parse(data)); setPath(JSON.parse(data)) })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className="d-flex flex-column gap-5 justify-content-center align-items-center">
            <img className="img img-fluid" src={`http://localhost:3000/${path}`} alt="" />
            <Link className="btn btn-primary" to={`/patientDetails/${patientId}`}>Back</Link>
        </div>)


}

export default PrescriptionView