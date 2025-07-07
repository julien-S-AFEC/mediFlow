import React from "react";
import { useEffect, useState } from "react";
import { Institute } from "../types";
import Header from "../components/header";
import { AiOutlineEdit } from "react-icons/ai";
import UpdateInstituteCredentials from "../components/institutes/updateInstituteCredentials";

const Institutes: React.FC = () => {
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [clickedInstitute, setClickedInstitute] = useState<Institute>([]);
  const [modifyInstituteVis, setModifyInstituteVis] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/institutes/getAll", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setInstitutes(JSON.parse(data)));
  }, [refresh]);

  const setModifyVis = (inst: Institute) => {
    setClickedInstitute(inst);
    setModifyInstituteVis(true);
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row gap-4 justify-content-center">
          {institutes &&
            institutes.map((institute) => {
              return (
                <div key={institute.inst_id} className="border rounded-3 col-3 p-3 shadow">
                  <div className="d-flex justify-content-between">
                    <div className="main-font">{institute.institute_name || "Not provided"}</div>
                    <AiOutlineEdit onClick={() => setModifyVis(institute)} />
                  </div>
                  <div className="main-font fw-light">{institute.institute_address || "Not provided"}</div>
                  <div className="main-font fw-light">{institute.institute_phone_number || "Not provided"}</div>
                </div>
              );
            })}
        </div>
      </div>
      {modifyInstituteVis && <UpdateInstituteCredentials institute={clickedInstitute} visHandler={setModifyInstituteVis} refreshHandler={setRefresh} />}
    </>
  );
};

export default Institutes;
