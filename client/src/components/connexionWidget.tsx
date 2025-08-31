
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

const ConnexionWidget = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorOpacity, setErrorOpacity] = useState<string>('0')
  const [errorText, setErrorText] = useState<string>()

  const navigate = useNavigate()

  const changeEmailTxt = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }, [])

  const changePasswordTxt = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
  }, [])

  const tryToLog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ "email": email, "password": password })
    })
      .then(res => {
        if (res.ok) {
          navigate('/dashboard')
        }
        else {
          return res.json()
        }
      })
      .then(err => {
        if (err) {
          setErrorOpacity('100')
          setErrorText(err)
        }
      })
  }

  return (
    <>
      <div className="col-3"></div>
      <div className="col-md-6 col-10">
        <div
          className="d-flex flex-column border align-items-center p-2 rounded-3 shadow"
          style={{ marginTop: "5rem", backgroundColor: "rgba(200, 200, 200, .6)" }}
        >
          <h3 className="mt-3 main-font">Connexion</h3>
          {errorOpacity
            &&
            <div className={`d-flex p-2 gap-3 opacity-${errorOpacity}`}>
              <div>{errorText}</div>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setErrorOpacity('0')}></button>
            </div>}
          <form action="#" name="connexion-form" className="d-flex flex-column justify-content-center align-items-center gap-2 w-100">
            <div className="d-flex flex-column w-75">
              <label htmlFor="exmailInput" className="main-font fw-light">Email</label>
            </div>
            <input type="text" value={email} onChange={changeEmailTxt} className="form-control w-75" id="exmailInput" placeholder="name@example.com" />
            <div className="d-flex flex-column w-75">
              <label htmlFor="passwordInput" className="main-font fw-light">Password</label>
            </div>
            <input type="password" value={password} onChange={changePasswordTxt} className="form-control w-75" id="passwordInput" />
            <button className="btn btn-primary mt-2" onClick={tryToLog}>Connect</button>
          </form>
          <div className="d-flex w-100 pt-3 justify-content-end">
            <Link to='/register' className="mx-2 text text-decoration-underline main-font fw-light">I dont have an account</Link>
            <Link to='/passLost' className="mx-2 text text-decoration-underline main-font fw-light">I dont remember my password</Link>
          </div>
        </div>
      </div>
      <div className="col-3"></div>
    </>
  );
};

export default ConnexionWidget;
