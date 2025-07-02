import { useState } from "react";

const UserCreationWidget = () => {
  const [firstNameText, setFirstNameText] = useState<string>("");
  const [secondNameText, setSecondNameText] = useState<string>("");
  const [genderText, setGenderText] = useState<string>("Male");
  const [ageText, setAgeText] = useState<string>("0");
  const [addressText, setAddresText] = useState<string>("");
  const [emailText, setEmailText] = useState<string>("");
  const [insuranceText, setInsuranceText] = useState<string>("");
  const [instituteText, setInstituteText] = useState<string>("");
  const [doctorText, setDoctorText] = useState<string>("");

  const createPatient = (e): void => {
    e.preventDefault();
    fetch("http://localhost:3000/api/patients/createPatient", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        firstNameText: firstNameText,
        secondNameText: secondNameText,
        genderText: genderText,
        ageText: ageText,
        addressText: addressText,
        emailText: emailText,
        insuranceText: insuranceText,
        instituteText: instituteText,
        doctorText: doctorText,
      }),
    });
  };

  return (
    <>
      <div className="row align-items-center">
        <div className="col-4 pt-5">
          <label htmlFor="exampleFormControlInput1" className="form-label main-font fw-light">
            Firstname
          </label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Eva" value={firstNameText} onChange={(e) => setFirstNameText(e.target.value)} />
        </div>
        <div className="col-4 pt-5">
          <label htmlFor="exampleFormControlInput1" className="form-label main-font fw-light">
            Secondname
          </label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Green" value={secondNameText} onChange={(e) => setSecondNameText(e.target.value)} />
        </div>
        <div className="col-4 pt-5">
          <label htmlFor="exampleFormControlInput1" className="form-label main-font fw-light">
            Gender
          </label>
          <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {genderText}
            </button>
            <ul className="dropdown-menu dropdown-menu overflow-auto" style={{ maxHeight: "200px" }}>
              <li className="dropdown-item" onClick={() => setGenderText("Male")}>
                Male
              </li>
              <li className="dropdown-item" onClick={() => setGenderText("Female")}>
                Female
              </li>
            </ul>
          </div>
        </div>
        <div className="col-4 pt-5">
          <label htmlFor="exampleFormControlInput1" className="form-label main-font fw-light">
            Age
          </label>
          <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {ageText}
            </button>
            <ul className="dropdown-menu dropdown-menu overflow-auto" style={{ maxHeight: "200px" }}>
              {Array.from({ length: 130 }, (_, age) => (
                <li key={age}>
                  <button className="dropdown-item" type="button" onClick={() => setAgeText(age.toString())}>
                    {age}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-4 pt-5">
          <label htmlFor="exampleFormControlInput1" className="form-label main-font fw-light">
            Adress
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="83 Camden High Street, London NW1 7JL, United Kingdom"
            value={addressText}
            onChange={(e) => setAddresText(e.target.value)}
          />
        </div>
        <div className="col-4 pt-5">
          <label htmlFor="exampleFormControlInput1" className="form-label main-font fw-light">
            Email address
          </label>
          <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="evaGreen@gmail.com" value={emailText} onChange={(e) => setEmailText(e.target.value)} />
        </div>
        <div className="col-4 pt-5">
          <label htmlFor="exampleFormControlInput1" className="form-label main-font fw-light">
            Insurance number
          </label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="1234567891234" value={insuranceText} onChange={(e) => setInsuranceText(e.target.value)} />
        </div>
        <div className="col-4 pt-5">
          <label htmlFor="exampleFormControlInput1" className="form-label main-font fw-light">
            Institute
          </label>
          <textarea className="form-control" id="exampleFormControlInput1" placeholder="Les lilas" value={instituteText} onChange={(e) => setInstituteText(e.target.value)} />
        </div>
        <div className="col-4 pt-5">
          <label htmlFor="exampleFormControlInput1" className="form-label main-font fw-light">
            Doctor
          </label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Dr Feelgood" value={doctorText} onChange={(e) => setDoctorText(e.target.value)} />
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="btn btn-primary mt-5" onClick={createPatient}>
          Accept
        </div>
      </div>
    </>
  );
};

export default UserCreationWidget;
