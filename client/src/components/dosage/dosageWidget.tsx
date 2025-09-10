import React, { useEffect, useState } from "react";
import DosageRow from "./dosageRow";
import { HiBarsArrowDown } from "react-icons/hi2";
import { HiBarsArrowUp } from "react-icons/hi2";
import { PiPrinterThin } from "react-icons/pi";
import { AiOutlineSun } from "react-icons/ai";
import { PiSunHorizonLight } from "react-icons/pi";
import { TfiSave } from "react-icons/tfi";
import { GiMedicines } from "react-icons/gi";
import { PiMoonThin } from "react-icons/pi";
import { LuCakeSlice } from "react-icons/lu";
import { Permissions } from "../../types";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

type Iprops = {
  prescriptionId: number;
  permissions?: Permissions;
};

const DosageWidget: React.FC<Iprops> = ({ prescriptionId, permissions }) => {
  const [allRowsContent, setAllRowsContent] = useState<object[]>([]);
  const [modified, setModified] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    fetch("http://localhost:3000/api/prescriptionDosage/getById", {
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
    const newContent = [...allRowsContent, { col1: "", col2: "", col3: "", col4: "" }];
    setAllRowsContent(newContent);
  };

  const removeRow = () => {
    const [...rowsContent] = allRowsContent;
    rowsContent.pop();
    setAllRowsContent(rowsContent);
  };

  const storeDosage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/prescriptionDosage/store", {
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
                <GiMedicines className="w-100" color="rgba(49, 49, 49, 1)" style={{ minHeight: "50px" }} />
              </th>
              <th scope="col">
                <PiSunHorizonLight className="w-100" color="rgba(49, 49, 49, 1)" style={{ minHeight: "50px" }} />
              </th>
              <th scope="col">
                <AiOutlineSun className="w-100" color="rgba(44, 44, 44, 1)" style={{ minHeight: "50px" }} />
              </th>
              <th scope="col">
                <LuCakeSlice className="w-100" color="rgba(43, 43, 43, 1)" style={{ minHeight: "50px", strokeWidth: 1 }} />
              </th>
              <th scope="col">
                <PiMoonThin className="w-100" color="rgba(44, 44, 44, 1)" style={{ minHeight: "50px" }} />
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
      {Boolean(permissions?.create_prescription_commentary) && (
        <>
          <div className="d-flex gap-3">
            <HiBarsArrowDown color="#247cffff" size={30} onClick={addRow} style={{ cursor: "pointer" }} data-tooltip-id="mediFlowTooltip" data-tooltip-content="Add a row" />
            <HiBarsArrowUp color="red" size={30} onClick={removeRow} style={{ cursor: "pointer" }} data-tooltip-id="mediFlowTooltip" data-tooltip-content="Remove the last row" />
          </div>
          <div className="d-flex gap-3">
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
          </div>
        </>
      )}
    </form>
  );
};

export default DosageWidget;
