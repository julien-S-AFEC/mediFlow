import { Prescription } from "../../types";
import React, { useState } from "react";
import './allPrescriptionsWidget.css'

type Iprops = {
    prescriptions: Prescription[],
    currentPrescriptionHandler: React.Dispatch<React.SetStateAction<Prescription | undefined>>
};

const AllPrescriptionsWidget: React.FC<Iprops> = ({ prescriptions, currentPrescriptionHandler }) => {
    const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<string | null>(null);

    const selectPrescription = (prescription: Prescription) => {
        setSelectedPrescriptionId(prescription.id);
        currentPrescriptionHandler(prescription)
    };

    return (
        <>
            <div className="d-flex flex-column gap-3">
                {prescriptions.map((prescription) => {
                    const isSelected = prescription.id === selectedPrescriptionId;
                    return (
                        <div
                            key={prescription.id}
                            className="prescription"
                            onClick={() => selectPrescription(prescription)}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                className={`img img-fluid rounded-2 ${isSelected ? "selected-prescription" : "non-selected-prescription"}`}
                                style={{ maxWidth: "100px" }}
                                src={`http://localhost:3000/${prescription.file_path}`}
                                alt=""
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default AllPrescriptionsWidget;
