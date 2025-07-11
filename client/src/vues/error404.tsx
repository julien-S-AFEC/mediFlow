import { Link } from 'react-router-dom';
import React from 'react';

const Error404: React.FC = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-white text-dark">
            <div className="text-center border shadow p-5 rounded bg-light">
                <h1 className="display-1 fw-bold text-success">404</h1>
                <p className="fs-3 text-primary">Page Not Found</p>
                <p className="lead text-secondary">
                    Sorry, the page you are looking for doesn't exist or has been moved.
                </p>
                <Link to="/dashboard" className="btn btn-outline-success mt-3 px-4">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Error404;
