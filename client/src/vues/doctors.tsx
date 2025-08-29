import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { Doctor, Permissions } from "../types";
import Header from "../components/header";
import { AiOutlineEdit } from "react-icons/ai";
import CreateDoctor from "../components/doctors/createDoctor";
import UpdateDoctorCredentials from "../components/doctors/updateDoctorCredentials";
import { IoPersonAddOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CiBoxList } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";
import './doctors.css'

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchDoctors, setSearchDoctors] = useState<string>("");
  const [clickedDoctor, setClickedDoctor] = useState<Doctor>();
  const [modifyDoctorVis, setModifyDoctorVis] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [createDoctorVisible, setCreateDoctorVisible] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<Permissions>();

  useEffect(() => {
    fetch("http://localhost:3000/api/users/getCurrentUserPermissions", { method: "GET", credentials: "include", headers: { "Content-type": "application/json" } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setPermissions(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/doctors/getAll", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setDoctors(data));
  }, [refresh]);

  const setModifyVis = useCallback((doc: Doctor) => {
    setClickedDoctor(doc);
    setModifyDoctorVis(true);
  }, []);

  return (
    <div className="container-fluid" id="doctorsRoot">
      <Header />
      <div className="d-flex flex-column gap-2">
        <h2 className="text-center main-font">Doctors</h2>
        <div className="row justify-content-center">
          <div className="col-10 col-lg-5">
            <input type="text" className="form-control m-0" placeholder="Search for a doctor" value={searchDoctors} onChange={(e) => setSearchDoctors(e.target.value)} />
          </div>
        </div>
        <div className="row justify-content-center">
          {permissions?.create_patient ? (
            <div className="btn" style={{ maxWidth: "150px" }} onClick={() => setCreateDoctorVisible((oldValue) => !oldValue)}>
              <IoPersonAddOutline color="blue" size={40} />
            </div>
          ) : null}
        </div>
        <div className="row gap-4 justify-content-center mt-3 mx-3 mx-lg-0">
          {doctors &&
            doctors
              .filter((doctor) => {
                return (
                  doctor.doctor_firstname.includes(searchDoctors) ||
                  doctor.doctor_firstname.includes(searchDoctors.slice(0, 1).toUpperCase() + searchDoctors.slice(1)) ||
                  doctor.doctor_secondname.includes(searchDoctors) ||
                  doctor.doctor_secondname.includes(searchDoctors.slice(0, 1).toUpperCase() + searchDoctors.slice(1))
                );
              })
              .map((doctor, index) => {
                return (
                  <div key={doctor.doctor_id} className="border rounded-3 col-md-5 p-3 shadow mb-2 bg-light">
                    <FaUserDoctor size={80} style={{ position: "absolute", opacity: "7%" }} color="blue" />
                    {Boolean(permissions?.create_patient) && (
                      <div className="d-flex justify-content-end mb-2">
                        <AiOutlineEdit onClick={() => setModifyVis(doctor)} size={25} data-tooltip-id="mediFlowTooltip" data-tooltip-content="Update doctor" />
                      </div>
                    )}
                    <Link to={`/doctorDetails/${doctor.doctor_id}`} key={index} className="d-flex justify-content-end mb-2 text-decoration-none">
                      <CiBoxList className="icon" data-tooltip-id="mediFlowTooltip" data-tooltip-content="Patient related to this doctor" />
                    </Link>

                    <div className="d-flex justify-content-center mb-2 gap-3">
                      <div className="main-font">{doctor.doctor_firstname + " " + doctor.doctor_secondname || "Not provided"}</div>
                    </div>
                    <div className="d-flex justify-content-between gap-3">
                      <div>Institute</div>
                      <div className="main-font fw-light">{doctor.doctor_institute || "Not provided"}</div>
                    </div>
                    <div className="d-flex justify-content-between gap-3">
                      <div>Address</div>
                      <div className="main-font fw-light text-wrap">{doctor.doctor_address || "Not provided"}</div>
                    </div>
                    <div className="d-flex justify-content-between gap-3">
                      <div>Phone</div>
                      <div className="main-font fw-light">{doctor.doctor_phone_number || "Not provided"}</div>
                    </div>
                    <div className="d-flex justify-content-between gap-3">
                      <div>Email</div>
                      <div className="main-font fw-light">{doctor.doctor_email || "Not provided"}</div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      {modifyDoctorVis && <UpdateDoctorCredentials doctor={clickedDoctor} visHandler={setModifyDoctorVis} refreshHandler={setRefresh} />}
      {createDoctorVisible && <CreateDoctor visibilityToggler={setCreateDoctorVisible} refreshDashboardHandler={setRefresh} />}
    </div>
  );
};

export default Doctors;
