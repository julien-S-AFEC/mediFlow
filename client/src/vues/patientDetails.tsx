import React, { useCallback, useEffect, useState } from "react";
import { Doctor, Institute, Patient, Permissions, Prescription, User } from "../types";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { HiOutlineUpload } from "react-icons/hi";
import { BsFileEarmarkPerson } from "react-icons/bs";
import PatientDetailsWidget from "../components/patients/patientDetailsWidget.tsx";
import DoctorDetailsWidget from "../components/doctors/doctorDetailsWidget.tsx";
import InstituteDetailsWidget from "../components/institutes/instituteDetailsWidget.tsx";
import Header from "../components/header";
import ConfirmArchiveModal from "../components/confirmArchiveModal.tsx";
import CurrentPrescriptionWidget from "../components/prescriptions/currentPrescriptionWidget.tsx";
import AllPrescriptionsWidget from "../components/prescriptions/allPrescriptionsWidget.tsx";
import Loading from "../components/loading.tsx";
import './patientDetails.css'

const PatientDetails: React.FC = () => {
  const params = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [doctor, setDoctor] = useState<Doctor[]>();
  const [institute, setInstitute] = useState<Institute>();
  const [permissions, setPermissions] = useState<Permissions>();
  const [currentPrescription, setCurrentPrescription] = useState<Prescription>();
  const [currentUser, setCurrentUser] = useState<User>();
  const [allPrescriptions, setAllPrescriptions] = useState<Prescription[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [file, setUploadFile] = useState<File>();
  const [pageReady, setPageReady] = useState<boolean>(false);
  const [addFileDisable, setAddFileDisable] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/patients/getPatientFromId", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ patientId: params.patientId }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setPatient(data))
      .catch((error) => {
        throw error;
      });

    fetch("http://localhost:3000/api/doctors/getDoctorFromPatientId", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ patientId: params.patientId }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((doctor) => {
        setDoctor(doctor);
      })
      .catch((error) => {
        throw error;
      });

    fetch("http://localhost:3000/api/institutes/getInstituteFromPatientId", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ patientId: params.patientId }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((institute) => setInstitute(institute))
      .catch((error) => {
        throw error;
      });

    fetch("http://localhost:3000/api/users/getCurrentUserPermissions", { method: "GET", credentials: "include", headers: { "Content-type": "application/json" } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setPermissions(data))
      .catch((error) => {
        throw error;
      });

    fetch("http://localhost:3000/api/auth/getCurrentUser", { method: "GET", credentials: "include", headers: { "Content-type": "application/json" } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setCurrentUser(data.user));

    fetch("http://localhost:3000/api/prescriptions/getAllByPatientId", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ patientId: params.patientId }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          const reversedPresc = data.reverse();
          setCurrentPrescription(reversedPresc[0]);
          setAllPrescriptions(reversedPresc);
        }
        setPageReady(true);
      })
      .catch((error) => {
        alert(error);
      });
  }, [refresh]);

  const handleSubmit = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (e.target.files) {
      setUploadFile(e.target.files[0]);
      setAddFileDisable(false);
    }
  }, []);

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("prescription", file);
    formData.append("patientId", String(params.patientId));

    const uploadRes = await fetch("http://localhost:3000/api/prescriptions/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (!uploadRes.ok) {
      alert("Upload failed, wrong file type.");
      return;
    }

    const data = await uploadRes.json();
    const id = data.insertId;

    fetch("http://localhost:3000/api/prescriptionDosage/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ prescriptionId: id }),
    }).then(() => {
      setRefresh((v) => !v);
      setAddFileDisable(true);
    });
  };

  return (
    <div id="patientDetailRoot" className="container-fluid">
      <Header />
      {pageReady ? (
        <div className="row">
          <div className="col-12 col-lg-1 d-flex flex-column align-items-center">
            <div className="d-flex flex-row flex-lg-column">
              <Link to="/patients" className="btn w-100">
                <IoIosArrowRoundBack size={40} />
              </Link>
              <button className="btn w-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                <BsFileEarmarkPerson color="#1f7bd1ff" size={30} data-tooltip-id="mediFlowTooltip" data-tooltip-content="Patient details" />
              </button>
              <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-flex flex-column gap-4">
                  {patient && <PatientDetailsWidget patientId={params.patientId} patient={patient} permissions={permissions} refreshHandler={setRefresh} />}
                  {doctor && <DoctorDetailsWidget patientId={params.patientId} doctor={doctor} permissions={permissions} refreshHandler={setRefresh} />}
                  {institute && <InstituteDetailsWidget patientId={params.patientId} institute={institute} permissions={permissions} refreshHandler={setRefresh} />}{" "}
                </div>
              </div>
              {patient?.active ? <ConfirmArchiveModal patient={patient} /> : null}
            </div>
            <div>
              {allPrescriptions && <AllPrescriptionsWidget prescriptions={allPrescriptions} currentPrescriptionHandler={setCurrentPrescription} />}
            </div>
          </div>
          <div className="col-lg-11 d-flex flex-column justify-content-cet align-items-center main-font">
            <h5 className="main-font fs-light">{patient.patient_firstname} {patient.patient_secondname}</h5>
            <div className="main-font fs-light">{patient.gender} {patient.birth_date}</div>
            {Boolean(permissions?.create_prescription) && (
              <div className="d-flex gap-3 py-3 align-items-center">
                <form className="d-flex flex-column justify-content-center align-items-center gap-2 p-4 rounded-4 shadow" id="fileForm">
                  <label htmlFor="fileInput" id="fileLabel" >
                    <div className="d-flex gap-2 align-items-center">
                      <HiOutlineUpload size={30} /> Upload Prescription
                    </div>
                  </label>
                  <input id="fileInput" type="file" accept="image/*" onChange={handleSubmit} style={{ display: "none" }} />{" "}
                  {!addFileDisable && (
                    <>
                      <div>{file.name}</div>
                      <button className="btn bg-light-blue text-light" type="submit" onClick={handleUpload}>
                        Add prescription
                      </button>
                    </>
                  )}
                </form>
              </div>
            )}
            {currentPrescription ? <CurrentPrescriptionWidget currentPrescription={currentPrescription} permissions={permissions} currentUser={currentUser} /> : null}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default PatientDetails;
