import { useEffect, useState } from "react";
import { Institute } from "../types";

const UserCreationWidget = () => {
  const date = new Date()
  const [firstNameText, setFirstNameText] = useState<string>("");
  const [secondNameText, setSecondNameText] = useState<string>("");
  const [genderText, setGenderText] = useState<string>("Male");
  const [birthDateText, setBirthDateText] = useState<string>(date.toISOString().slice(0, 10));
  const [addressText, setAddresText] = useState<string>("");
  const [emailText, setEmailText] = useState<string>("");
  const [insuranceText, setInsuranceText] = useState<string>("");
  const [institutes, setInstitute] = useState<Institute[]>([]);
  const [instituteText, setInstituteText] = useState<string>("");
  const [doctorText, setDoctorText] = useState<string>("");
  const [reloadUi, setReloadUi] = useState<boolean>(false)

  useEffect(() => {
    fetch("http://localhost:3000/api/institutes/getAll", {
      method: 'GET',
      headers: { "Content-type": "application/js" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(data => setInstitute(JSON.parse(data)))
  }, [reloadUi])

  const createPatient = (): void => {
    fetch("http://localhost:3000/api/patients/createPatient", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        firstNameText: firstNameText,
        secondNameText: secondNameText,
        genderText: genderText,
        birthDateText: birthDateText,
        addressText: addressText,
        emailText: emailText,
        insuranceText: insuranceText,
        instituteText: instituteText.slice(0, 1),
        doctorText: doctorText,
      }),
    }).then(() => setReloadUi(oldValue => !oldValue))
  };

  return (
    <>
      <form action="#">
        <div className="row align-items-center">
          <div className="col-4 pt-5">
            <label htmlFor="exampleFormControlInput1" className="form-label main-font fw-light">
              Firstname
            </label>
            <input required type="text" className="form-control" id="exampleFormControlInput1" placeholder="Eva" value={firstNameText} onChange={(e) => setFirstNameText(e.target.value)} />
          </div>
          <div className="col-4 pt-5">
            <label htmlFor="exampleFormControlInput1" className="form-label main-font fw-light">
              Secondname
            </label>
            <input type="text" required className="form-control" id="exampleFormControlInput1" placeholder="Green" value={secondNameText} onChange={(e) => setSecondNameText(e.target.value)} />
          </div>
          <div className="col-4 pt-5">
            <label htmlFor="exampleFormControlInput1" className="form-label main-font fw-light">
              Gender
            </label>
            <div className="dropdown">
              <button className="btn dropdown-toggle bg-white text-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
              Birth date
            </label>
            <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="evaGreen@gmail.com" value={birthDateText} onChange={(e) => { setBirthDateText(e.target.value); console.log(e.target.value) }} />
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
            <div className="dropdown">
              <button className="btn dropdown-toggle bg-white text-dark" style={{ minWidth: "150px" }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {instituteText}
              </button>
              <ul className="dropdown-menu dropdown-menu overflow-auto" style={{ maxHeight: "200px" }}>
                {institutes.map(institute => {
                  return (
                    <li className="dropdown-item" key={institute.inst_id} onClick={() => setInstituteText(institute.inst_id + ' ' + institute.institute_name)}>
                      {institute.inst_id + ' ' + institute.institute_name}
                    </li>
                  )
                })}
              </ul>
            </div>        </div>
          <div className="col-4 pt-5">
            <label htmlFor="exampleFormControlInput1" className="form-label main-font fw-light">
              Doctor
            </label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Dr Feelgood" value={doctorText} onChange={(e) => setDoctorText(e.target.value)} />
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button type="submit" className="btn btn-primary mt-5" onClick={() => createPatient()}>
            Accept
          </button>
        </div>
      </form >
    </>
  );
};

export default UserCreationWidget;


{/* <select class="form-select" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select> */}