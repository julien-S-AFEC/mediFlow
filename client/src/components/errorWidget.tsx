import React from "react";

type Iprops = {
    message: string;
};

const ErrorWidget: React.FC<Iprops> = ({ message }) => {
    return (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            {message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

        </div>
    );
};

export default ErrorWidget;
