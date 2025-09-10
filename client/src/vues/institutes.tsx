import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { Institute, Permissions } from "../types";
import Header from "../components/header";
import { AiOutlineEdit } from "react-icons/ai";
import UpdateInstituteCredentials from "../components/institutes/updateInstituteModal";
import CreateInstitute from "../components/institutes/createInstitute";
import { BsHouseAdd } from "react-icons/bs";
import Footer from "../components/footer";
import "./institutes.css";
import { Link } from "react-router-dom";
import { CiBoxList } from "react-icons/ci";
import { FaHouseMedicalFlag } from "react-icons/fa6";

const Institutes: React.FC = () => {
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [searchInstitute, setSearchInstitute] = useState<string>("");
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
      .then((data) => setPermissions(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/institutes/getAll", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setInstitutes(data));
  }, [refresh]);

  const setModifyVis = useCallback((inst: Institute) => {
    setClickedInstitute(inst);
    setModifyInstituteVis(true);
  }, []);

  return (
    <>
      <div className="container-fluid" id="instituteRoot">
        <Header />

        <div className="d-flex flex-column gap-2">
          <h2 className="text-center main-font">Institutes</h2>
          <div className="row justify-content-center">
            <div className="col-10 col-lg-5">
              <input type="text" className="form-control m-0" placeholder="Search for an institute" value={searchInstitute} onChange={(e) => setSearchInstitute(e.target.value)} />
            </div>
          </div>
          <div className="row justify-content-center">
            {Boolean(permissions?.create_patient) && (
              <div className="btn" style={{ maxWidth: "150px" }} onClick={() => setCreateInstituteVisible((oldValue) => !oldValue)}>
                <BsHouseAdd color="blue" size={40} data-tooltip-id="mediFlowTooltip" data-tooltip-content="Create a new institute" />
              </div>
            )}
          </div>
          <div className="row gap-4 justify-content-center mt-3 mx-3 mx-lg-0">
            {institutes &&
              institutes
                .filter((institute) => {
                  return (
                    institute.institute_name.includes(searchInstitute) ||
                    institute.institute_name.includes(searchInstitute.slice(0, 1).toUpperCase() + searchInstitute.slice(1)) ||
                    institute.institute_address.includes(searchInstitute) ||
                    institute.institute_address.includes(searchInstitute.slice(0, 1).toUpperCase() + searchInstitute.slice(1))
                  );
                })
                .map((institute, index) => {
                  return (
                    <div key={index} className="border rounded-3 col-xl-4 col-lg-4 col-md-5 p-3 shadow bg-light">
                      <FaHouseMedicalFlag size={100} style={{ position: "absolute", opacity: "10%" }} color="rgba(161, 159, 0, 1)" />
                      {Boolean(permissions?.create_patient) && (
                        <div className="d-flex justify-content-end mb-2">
                          <AiOutlineEdit className="icon" onClick={() => setModifyVis(institute)} data-tooltip-id="mediFlowTooltip" data-tooltip-content="Update the institute" />
                        </div>
                      )}
                      <Link to={`/instituteDetails/${institute.inst_id}`} key={institute.inst_id} className="d-flex justify-content-end mb-2 text-decoration-none">
                        <CiBoxList className="icon" data-tooltip-id="mediFlowTooltip" data-tooltip-content="Patients related to this institute" />
                      </Link>
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
          {/* <Footer /> */}
        </div>
        {createInstituteVisible && <CreateInstitute visibilityToggler={setCreateInstituteVisible} refreshDashboardHandler={setRefresh} />}
        {modifyInstituteVis && <UpdateInstituteCredentials institute={clickedInstitute} visHandler={setModifyInstituteVis} refreshHandler={setRefresh} />}
      </div>
    </>
  );
};

export default Institutes;
