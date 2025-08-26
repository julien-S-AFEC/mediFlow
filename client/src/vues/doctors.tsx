import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { Doctor, Permissions } from "../types";
import Header from "../components/header";
import { AiOutlineEdit } from "react-icons/ai";
import CreateDoctor from "../components/doctors/createDoctor";
import UpdateDoctorCredentials from "../components/doctors/updateDoctorCredentials";
import { IoPersonAddOutline } from "react-icons/io5";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { CiBoxList } from "react-icons/ci";

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [clickedDoctor, setClickedDoctor] = useState<Doctor>();
  const [modifyDoctorVis, setModifyDoctorVis] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [createDoctorVisible, setCreateDoctorVisible] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<Permissions>();

  useEffect(() => {
    fetch("https://mediflow-vgtc.onrender.com/api/users/getCurrentUserPermissions", { method: "GET", credentials: "include", headers: { "Content-type": "application/json" } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => {
        setPermissions(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://mediflow-vgtc.onrender.com/api/doctors/getAll", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
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
    <>
      <Header />
      <div className="d-flex flex-column gap-2">
        <h2 className="text-center main-font">Doctors</h2>
        {permissions?.create_patient ? (
          <div className="btn" onClick={() => setCreateDoctorVisible((oldValue) => !oldValue)}>
            <IoPersonAddOutline color="blue" size={30} />
          </div>
        ) : null}
        <div className="row gap-4 justify-content-center mt-3 mx-3 mx-lg-0">
          {doctors &&
            doctors.map((doctor, index) => {
              return (
                <div key={doctor.doctor_id} className="border rounded-3 col-xl-4 col-lg-4 col-md-5 p-3 shadow">
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
        <Footer />
      </div>
      {modifyDoctorVis && <UpdateDoctorCredentials doctor={clickedDoctor} visHandler={setModifyDoctorVis} refreshHandler={setRefresh} />}
      {createDoctorVisible && <CreateDoctor visibilityToggler={setCreateDoctorVisible} refreshDashboardHandler={setRefresh} />}
    </>
  );
};

export default Doctors;
