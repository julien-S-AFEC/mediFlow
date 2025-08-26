import React, { useCallback, useEffect, useState } from "react"
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const PassLost: React.FC = () => {
    const [scaled, setIsScalled] = useState<string>("translateY(-50%) scale(100%)");
    const [email, setEmail] = useState('')
    const [errorOpacity, setErrorOpacity] = useState<string>('0')
    const [errorText, setErrorText] = useState<string>()
    const [success, setSuccess] = useState<boolean>(false)

    const adaptBG = useCallback((): void => {
        setIsScalled(window.innerWidth >= 900 ? "translateY(-40%) scale(100%)" : "");
    }, [])

    useEffect(() => {
        adaptBG();
        addEventListener("resize", adaptBG);

        return () => {
            removeEventListener("resize", adaptBG);
        };
    }, []);

    const sendResetPass = (e) => {
        e.preventDefault()
        if (!e.target.checkValidity()) {
            e.target.reportValidity();
            return;
        }
        fetch('http://localhost:3000/api/users/sendResetPasswordEmail', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ "email": email })
        })
            .then(res => {
                if (res.ok) {
                    setSuccess(true)
                }

            })
            .catch(err => {
                setErrorOpacity('100')
                setErrorText(err)
            })

        setSuccess(true)
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div className="col-12">
                <img src="/img/connexion_back_mobile.jpg" alt="connexion_back_img" className='img img-fluid position-absolute m-0 p-0' style={{ width: "100vw", zIndex: -1, transform: scaled }} />
            </div>
            <div className="col-12 mt-3 text-center justify-items-center align-items-center">
                <img src="/logos/logo_bordered.png" alt="mediflow-logo" style={{ width: "5rem" }} />
                <div className="main-font fs-3 fw-semibold">
                    MediFlow, <span className="main-font fs-3 fw-light">simplify patient care, streamline prescription</span>
                </div>
            </div>
            {errorOpacity
                &&
                <div className={`d-flex p-2 gap-3 opacity-${errorOpacity}`}>
                    <div>{errorText}</div>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setErrorOpacity('0')}></button>
                </div>}
            {!success ?
                <>
                    <h3 className="fw-light mt-5">Reset my password</h3>
                    <form action="#" onSubmit={sendResetPass} name="connexion-form" className="d-flex flex-column justify-content-center align-items-center gap-2 p-3 shadow rounded mt-3 w-50">
                        <div className="d-flex flex-column">
                            <label htmlFor="exmailInput" className="main-font fw-light">Email</label>
                        </div>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control w-75" id="exmailInput" required placeholder="name@example.com" />
                        <div className="d-flex flex-column w-75">
                        </div>
                        <button type="submit" className="btn btn-primary mt-2">Reset my password</button>
                        <div className="d-flex w-100 pt-3 justify-content-end">
                            <Link to='/connexion' className="mx-2 text text-decoration-underline main-font fw-light">Connexion</Link>
                        </div>
                    </form>
                </>
                :
                <div className="d-flex flex-column gap-4 mt-3">
                    <h3 className="fw-light mt-5">Email successuffly sent. Please, go to you email to change your password.</h3>
                    <Link to={"/"} className="btn btn-primary"><FaHome /></Link>
                </div>
            }
        </div>
    );
};

export default PassLost