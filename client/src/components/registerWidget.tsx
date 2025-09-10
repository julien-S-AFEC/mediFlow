
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

const RegisterWidget = () => {

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [errorOpacity, setErrorOpacity] = useState<string>('0')
    const [errorText, setErrorText] = useState<string>()

    const navigate = useNavigate()

    const changeNameTxt = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }, [])

    const changeEmailTxt = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }, [])

    const changePasswordTxt = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }, [])

    const changeConfirmPasswordTxt = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }, [])


    const tryToSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!name || !email || !password || !confirmPassword) {
            setErrorOpacity('100')
            setErrorText("All the fields are required")
            return
        }
        if (password != confirmPassword) {
            setErrorOpacity('100')
            setErrorText("The passwords don't match")
            return
        }

        fetch('http://localhost:3000/api/users/registerUser', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ "name": name, "password": password, "email": email })
        })
            .then(res => {
                if (!res.ok) {
                    return res.json()
                        .then(err => {
                            setErrorOpacity('100')
                            setErrorText(err)
                        })
                }
                else {
                    navigate('/dashboard')
                }
            })
    }

    return (
        <>
            <div className="col-3"></div>

            <div className="col-md-6 col-12">
                <div
                    className="d-flex flex-column border align-items-center p-2 m-3 rounded-3 shadow"
                    style={{ marginTop: "5rem", backgroundColor: "rgba(200, 200, 200, .8)" }}
                >
                    <h3 className="mt-3 main-font">Inscription</h3>
                    {errorOpacity
                        &&
                        <div className={`d-flex p-2 gap-3 opacity-${errorOpacity}`}>
                            <div>{errorText}</div>
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => setErrorOpacity('0')}></button>
                        </div>}
                    <form action="#" name="connexion-form" className="d-flex flex-column justify-content-center align-items-center gap-2 w-100">
                        <div className="d-flex flex-column w-75">
                            <label htmlFor="nameInput" className="main-font fw-light text-start">Name</label>
                        </div>
                        <input type="text" value={name} onChange={changeNameTxt} className="form-control w-75" id="nameInput" placeholder="John Doe" />
                        <div className="d-flex flex-column w-75">
                            <label htmlFor="exmailInput" className="main-font fw-light">Email</label>
                        </div>
                        <input type="text" value={email} onChange={changeEmailTxt} className="form-control w-75" id="exmailInput" placeholder="johnDoe@example.com" />
                        <div className="d-flex flex-column w-75">
                            <label htmlFor="passwordInput" className="main-font fw-light">Password</label>
                        </div>
                        <input type="password" value={confirmPassword} onChange={changeConfirmPasswordTxt} className="form-control w-75" id="passwordInput" />
                        <div className="d-flex flex-column w-75">
                            <label htmlFor="confirmPasswordInput" className="main-font fw-light">Confirm password</label>
                        </div>
                        <input type="password" value={password} onChange={changePasswordTxt} className="form-control w-75" id="confirmPasswordInput" />
                        <button className="btn btn-primary mt-2" onClick={tryToSubscribe}>Subscribe</button>
                    </form>
                    <div className="d-flex w-100 pt-3 justify-content-end">
                        <Link to='/connexion' className="mx-2 text text-decoration-underline main-font fw-light">I already have an account</Link>
                    </div>
                </div>
            </div>
            <div className="col-3"></div>
        </>
    );
};

export default RegisterWidget;