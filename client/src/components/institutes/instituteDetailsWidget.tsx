import React from "react";
import { snakeCaseToPretty } from "../../utils.tsx";
import { Permissions } from "../../types.ts";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

type Iprops = {
    prop: string
    attr: string
    patientId?: string
    permissions?: Permissions
}


const InstituteDetailsWidget: React.FC<Iprops> = ({ prop, attr, patientId, permissions }) => {

    const [toggleEdit, setToggleEdit] = useState<boolean>(false)

    return (
        <>
            {toggleEdit ?
                <div className="row mt-2" key={prop}>
                    <div className="col-5 fs-light">{snakeCaseToPretty(prop)}</div>
                    <input className="col-5 rounded-3" value={prop === "birth_date" || prop === "created_at" ? new Date(attr).toLocaleDateString() : attr || "Not provided"} />
                    {permissions?.update_patient ? <CiEdit color="blue" className="col-2" onClick={() => setToggleEdit(oldValue => !oldValue)} /> : <div></div>}
                </div>
                :
                <div className="row mt-2" key={prop}>
                    <div className="col-5 fs-light">{snakeCaseToPretty(prop)}</div>
                    <div className="col-5"> {prop === "birth_date" || prop === "created_at" ? new Date(attr).toLocaleDateString() : attr || "Not provided"}</div>
                    {permissions?.update_patient ? <CiEdit color="blue" className="col-2" onClick={() => setToggleEdit(oldValue => !oldValue)} /> : <div></div>}
                </div>
            }
        </>
    )
}

export default InstituteDetailsWidget