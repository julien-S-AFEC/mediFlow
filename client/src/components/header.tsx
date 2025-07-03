import { Link } from "react-router-dom"

const Header = () => {
    const logOut = () => {
        fetch('http://localhost:3000/api/auth/logOut', { method: "GET", headers: { "Content-type": "application/json" }, credentials: "include" })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <nav className="navbar navbar-expand-lg bg-blue-color px-5 py-2 rounded-bottom-4 w-100">
            <div className="container-fluid">
                <div className="navbar-brand p-0">
                    <Link to="/">
                        <img src="/logos/logo_shaded.png" alt="mediflow-logo" className="p-0" style={{ width: '5rem', height: '5rem' }} />
                    </Link>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to='/' onClick={logOut}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/dashboard' onClick={logOut}>Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/' onClick={logOut}>Log out</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav >
    )
}

export default Header