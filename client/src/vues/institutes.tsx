import React from "react";
import { useEffect, useState } from "react";
import { Institute } from "../types";
import Header from "../components/header";
import { AiOutlineEdit } from "react-icons/ai";
import UpdateInstituteCredentials from "../components/institutes/updateInstituteCredentials";
import CreateInstitute from "./createInstitute";
import { LuCirclePlus } from "react-icons/lu";

const Institutes: React.FC = () => {
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [clickedInstitute, setClickedInstitute] = useState<Institute>([]);
  const [modifyInstituteVis, setModifyInstituteVis] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [createInstituteVisible, setCreateInstituteVisible] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<Permissions>();

  useEffect(() => {
    fetch("http://localhost:3000/api/users/getCurrentUserPermissions", { method: "GET", credentials: "include", headers: { "Content-type": "application/json" } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setPermissions(data));
  }, []);

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
        {Boolean(permissions?.create_patient) && (
          <div className="btn text-nowrap" onClick={() => setCreateInstituteVisible((oldValue) => !oldValue)}>
            <LuCirclePlus color="blue" style={{width: "35px", height: "auto"}} />
          </div>
        )}
        <div className="row gap-4 justify-content-center mt-5">
          {institutes &&
            institutes.map((institute) => {
              return (
                <div key={institute.inst_id} className="border rounded-3 col-3 p-3 shadow">
                  <div className="d-flex justify-content-end mb-2">
                    <AiOutlineEdit onClick={() => setModifyVis(institute)} />
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>Name</div>
                    <div className="main-font">{institute.institute_name || "Not provided"}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>Address</div>
                    <div className="main-font fw-light">{institute.institute_address || "Not provided"}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>Phone number</div>
                    <div className="main-font fw-light">{institute.institute_phone_number || "Not provided"}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {createInstituteVisible && <CreateInstitute visibilityToggler={setCreateInstituteVisible} refreshDashboardHandler={setRefresh} />}
      {modifyInstituteVis && <UpdateInstituteCredentials institute={clickedInstitute} visHandler={setModifyInstituteVis} refreshHandler={setRefresh} />}

    </>
  );
};

export default Institutes;
