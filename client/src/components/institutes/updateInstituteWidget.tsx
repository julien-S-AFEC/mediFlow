import React, { useEffect, useState } from "react";
import { Institute } from "../../types";

type Iprops = {
    instituteText: string
    instituteTextHandler: React.Dispatch<React.SetStateAction<string>>
}

const UpdateDoctorWidget: React.FC<Iprops> = ({ instituteText, instituteTextHandler }) => {
    const [institutes, setInstitutes] = useState<Institute[]>([]);


    useEffect(() => {
        fetch("http://localhost:3000/api/institutes/getAll", {
            method: "GET",
            headers: { "Content-type": "application/json" },
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => { setInstitutes(JSON.parse(data)) });
    }, [])

    return (
        <select className="form-select" value={instituteText} onChange={(e) => instituteTextHandler(e.target.value)}>
            <option value="">Select institute</option>
            {institutes && institutes.map(institute => (
                <option key={institute.inst_id} value={institute.inst_id}>
                    {institute.inst_id + " " + institute.institute_name}
                </option>
            ))}
        </select>
    )
}

export default UpdateDoctorWidget