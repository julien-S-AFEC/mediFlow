import { JSX, useEffect, useState } from "react";
import DosageRow from "./dosageRow";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { PiPrinterThin } from "react-icons/pi";
import { AiOutlineSun } from "react-icons/ai";
import { PiSunHorizonLight } from "react-icons/pi";
import { PiMoonThin } from "react-icons/pi";
import { LuCakeSlice } from "react-icons/lu";

const DosageWidget = ({ prescriptionId }) => {
  const [allRowsContent, setAllRowsContent] = useState<object[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/prescriptionDosage/getById", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        prescriptionId: prescriptionId,
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(data => {
        setAllRowsContent(data)
      })
  }, [prescriptionId])

  const addRow = () => {
    const newContent = [...allRowsContent, { col1: "", col2: "", col3: "", col4: "" }]
    setAllRowsContent(newContent)
  };

  const removeRow = () => {
    const [...rowsContent] = allRowsContent;
    rowsContent.pop();
    setAllRowsContent(rowsContent)
  };

  const storeDosage = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/api/prescriptionDosage/store", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        prescriptionId: prescriptionId,
        content: allRowsContent,
      }),
    })
  }

  const printContent = () => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (printWindow) {
      printWindow.document.write(`
          <html>
            <head>
              <title>Print</title>

            </head>
            <body>${document.getElementById("dosageContent")?.innerHTML}</body>
          </html>
        `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <form action="#" className="d-flex flex-column align-items-center justify-content-center">
      <div id="dosageContent">
        <table className="table table-success table-striped-columns mt-5">
          <thead>
            <tr>
              <th scope="col">
                <PiSunHorizonLight className="w-100" color="rgba(49, 49, 49, 1)" style={{ minHeight: '50px' }} />
              </th>
              <th scope="col">
                <AiOutlineSun className="w-100" color="rgba(44, 44, 44, 1)" style={{ minHeight: '50px' }} />
              </th>
              <th scope="col">
                <LuCakeSlice className="w-100" color="rgba(43, 43, 43, 1)" style={{ minHeight: '50px', strokeWidth: 1 }} />
              </th>
              <th scope="col">
                <PiMoonThin className="w-100" color="rgba(44, 44, 44, 1)" style={{ minHeight: '50px' }} />
              </th>
            </tr>
          </thead>
          <tbody>
            {allRowsContent && allRowsContent.map((row, i) => {
              return (
                <DosageRow key={i} content={allRowsContent} contentHandler={setAllRowsContent} index={i} />
              )
            })}

          </tbody>
        </table>
      </div>
      <div className="d-flex gap-3">
        <CiCirclePlus color="blue" size={50} onClick={addRow} />
        <CiCircleMinus color="red" size={50} onClick={removeRow} />
      </div>
      <div className="d-flex gap-3">
        <button onClick={storeDosage} className="btn btn-primary mt-5">Save</button>
        <button onClick={printContent} className="btn btn-warning mt-5"><PiPrinterThin size={30} /></button>
      </div>

    </form>
  );
};

export default DosageWidget;
