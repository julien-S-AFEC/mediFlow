import React, { useCallback, useEffect, useState } from "react";
import { Doctor, Institute, Patient, Permissions, Prescription } from "../types";
import { Link, useParams } from "react-router-dom";
import PatientDetailsWidget from "../components/patients/patientDetailsWidget.tsx";
import DoctorDetailsWidget from "../components/doctors/doctorDetailsWidget.tsx";
import InstituteDetailsWidget from "../components/institutes/instituteDetailsWidget.tsx";
import Header from "../components/header";
import ConfirmArchiveModal from "../components/confirmArchiveModal.tsx";
import { Outlet } from 'react-router-dom';

const PatientDetails: React.FC = () => {
  const params = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [doctor, setDoctor] = useState<Doctor[]>();
  const [institute, setInstitute] = useState<Institute>();
  const [permissions, setPermissions] = useState<Permissions>();
  const [currentDescription, setCurrentPrescription] = useState<Prescription>();
  const [oldPrescriptions, setOldPrescriptions] = useState<Prescription[]>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [file, setUploadFile] = useState<any>({});

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
      .then(data => setPatient(JSON.parse(data)))
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
        setDoctor(JSON.parse(doctor));
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
      .then((institute) => setInstitute(JSON.parse(institute)))
      .catch((error) => {
        throw error;
      });

    fetch("http://localhost:3000/api/users/getCurrentUserPermissions", { method: "GET", credentials: "include", headers: { "Content-type": "application/json" } })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setPermissions(JSON.parse(data)))
      .catch((error) => {
        throw error;
      });

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
        const reversedPresc = JSON.parse(data).reverse();
        setCurrentPrescription(reversedPresc[0])
        setOldPrescriptions(reversedPresc.slice(1, reversedPresc.length))
      })

      .catch((error) => {
        throw error;
      });
  }, [refresh]);

  const handleSubmit = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (e.target.files) {
      setUploadFile(e.target.files[0])
    }
  }, [])

  const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("prescription", file);
    formData.append("patientId", String(params.patientId));

    fetch("http://localhost:3000/api/prescriptions/upload", {
      method: "POST",
      body: formData,
    })
      .then(() => setRefresh(oldValue => !oldValue))
      .catch(() => alert("Upload failed"));
  }

  return (
    <>
      <Header />
      <div className="container-fluid">
        <Link to="/dashboard" className="btn btn-primary">
          Back
        </Link>
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="row gap-2">
              <div className="col-lg-2 mt-3">
                {oldPrescriptions &&
                  oldPrescriptions.map((prescription) => {
                    return (
                      <Link to={`prescriptionView/${prescription.id}`} key={prescription.created_at}>
                        <img className="img img-fluid my-2"
                          style={{ maxWidth: "100px" }}
                          src={`http://localhost:3000/${prescription.file_path}`} alt="" />
                      </Link>
                    )
                  })}
              </div>
              <div className="col-lg-9 d-flex flex-column justify-content-center align-items-center">
                <div className="py-3 px-5 border rounded">
                  <label className="py-1" htmlFor="imgForm">
                    Upload a prescription
                  </label>
                  <form className="d-flex flex-column justify-content-center align-items-center gap-3">
                    <input type="file" accept="image/*" onChange={handleSubmit} />
                    <button className="btn btn-primary" type="submit" onClick={handleUpload}>
                      Submit
                    </button>
                  </form>
                </div>
                {currentDescription
                  && <Link to={`prescriptionView/${currentDescription.id}`} key={currentDescription.created_at}>
                    <img className="img img-fluid my-5" style={{ maxWidth: "500px" }} key={currentDescription.id} src={`http://localhost:3000/${currentDescription.file_path}`} alt="" />
                  </Link>
                }
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            {patient ? (
              <div className="d-flex flex-column gap-3">
                {patient && <PatientDetailsWidget patientId={params.patientId} patient={patient} permissions={permissions} refreshHandler={setRefresh} />}
                {doctor && <DoctorDetailsWidget patientId={params.patientId} doctor={doctor} permissions={permissions} refreshHandler={setRefresh} />}
                {institute && <InstituteDetailsWidget patientId={params.patientId} institute={institute} permissions={permissions} refreshHandler={setRefresh} />}
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
                <div className="spinner-border text-primary" role="status" aria-label="Loading..."></div>
              </div>
            )}

            <div className="d-flex justify-content-center align-items-center my-3">
              {
                patient?.active ?
                  <ConfirmArchiveModal patient={patient} />
                  : null
              }
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default PatientDetails;
