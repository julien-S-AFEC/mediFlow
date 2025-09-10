import { Prescription } from "../../types";
import React, { useEffect, useState } from "react";
import "./allPrescriptionsWidget.css";

type Iprops = {
  prescriptions: Prescription[];
  currentPrescriptionHandler: React.Dispatch<React.SetStateAction<Prescription | undefined>>;
};

const AllPrescriptionsWidget: React.FC<Iprops> = ({ prescriptions, currentPrescriptionHandler }) => {
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<number | null>(null);

  const selectPrescription = (prescription: Prescription) => {
    setSelectedPrescriptionId(prescription.id);
    currentPrescriptionHandler(prescription);
  };

  useEffect(() => {
    if (prescriptions.length) {
      selectPrescription(prescriptions[0])
    }
  }, [])

  return (
    <>
      <div className="d-flex flex-row flex-md-column gap-3 overflow-y-auto overflow-x-auto lightScrollbar" style={{ maxHeight: "500px", maxWidth: "300px" }}>
        {prescriptions.map((prescription) => {
          const isSelected = prescription.id === selectedPrescriptionId;
          return (
            <div key={prescription.id} className="prescription" onClick={() => selectPrescription(prescription)} style={{ cursor: "pointer" }}>
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
