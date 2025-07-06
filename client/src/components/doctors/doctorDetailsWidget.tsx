import React from "react";
import { snakeCaseToPretty } from "../../utils.tsx";
import UpdateDoctorWidget from "./updateDoctorWidget.tsx";
import { Doctor, Permissions } from "../../types.ts";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";


type Iprops = {
    doctor: Doctor[]
    permissions?: Permissions;
    patientId?: string
    refreshHandler: React.Dispatch<React.SetStateAction<boolean>>
}


const DoctorDetailsWidget: React.FC<Iprops> = ({ doctor, patientId, permissions, refreshHandler }) => {

    const [toggleUpdateDoctor, setToggleUpdateDoctor] = useState<boolean>(false)
    const [doctorText, setDoctorText] = useState<string>("");

    const updatePatientDoctor = () => {
        fetch("http://localhost:3000/api/doctors/updateDoctorFromId", {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                doctorId: doctorText.slice(0, 1),
                patientId: patientId
            })
        }).then((res) => {
            if (res.ok) {
                setDoctorText("");
                setToggleUpdateDoctor(false)
                refreshHandler(oldValue => !oldValue)
            }
        }).catch(error => console.log(error))
    }

    return (
        <>
            {!toggleUpdateDoctor && <div>
                <div className="d-flex align-items-center gap-3">
                    <h4 className="maint-font fw-normal text-center">Doctor</h4>
                    {permissions?.update_patient && <CiEdit onClick={() => setToggleUpdateDoctor(true)} />}
                </div>
                <div className="p-3 rounded-3 border border-dark shadow">
                    {Boolean(doctor.length) && Object.entries(doctor[doctor.length - 1]).map(([prop, attr]) => {
                        return (
                            <div className="row mt-2" key={prop}>
                                <div className="col-5 fs-light">{snakeCaseToPretty(prop)}</div>
                                <div className="col-5"> {attr || "not provided"}</div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>}

            {toggleUpdateDoctor &&
                <div className="d-flex flex-column">
                    <UpdateDoctorWidget patientId={patientId} visibilityToggler={setToggleUpdateDoctor} refreshHandler={refreshHandler} doctorText={doctorText} doctorTextHandler={setDoctorText} />
                    <div className="d-flex justify-content-center gap-3 pt-3">
                        <div className="btn btn-primary" onClick={updatePatientDoctor}>Accept</div>
                        <div className="btn btn-danger" onClick={() => setToggleUpdateDoctor(false)}>Cancel</div>
                    </div>
                </div>}
        </>
    )
}

export default DoctorDetailsWidget