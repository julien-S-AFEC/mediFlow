import React, { useState } from "react";
import ErrorModal from "../errorWidget";
import { Patient } from "../../types";

type Iprops = {
    patientId?: string;
    patient?: Patient;
    visibilityToggler: React.Dispatch<React.SetStateAction<boolean>>;
    refreshHandler: React.Dispatch<React.SetStateAction<boolean>>
};

const UpdatePatientWidget: React.FC<Iprops> = ({ patientId, patient, visibilityToggler, refreshHandler }) => {

    const date = new Date();
    const [firstNameText, setFirstNameText] = useState(patient?.patient_firstname || "");
    const [secondNameText, setSecondNameText] = useState(patient?.patient_secondname || "");
    const [genderText, setGenderText] = useState(patient?.gender || "");
    const [birthDateText, setBirthDateText] = useState(patient?.birth_date.slice(0, 10) || "");
    const [addressText, setAddresText] = useState(patient?.address || "");
    const [emailText, setEmailText] = useState(patient?.email || "");
    const [insuranceText, setInsuranceText] = useState(patient?.insurance_number || "");
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const updatePatient = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        if (!firstNameText || !secondNameText || !genderText) {
            setShowError(true)
            setErrorMessage("First name, second name and gender are required.")
            return
        }

        fetch("http://localhost:3000/api/patients/updatePatient", {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({
                patientId: patientId,
                firstName: firstNameText,
                secondName: secondNameText,
                gender: genderText,
                birthDate: birthDateText,
                address: addressText,
                email: emailText,
                insurance: insuranceText
            }),
        })
            .then(() => {
                setFirstNameText("");
                setSecondNameText("");
                setGenderText("");
                setBirthDateText(date.toISOString().slice(0, 10));
                setAddresText("");
                setEmailText("");
                setInsuranceText("");
                visibilityToggler((oldValue) => !oldValue);
                refreshHandler(oldValue => !oldValue)
            }).catch(error => console.log(error))
    }

    return (
        <>

            <div className="modal show d-block fade" tabIndex={-1} role="dialog">
                {showError && <ErrorModal message={errorMessage} />}
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content" style={{ backgroundColor: "#d8e7d8" }}>
                        <div className="modal-header">
                            <h5 className="modal-title">Update Patient</h5>
                            <button type="button" className="btn-close" onClick={() => visibilityToggler((v) => !v)} aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row align-items-center">
                                    <div className="col-6 pt-3">
                                        <label className="form-label">Firstname</label>
                                        <input type="text" required className="form-control" placeholder="Eva" value={firstNameText} onChange={(e) => setFirstNameText(e.target.value)} />
                                    </div>
                                    <div className="col-6 pt-3">
                                        <label className="form-label">Secondname</label>
                                        <input type="text" required className="form-control" placeholder="Green" value={secondNameText} onChange={(e) => setSecondNameText(e.target.value)} />
                                    </div>
                                    <div className="col-6 pt-3">
                                        <label className="form-label">Gender</label>
                                        <select className="form-select" required value={genderText} onChange={(e) => setGenderText(e.target.value)}>
                                            <option value="">Select gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="col-6 pt-3">
                                        <label className="form-label">Birth date</label>
                                        <input type="date" className="form-control" value={birthDateText} onChange={(e) => setBirthDateText(e.target.value)} />
                                    </div>
                                    <div className="col-12 pt-3">
                                        <label className="form-label">Address</label>
                                        <textarea className="form-control" placeholder="83 Camden High Street..." value={addressText} onChange={(e) => setAddresText(e.target.value)} />
                                    </div>
                                    <div className="col-6 pt-3">
                                        <label className="form-label">Email address</label>
                                        <input type="email" className="form-control" placeholder="evaGreen@gmail.com" value={emailText} onChange={(e) => setEmailText(e.target.value)} />
                                    </div>
                                    <div className="col-6 pt-3">
                                        <label className="form-label">Insurance number</label>
                                        <input type="text" className="form-control" placeholder="1234567891234" value={insuranceText} onChange={(e) => setInsuranceText(e.target.value.replace(/\s/g, ""))} />
                                    </div>
                                </div>
                                <div className="d-flex gap-2 justify-content-center mt-5">
                                    <button type="submit" className="btn btn-primary" onClick={updatePatient}>
                                        Update
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={() => visibilityToggler((v) => !v)}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdatePatientWidget;
