import React from "react";
import { snakeCaseToPretty } from "../../utils.tsx";
import UpdateInstituteWidget from "./updateInstituteWidget.tsx";
import { Institute, Permissions } from "../../types.ts";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";


type Iprops = {
    institute?: Institute
    permissions?: Permissions;
    patientId?: string
    refreshHandler: React.Dispatch<React.SetStateAction<boolean>>
}

const DoctorDetailsWidget: React.FC<Iprops> = ({ institute, patientId, permissions, refreshHandler }) => {

    const [toggleUpdateInstitute, setToggleUpdateInstitute] = useState<boolean>(false)
    const [instituteText, setInstituteText] = useState<string>("");

    const updatePatientInstitute = () => {
        fetch("http://localhost:3000/api/institutes/updateInstituteFromId", {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                instituteId: instituteText.slice(0, 1),
                patientId: patientId
            })
        }).then((res) => {
            if (res.ok) {
                setInstituteText("");
                setToggleUpdateInstitute(false)
                refreshHandler(oldValue => !oldValue)
            }
        }).catch(error => console.log(error))
    }

    return (
        <>
            {!toggleUpdateInstitute && <div>
                <div className="d-flex align-items-center gap-3">
                    <h4 className="maint-font fw-normal text-center">Institute</h4>
                    {permissions?.update_patient && <CiEdit onClick={() => setToggleUpdateInstitute(true)} />}
                </div>
                <div className="p-3 rounded-3 border border-dark shadow">

                    {institute && Object.entries(institute).map(([prop, attr]) => {
                        return (
                            <div className="row mt-2" key={prop}>
                                <div className="col-5 fs-light">{snakeCaseToPretty(prop)}</div>
                                <div className="col-5"> {attr || "Not provided"}</div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>}

            {toggleUpdateInstitute &&
                <div className="d-flex flex-column">
                    <UpdateInstituteWidget instituteText={instituteText} instituteTextHandler={setInstituteText} />
                    <div className="d-flex justify-content-center gap-3 pt-3">
                        <div className="btn btn-primary" onClick={updatePatientInstitute}>Accept</div>
                        <div className="btn btn-danger" onClick={() => setToggleUpdateInstitute(false)}>Cancel</div>
                    </div>
                </div>}
        </>
    )
}

export default DoctorDetailsWidget