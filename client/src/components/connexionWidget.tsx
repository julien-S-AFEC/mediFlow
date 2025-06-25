
import { Link } from "react-router-dom";

const ConnexionWidget = () => {
  return (
    <div className="d-flex flex-column w-75 w-sm-100">
      <div
        className="d-flex flex-column border align-items-center p-2 rounded-3 shadow"
        style={{ marginTop: "5rem", backdropFilter: "blur(10px)", backgroundColor: "rgba(200, 200, 200, .4)" }}
      >
        <h3 className="mt-3 main-font">Connexion</h3>
        <form action="POST" name="connexion-form" className="d-flex flex-column justify-content-center align-items-center gap-2 mt-3 w-100">
          <label htmlFor="exmailInput" className="main-font fw-light">Email</label>
          <input type="text" className="form-control w-75" id="exmailInput" placeholder="name@example.com" />
          <label htmlFor="passwordInput" className="main-font fw-light">Password</label>
          <input type="password" className="form-control w-75" id="passwordInput" />
          <button className="btn btn-primary mt-2">Se connecter</button>
        </form>
        <div className="d-flex w-100 pt-5">
          <Link to='createAcount' className="justify-self-end mx-2 text text-decoration-underline main-font fw-light">Je n'ai pas de compte</Link>
        </div>
      </div>
    </div>
  );
};

export default ConnexionWidget;
