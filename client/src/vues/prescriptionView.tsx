import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const PrescriptionView: React.FC = () => {
  const params = useParams();
  const prescriptionId = params.fileId;
  const patientId = params.patientId;
  const [path, setPath] = useState<string>();

  useEffect(() => {
    fetch("http://localhost:3000/api/prescriptions/getById", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ prescriptionId }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setPath(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="d-flex flex-column gap-5 justify-content-center align-items-center my-5">
      <Link className="btn btn-primary" to={`/patientDetails/${patientId}`}>
        <IoMdArrowRoundBack />
      </Link>
      <img className="img img-fluid" src={`http://localhost:3000/${path}`} alt="" />
    </div>
  );
};

export default PrescriptionView;
