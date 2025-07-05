import React, { useEffect, useState } from "react";
import { Doctor } from "../../types";

type Iprops = {
    doctors?: Doctor[]
    permissions?: Permissions;
    patientId?: string
    visibilityToggler: React.Dispatch<React.SetStateAction<boolean>>
    refreshHandler: React.Dispatch<React.SetStateAction<boolean>>
    doctorText: string
    doctorTextHandler: React.Dispatch<React.SetStateAction<string>>
}

const UpdateDoctorWidget: React.FC<Iprops> = ({ patientId, visibilityToggler, doctorText, doctorTextHandler }) => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);


    useEffect(() => {
        fetch("http://localhost:3000/api/doctors/getAll", {
            method: "GET",
            headers: { "Content-type": "application/json" },
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => { setDoctors(JSON.parse(data)) });
    }, [])

    return (
        <select className="form-select" value={doctorText} onChange={(e) => doctorTextHandler(e.target.value)}>
            <option value="">Select doctor</option>
            {doctors && doctors.map(doctor => (
                <option key={doctor.doctor_id} value={doctor.doctor_id}>
                    {doctor.doctor_id + " " + doctor.doctor_firstname + " " + doctor.doctor_secondname}
                </option>
            ))}
        </select>
    )
}

export default UpdateDoctorWidget