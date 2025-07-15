import { FaPrescriptionBottleAlt } from "react-icons/fa";
import './loading.css'

const Loading = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light fade-in">
            <FaPrescriptionBottleAlt className="text-success mb-3 bounce" size={60} />
            <div className="d-flex align-items-center gap-3">
                <div className="spinner-border text-success" role="status">
                </div>
                <span className="fs-5 text-secondary">Loading ...</span>
            </div>
        </div>
    );
};

export default Loading;
