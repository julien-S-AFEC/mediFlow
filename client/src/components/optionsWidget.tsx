import { Dispatch, SetStateAction, useState } from "react";
import { Permissions } from "../types"
import { SlOptions } from "react-icons/sl";

type Iprops = {
    permissions?: Permissions,
    setDashboardVisibleHandler: Dispatch<SetStateAction<boolean>>
}

const OptionsWidget: React.FC<Iprops> = ({ permissions, setDashboardVisibleHandler }) => {

    const [addPatientTxt, setAddPatientTxt] = useState<string>("AddPatient")

    return (
        <div className="d-flex flex-column mx-2">
            <p>
                <button className="btn btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
                    <SlOptions />
                </button>
            </p>
            <div style={{ minHeight: "120px" }}>
                <div className="collapse collapse-horizontal" id="collapseWidthExample">
                    <div className="card card-body  border border-0" >
                        {Boolean(permissions?.create_patient)
                            &&
                            <div className="btn btn-primary text-nowrap" onClick={() => {
                                setDashboardVisibleHandler(oldValue => !oldValue)
                                setAddPatientTxt(addPatientTxt ==="AddPatient" ? "Back" : "AddPatient")
                            }}>{addPatientTxt}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OptionsWidget


