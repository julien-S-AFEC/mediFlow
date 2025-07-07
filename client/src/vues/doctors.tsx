import React from "react";
import { useEffect, useState } from "react";
import { Doctor } from "../types";
import Header from "../components/header";
import { AiOutlineEdit } from "react-icons/ai";
import UpdateDoctorCredentials from "../components/doctors/updateDoctorCredentials";

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [clickedDoctor, setClickedDoctor] = useState<Doctor>([]);
  const [modifyDoctorVis, setModifyDoctorVis] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

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
        <div className="row gap-4 justify-content-center">
          {doctors &&
            doctors.map((doctor) => {
              return (
                <div key={doctor.doctor_id} className="border rounded-3 col-3 p-3 shadow">
                  <div className="d-flex justify-content-between">
                    <div className="main-font">{doctor.doctor_firstname + " " + doctor.doctor_secondname || "Not provided"}</div>
                    <AiOutlineEdit onClick={() => setModifyVis(doctor)} />
                  </div>
                  <div className="main-font fw-light">{doctor.doctor_institute || "Not provided"}</div>
                  <div className="main-font fw-light">{doctor.doctor_adress || "Not provided"}</div>
                  <div className="main-font fw-light">{doctor.doctor_phone_number || "Not provided"}</div>
                  <div className="main-font fw-light">{doctor.doctor_email || "Not provided"}</div>
                </div>
              );
            })}
        </div>
      </div>
      {modifyDoctorVis && <UpdateDoctorCredentials doctor={clickedDoctor} visHandler={setModifyDoctorVis} refreshHandler={setRefresh} />}
    </>
  );
};

export default Doctors;
