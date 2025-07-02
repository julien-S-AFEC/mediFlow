import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status" aria-label="Loading...">
            </div>
        </div>
    )
}

export default Loader