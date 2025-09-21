import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmailVerified: React.FC = () => {
  const params = useParams();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/users/verifyEmail", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ token: params.token }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data.status === "success") {
          setSuccess(true);
        }
      })
      .catch(error => {
        console.log(error)
      })
  }, []);

  return (
    <div className="container text-center mt-5">
      {success ? (
        <div className="d-flex flex-column gap-3">
          <div>Email successfully verified</div>
          <div>
            <Link className="btn btn-primary" to={"/connexion"}>
              Connect to mediflow
            </Link>
          </div>
        </div>
      ) : (
        <div>An error has occured, the mail can't be verified</div>
      )}
    </div>
  );
};

export default EmailVerified;
