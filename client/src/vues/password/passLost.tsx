import React, { useCallback, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";

const PassLost: React.FC = () => {
  const [scaled, setIsScalled] = useState<string>("translateY(-50%) scale(100%)");
  const [email, setEmail] = useState("");
  const [errorOpacity, setErrorOpacity] = useState<string>("0");
  const [errorText, setErrorText] = useState<string>();
  const [success, setSuccessVis] = useState<boolean>(false)

  const adaptBG = useCallback((): void => {
    setIsScalled(window.innerWidth >= 900 ? "translateY(-40%) scale(100%)" : "");
  }, []);

  useEffect(() => {
    adaptBG();
    addEventListener("resize", adaptBG);

    return () => {
      removeEventListener("resize", adaptBG);
    };
  }, []);

  const checkifUserExists = () => {
    if (!email) {
      return;
    }

    fetch("http://localhost:3000/api/users/sendResetPasswordMail", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: email }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data && data.status === 'success') {
          setSuccessVis(true)
        } else {
          setErrorOpacity("100");
          setErrorText(data.message);
        }
      })
      .catch(error => {
        console.log(error)
      })
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="col-12">
        <img src="/img/connexion_back_mobile.jpg" alt="connexion_back_img" className="img img-fluid position-absolute m-0 p-0" style={{ width: "100vw", zIndex: -1, transform: scaled }} />
      </div>
      <div className="col-12 mt-3 text-center justify-items-center align-items-center">
        <img src="/logos/logo_bordered.png" alt="mediflow-logo" style={{ width: "5rem" }} />
        <div className="main-font fs-3 fw-semibold">
          MediFlow, <span className="main-font fs-3 fw-light">simplify patient care, streamline prescription</span>
        </div>
      </div>
      {errorOpacity && (
        <div className={`d-flex p-2 gap-3 opacity-${errorOpacity}`}>
          <div>{errorText}</div>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setErrorOpacity("0")}></button>
        </div>
      )}
      {!success ?
        <>
          <h3 className="fw-light mt-5">Reset my password</h3>
          <form
            action="#"
            name="connexion-form"
            className="d-flex flex-column justify-content-center align-items-center gap-2 p-3 shadow rounded mt-3 w-50"
            style={{ marginTop: "5rem", backgroundColor: "rgba(200, 200, 200, .6)" }}
          >
            <div className="d-flex flex-column">
              <label htmlFor="exmailInput" className="main-font fw-light">
                Email
              </label>
            </div>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control w-75" id="exmailInput" placeholder="name@example.com" />
            <div className="d-flex flex-column w-75"></div>
            <div className="btn btn-primary mt-2" onClick={checkifUserExists}>
              Reset my password
            </div>
            <div className="d-flex w-100 pt-3 justify-content-end">
              <Link to="/connexion" className="mx-2 text text-decoration-underline main-font fw-light">
                Connexion
              </Link>
            </div>
          </form>
        </>
        :
        <div className="d-flex flex-column">
          <div className="main-font">A verification email has been sent to {email}</div>
          <Link to={'/connexion'} className="btn btn-primary mt-3">Home</Link>
        </div>}
    </div>
  );
};

export default PassLost;
