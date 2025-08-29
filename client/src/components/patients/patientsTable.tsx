import React, { useEffect, useState } from "react";
import { Patient } from "../../types.ts";
import { useNavigate } from "react-router-dom";
import Loading from "../loading.tsx";
import { filterPatient, sortByFirstname, sortBySecondname, sortByGender, sortByBirthDate, sortByAddress, sortByEmail, sortByInsuranceNumber, sortByInstituteName, sortById } from "../../utils.tsx";
import './patientTable.css'

type Iprops = {
  patients: Patient[];
  search: string;
};

const PatientTable: React.FC<Iprops> = ({ patients, search }) => {
  const navigate = useNavigate();
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(patients);
  const [sortByIdAscending, setSortByIdAscending] = useState<boolean>(true);
  const [sortByFirstnameAscending, setSortByFirstnameAscending] = useState<boolean>(true);
  const [sortBySecondnameAscending, setSortBySecondnameAscending] = useState<boolean>(true);
  const [sortByGenderAscending, setSortByGenderAscending] = useState<boolean>(true);
  const [sortByBirthdateAscending, setSortByBirthdateAscending] = useState<boolean>(true);
  const [sortByAddressAscending, setSortByAddressAscending] = useState<boolean>(true);
  const [sortByEmailAscending, setSortByEmailAscending] = useState<boolean>(true);
  const [sortByInsurranceAscending, setSortByInsurranceAscending] = useState<boolean>(true);
  const [sortByInstituteNameAscending, setSortByInstituteNameAscending] = useState<boolean>(true);
  const [mobile, setMobile] = useState<boolean>(false);

  useEffect(() => {
    setFilteredPatients(patients);
    setMobile(window.screen.width < 950);
  }, [patients]);

  return (
    <div className="table-responsive border rounded-5 mt-5 custom-table-container">
      <table className="table" >
        <thead>
          <tr>
            {!mobile && (
              <th
                className="main-font fw-light text-nowrap"
                scope="col"
                style={{ cursor: "pointer" }}
                onClick={() => sortById(filteredPatients, setFilteredPatients, sortByIdAscending, setSortByIdAscending)}
              >
                id
              </th>
            )}
            <th
              className="main-font fw-light text-nowrap"
              scope="col"
              style={{ cursor: "pointer" }}
              onClick={() => sortByFirstname(filteredPatients, setFilteredPatients, sortByFirstnameAscending, setSortByFirstnameAscending)}
            >
              Firstname
            </th>
            <th
              className="main-font fw-light text-nowrap"
              scope="col"
              style={{ cursor: "pointer" }}
              onClick={() => sortBySecondname(filteredPatients, setFilteredPatients, sortBySecondnameAscending, setSortBySecondnameAscending)}
            >
              Lastname
            </th>
            <th
              className="main-font fw-light text-nowrap"
              scope="col"
              style={{ cursor: "pointer" }}
              onClick={() => sortByGender(filteredPatients, setFilteredPatients, sortByGenderAscending, setSortByGenderAscending)}
            >
              Gender
            </th>
            <th
              className="main-font fw-light text-nowrap"
              scope="col"
              style={{ cursor: "pointer" }}
              onClick={() => sortByBirthDate(filteredPatients, setFilteredPatients, sortByBirthdateAscending, setSortByBirthdateAscending)}
            >
              Birth date
            </th>
            {!mobile && (
              <>
                <th
                  className="main-font fw-light text-nowrap"
                  scope="col"
                  style={{ cursor: "pointer" }}
                  onClick={() => sortByAddress(filteredPatients, setFilteredPatients, sortByAddressAscending, setSortByAddressAscending)}
                >
                  Adress
                </th>
                <th
                  className="main-font fw-light text-nowrap"
                  scope="col"
                  style={{ cursor: "pointer" }}
                  onClick={() => sortByEmail(filteredPatients, setFilteredPatients, sortByEmailAscending, setSortByEmailAscending)}
                >
                  Email
                </th>
                <th
                  className="main-font fw-light text-nowrap"
                  scope="col"
                  onClick={() => sortByInsuranceNumber(filteredPatients, setFilteredPatients, sortByInsurranceAscending, setSortByInsurranceAscending)}
                >
                  Insurrance number
                </th>
                <th
                  className="main-font fw-light text-nowrap"
                  scope="col"
                  onClick={() => sortByInstituteName(filteredPatients, setFilteredPatients, sortByInstituteNameAscending, setSortByInstituteNameAscending)}
                >
                  Institute
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredPatients ? (
            filteredPatients
              .filter((p) => p.active)
              .filter((p) => (search ? filterPatient(search, p) : p))
              .map((patient) => (
                <tr key={patient.patient_id} onClick={() => navigate(`/patientDetails/${patient.patient_id}`)} style={{ cursor: "pointer" }}>
                  {!mobile && <th scope="row">{patient.patient_id}</th>}
                  <td className="text-nowrap">{patient.patient_firstname}</td>
                  <td className="text-nowrap">{patient.patient_secondname}</td>
                  <td className="text-nowrap">{patient.gender}</td>
                  <td className="text-nowrap">{patient.birth_date}</td>
                  {!mobile && (
                    <>
                      <td className="text-nowrap">{patient.address}</td>
                      <td className="text-nowrap">{patient.email}</td>
                      <td className="text-nowrap">{patient.insurance_number}</td>
                      <td className="text-nowrap">{patient.institute_name || "Not provided"}</td>
                    </>
                  )}
                </tr>
              ))
          ) : (
            <Loading />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
