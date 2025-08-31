import React, { useEffect, useState, useRef } from "react";
import DosageRow from "./dosageRow";
import { HiBarsArrowDown, HiBarsArrowUp } from "react-icons/hi2";
import { PiPrinterThin, PiSunHorizonLight, PiMoonThin } from "react-icons/pi";
import { AiOutlineSun } from "react-icons/ai";
import { TfiSave } from "react-icons/tfi";
import { GiMedicines } from "react-icons/gi";
import { LuCakeSlice } from "react-icons/lu";
import { Permissions } from "../../types";
import { useReactToPrint } from "react-to-print";

type Iprops = {
  prescriptionId: number;
  permissions?: Permissions;
};

const DosageWidget: React.FC<Iprops> = ({ prescriptionId, permissions }) => {
  const [allRowsContent, setAllRowsContent] = useState<any[]>([]);
  const [modified, setModified] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    fetch("http://localhost:3000/api/prescriptionDosage/getById", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        prescriptionId: prescriptionId,
      }),
    })
      .then((res) => res.ok && res.json())
      .then((data) => {
        setAllRowsContent(data);
      });
  }, [prescriptionId]);

  const addRow = () => {
    const newContent = [
      ...allRowsContent,
      { col1: "", col2: "", col3: "", col4: "", col5: "" },
    ];
    setAllRowsContent(newContent);
  };

  const removeRow = () => {
    const rowsContent = [...allRowsContent];
    rowsContent.pop();
    setAllRowsContent(rowsContent);
  };

  const storeDosage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/prescriptionDosage/store", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        prescriptionId: prescriptionId,
        content: allRowsContent,
      }),
    }).then(() => setModified(false));
  };

  return (
    <form
      action="#"
      className="d-flex flex-column align-items-center justify-content-center w-100"
    >
      <div className="main-font mt-5">Medication</div>
      <div ref={contentRef} className="w-100">
        <div className="d-block  mt-4">
          {allRowsContent?.map((row, i) => (
            <div key={i} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center gap-2">
                  <GiMedicines size={35} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Medicine"
                    value={row.col1 || ""}
                    onChange={(e) => {
                      setAllRowsContent((old) =>
                        old.map((r, idx) =>
                          idx === i ? { ...r, col1: e.target.value } : r
                        )
                      );
                      setModified(true);
                    }}
                  />
                </h5>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <PiSunHorizonLight size={35} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Morning"
                    value={row.col2 || ""}
                    onChange={(e) => {
                      setAllRowsContent((old) =>
                        old.map((r, idx) =>
                          idx === i ? { ...r, col2: e.target.value } : r
                        )
                      );
                      setModified(true);
                    }}
                  />
                </div>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <AiOutlineSun size={35} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Midday"
                    value={row.col3 || ""}
                    onChange={(e) => {
                      setAllRowsContent((old) =>
                        old.map((r, idx) =>
                          idx === i ? { ...r, col3: e.target.value } : r
                        )
                      );
                      setModified(true);
                    }}
                  />
                </div>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <LuCakeSlice size={35} style={{ strokeWidth: 1 }} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Afternoon"
                    value={row.col4 || ""}
                    onChange={(e) => {
                      setAllRowsContent((old) =>
                        old.map((r, idx) =>
                          idx === i ? { ...r, col4: e.target.value } : r
                        )
                      );
                      setModified(true);
                    }}
                  />
                </div>
                <div className="d-flex align-items-center gap-2">
                  <PiMoonThin size={35} />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Evening"
                    value={row.col5 || ""}
                    onChange={(e) => {
                      setAllRowsContent((old) =>
                        old.map((r, idx) =>
                          idx === i ? { ...r, col5: e.target.value } : r
                        )
                      );
                      setModified(true);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {Boolean(permissions?.create_prescription_commentary) && (
        <>
          <div className="d-flex gap-3">
            <HiBarsArrowDown
              color="#247cffff"
              size={35}
              onClick={addRow}
              style={{ cursor: "pointer" }}
              data-tooltip-id="mediFlowTooltip"
              data-tooltip-content="Add a row"
            />
            <HiBarsArrowUp
              color="red"
              size={35}
              onClick={removeRow}
              style={{ cursor: "pointer" }}
              data-tooltip-id="mediFlowTooltip"
              data-tooltip-content="Remove the last row"
            />
          </div>
          <div className="d-flex gap-3">
            <button onClick={storeDosage} className="btn mt-5">
              <div className="position-relative">
                <TfiSave color="blue" size={35}></TfiSave>
                {modified && (
                  <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                    <span className="visually-hidden">New alerts</span>
                  </span>
                )}
              </div>
            </button>
            <div
              onClick={reactToPrintFn}
              className="btn mt-5"
              style={{ cursor: "pointer" }}
            >
              <PiPrinterThin size={35} color="#c0cc17ff" />
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default DosageWidget;