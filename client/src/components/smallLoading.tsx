import { FaPrescriptionBottleAlt } from "react-icons/fa";
import './smallLoading.css'

const SmallLoading = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-transparent fade-in my-4">
            <FaPrescriptionBottleAlt className="text-success mb-3 bounce" size={30} />
            <div className="d-flex align-items-center gap-3">
                <div className="spinner-border text-success" role="status">
                </div>
                <span className="fs-7 text-secondary">Loading ...</span>
            </div>
        </div>
    );
};

export default SmallLoading;
