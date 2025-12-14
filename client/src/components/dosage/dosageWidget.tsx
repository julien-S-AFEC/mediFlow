import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSun } from "react-icons/ai";
import { GiMedicines } from "react-icons/gi";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";
import { LuCakeSlice } from "react-icons/lu";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { PiMoonThin, PiPrinterThin, PiSunHorizonLight } from "react-icons/pi";
import { TfiSave } from "react-icons/tfi";
import { useReactToPrint } from "react-to-print";
import SmallLoading from "../smallLoading";
import useGetPrescriptionName from "../../hooks/getPrescriptionText";
import { Permissions } from "../../types";
import DosageRow from "./dosageRow";
import "./dosageWidget.css";

type Iprops = {
  prescriptionId: number;
  permissions?: Permissions;
  isArchived: boolean
  currentPrescription: string;
};

const DosageWidget: React.FC<Iprops> = ({ prescriptionId, permissions, isArchived, currentPrescription }) => {
  const [allRowsContent, setAllRowsContent] = useState<object[]>([]);
  const [modified, setModified] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });


  useEffect(() => {
    fetch("/api/prescriptionDosage/getById", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        prescriptionId: prescriptionId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setAllRowsContent(data);
      });
  }, [prescriptionId]);

  const addRow = () => {
    const newContent = [...allRowsContent, { col1: "", col2: "", col3: "", col4: "", col5: "" }];
    setAllRowsContent(newContent);
  };

  const removeRow = () => {
    const [...rowsContent] = allRowsContent;
    rowsContent.pop();
    setAllRowsContent(rowsContent);
  };

  const { getPrescriptionMedicineName, medicineNames, loading } = useGetPrescriptionName(currentPrescription, setAllRowsContent);

  const storeDosage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch("/api/prescriptionDosage/store", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        prescriptionId: prescriptionId,
        content: allRowsContent,
      }),
    }).then(() => setModified(false));
  };

  return (
    <form action="#" className="d-flex flex-column align-items-center justify-content-center">
      <div ref={contentRef}>
        <table className="table table-striped-columns mt-5">
          <thead>
            <tr>
              <th scope="col">
                <GiMedicines className="w-100 dosage-icon" color="rgba(49, 49, 49, 1)" style={{ minHeight: "50px" }} />
              </th>
              <th scope="col">
                <PiSunHorizonLight className="w-100 dosage-icon" color="rgba(49, 49, 49, 1)" style={{ minHeight: "50px" }} />
              </th>
              <th scope="col">
                <AiOutlineSun className="w-100 dosage-icon" color="rgba(44, 44, 44, 1)" style={{ minHeight: "50px" }} />
              </th>
              <th scope="col">
                <LuCakeSlice className="w-100 dosage-icon" color="rgba(43, 43, 43, 1)" style={{ minHeight: "50px", strokeWidth: 1 }} />
              </th>
              <th scope="col">
                <PiMoonThin className="w-100 dosage-icon" color="rgba(44, 44, 44, 1)" style={{ minHeight: "50px" }} />
              </th>
            </tr>
          </thead>
          <tbody>
            {allRowsContent &&
              allRowsContent.map((_, i) => {
                return <DosageRow key={i} content={allRowsContent} contentHandler={setAllRowsContent} index={i} changeHandler={setModified} />;
              })}
          </tbody>
        </table>
      </div>
      {Boolean(permissions?.create_prescription_commentary) && Boolean(!isArchived) && (
        <>
          <div className="d-flex gap-3">
            <HiBarsArrowDown
              color="#247cffff"
              size={30}
              onClick={addRow}
              style={{ cursor: "pointer" }}
              data-tooltip-id="mediFlowTooltip"
              data-tooltip-content="Add a row" />
            <HiBarsArrowUp
              color="red" size={30}
              onClick={removeRow}
              style={{ cursor: "pointer" }}
              data-tooltip-id="mediFlowTooltip"
              data-tooltip-content="Remove the last row" />
          </div>

          <div className="d-flex gap-3">
            {loading ? <SmallLoading /> : (
              <>
                <button onClick={(e) => { e.preventDefault(); getPrescriptionMedicineName() }} className="btn mt-5" data-tooltip-id="mediFlowTooltip" data-tooltip-content="Get prescription medicine name">
                  <MdOutlineAutoAwesome color="green" size={30} />
                </button>
                <button onClick={storeDosage} className="btn mt-5">
                  <div className="position-relative">
                    <TfiSave color="blue" size={30}></TfiSave>
                    {modified && (
                      <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                        <span className="visually-hidden">New alerts</span>
                      </span>
                    )}
                  </div>
                </button>
                <div onClick={reactToPrintFn} className="btn mt-5" style={{ cursor: "pointer" }}>
                  <PiPrinterThin size={40} color="#c0cc17ff" />
                </div>
              </>
            )}
          </div>
        </>
      )
      }
    </form >
  );
};

export default DosageWidget;
