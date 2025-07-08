import React from "react";
import { useEffect, useState } from "react";
import { Doctor } from "../types";
import Header from "../components/header";
import { AiOutlineEdit } from "react-icons/ai";
import CreateDoctor from "../vues/createDoctor";
import UpdateDoctorCredentials from "../components/doctors/updateDoctorCredentials";
import { LuCirclePlus } from "react-icons/lu";

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [clickedDoctor, setClickedDoctor] = useState<Doctor>([]);
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
        setPermissions(JSON.parse(data))});
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/doctors/getAll", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setDoctors(JSON.parse(data)));
  }, [refresh]);

  const setModifyVis = (doc: Doctor) => {
    setClickedDoctor(doc);
    setModifyDoctorVis(true);
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        {Boolean(permissions?.create_patient) && (
          <div className="btn text-nowrap" onClick={() => setCreateDoctorVisible((oldValue) => !oldValue)}>
            <LuCirclePlus color="blue" style={{ width: "35px", height: "auto" }} />
          </div>
        )}
        <div className="row gap-4 justify-content-center">
          {doctors &&
            doctors.map((doctor) => {
              return (
                <div key={doctor.doctor_id} className="border rounded-3 col-3 p-3 shadow">
                  <div className="d-flex justify-content-end mb-2">
                    <AiOutlineEdit onClick={() => setModifyVis(doctor)} />
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="main-font">{doctor.doctor_firstname + " " + doctor.doctor_secondname || "Not provided"}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>Institute</div>
                    <div className="main-font fw-light">{doctor.doctor_institute || "Not provided"}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>Address</div>
                    <div className="main-font fw-light">{doctor.doctor_adress || "Not provided"}</div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div>Phone</div>
                    <div className="main-font fw-light">{doctor.doctor_phone_number || "Not provided"}</div>
                  </div>
                  <div className="d-flex justify-content-between">
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
    </>
  );
};

export default Doctors;
