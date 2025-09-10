import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { Link, useParams } from "react-router-dom";
import { Institute, Patient } from "../types";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { IoIosArrowRoundBack } from "react-icons/io";

const InstituteDetails = () => {
  const [institute, setInstitute] = useState<Institute>();
  const [patients, setPatients] = useState<Patient[]>();
  const instituteId = useParams().instituteId;

  useEffect(() => {
    fetch("http://localhost:3000/api/institutes/getFromId", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({ instituteId: instituteId }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setInstitute(data));

    fetch("http://localhost:3000/api/patients/getPatientFromInstId", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({ instituteId: instituteId }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setPatients(data));
  }, []);

  return (
    <div className="container">
      <Header />
      <Link to="/institutes" className="btn align-self-start">
        <IoIosArrowRoundBack size={40} />
      </Link>
      <h4 className="main-font my-5 text-center">Patients related to this institute</h4>
      <div className="d-flex flex-column flex-md-row justify-content-around gap-5">
        <div className="d-flex flex-column main-font gap-3 w-100">
          <h4>Institute</h4>
          {institute && (
            <>
              <div>
                <div className="fs-5">Name</div>
                <div className="fw-light">{institute.institute_name}</div>
              </div>
              <div>
                <div className="fs-5">Addres</div>
                <div className="fw-light">{institute.institute_address}</div>
              </div>
              <div>
                <div className="fs-5">Phone number</div>
                <div className="fw-light">{institute.institute_phone_number}</div>
              </div>
            </>
          )}
        </div>
        <div className="d-flex flex-column main-font gap-3 align-items-center w-100">
          <h4>Patients registered in this institute</h4>
          {patients &&
            patients.map((patient) => (
              <div key={patient.patient_id}>
                <a
                  className="d-flex gap-2 justify-content-center text-decoration-none main-font text-dark test"
                  data-bs-toggle="collapse"
                  href={`#patientInfos${patient.patient_id}`}
                  role="button"
                  aria-expanded="false"
                  aria-controls={`patientInfos${patient.patient_id}`}
                >
                  <div>- {patient.patient_firstname}</div>
                  <div>{patient.patient_secondname}</div>
                </a>

                <div className="collapse mt-2" id={`patientInfos${patient.patient_id}`}>
                  <div className="d-flex flex-column gap-3 border shadow p-3 rounded">
                    <Link to={`/patientDetails/${patient.patient_id}`} className="align-self-center">
                      <BsFileEarmarkPerson color="#1f7bd1ff" size={30}  data-tooltip-id="mediFlowTooltip" data-tooltip-content="Patient profile"/>
                    </Link>

                    <div className="d-flex justify-content-between gap-5">
                      <div>Gender: </div>
                      <div>{patient.gender}</div>
                    </div>
                    <div className="d-flex justify-content-between gap-5">
                      <div>Birth date:</div>
                      <div>{new Date(patient.birth_date).toLocaleDateString()}</div>
                    </div>
                    <div className="d-flex justify-content-between gap-5">
                      <div>Address:</div>
                      <div>{patient.address}</div>
                    </div>
                    <div className="d-flex justify-content-between gap-5">
                      <div>Inssurance number:</div>
                      <div>{patient.insurance_number}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export default InstituteDetails;
