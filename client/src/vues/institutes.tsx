import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { Institute, Permissions } from "../types";
import Header from "../components/header";
import { AiOutlineEdit } from "react-icons/ai";
import UpdateInstituteCredentials from "../components/institutes/updateInstituteModal";
import CreateInstitute from "../components/institutes/createInstitute";
import { BsHouseAdd } from "react-icons/bs";
import Footer from "../components/footer";
import './institutes.css'

const Institutes: React.FC = () => {
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [clickedInstitute, setClickedInstitute] = useState<Institute>();
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
      .then((data) => setPermissions(JSON.parse(data)));
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

  const setModifyVis = useCallback((inst: Institute) => {
    setClickedInstitute(inst);
    setModifyInstituteVis(true);
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex flex-column gap-2">
        <h2 className="text-center main-font">Institutes</h2>
        {Boolean(permissions?.create_patient) && (
          <div className="btn text-nowrap" onClick={() => setCreateInstituteVisible((oldValue) => !oldValue)}>
            <BsHouseAdd color="blue" size={30} />
          </div>
        )}
        <div className="row gap-4 justify-content-center mt-3 mx-3 mx-lg-0">
          {institutes &&
            institutes.map((institute) => {
              return (
                <div key={institute.inst_id} className="border rounded-3 col-xl-4 col-lg-4 col-md-5 p-3 shadow main-font card-hover">
                  {Boolean(permissions?.create_patient) && (
                    <div className="d-flex justify-content-end mb-2">
                      <AiOutlineEdit onClick={() => setModifyVis(institute)} />
                    </div>
                  )}
                  <div className="d-flex justify-content-center mb-2">
                    <div>{institute.institute_name || "Not provided"}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>Address</div>
                    <div className="fw-light">{institute.institute_address || "Not provided"}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>Phone number</div>
                    <div className="fw-light">{institute.institute_phone_number || "Not provided"}</div>
                  </div>
                </div>
              );
            })}
        </div>
        <Footer />
      </div>
      {createInstituteVisible && <CreateInstitute visibilityToggler={setCreateInstituteVisible} refreshDashboardHandler={setRefresh} />}
      {modifyInstituteVis && <UpdateInstituteCredentials institute={clickedInstitute} visHandler={setModifyInstituteVis} refreshHandler={setRefresh} />}
    </>
  );
};

export default Institutes;
