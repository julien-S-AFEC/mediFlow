import { JSX, useState } from "react";
import DosageRow from "./dosageRow";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { AiOutlineSun } from "react-icons/ai";
import { PiSunHorizonLight } from "react-icons/pi";
import { PiMoonThin } from "react-icons/pi";
import { LuCakeSlice } from "react-icons/lu";

const DosageWidget = () => {
  const [rows, setRows] = useState<JSX.Element[]>([]);

  const addRow = () => {
    setRows((oldRows) => [...oldRows, <DosageRow key={oldRows.length} />]);
    
  };

  const removeRow = () => {
    const [...newRows] = rows;
    newRows.pop();
    setRows(newRows);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <table className="table table-success table-striped-columns mt-5">
        <thead>
          <tr>
            <th scope="col">
              <PiSunHorizonLight className="w-100" color="rgba(209, 153, 0, 1)" style={{minHeight: '50px'}}/>
            </th>
            <th scope="col">
              <AiOutlineSun className="w-100" color="rgba(248, 255, 145, 1)" style={{minHeight: '50px'}}/>
            </th>
            <th scope="col">
              <LuCakeSlice className="w-100" color="rgba(165, 121, 0, 1)" style={{minHeight: '50px', strokeWidth: 1}}/>
            </th>{" "}
            <th scope="col">
              <PiMoonThin className="w-100" color="rgba(82, 80, 255, 1)" style={{minHeight: '50px'}}/>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
          </tr>
          {rows}
        </tbody>
      </table>
      <div className="d-flex gap-3">
        <CiCirclePlus color="blue" size={50} onClick={addRow} />
        <CiCircleMinus color="red" size={50} onClick={removeRow} />
      </div>
      <form action="#">
        <div onClick={() => console.log(rows.keys())} className="btn btn-primary mt-5">Save</div>
      </form>
    </div>
  );
};

export default DosageWidget;
