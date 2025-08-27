import { useState } from "react"
import UserAccount from "../components/users/userAccount"
import { Link } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io"
import Header from "../components/header"
import DisplayWidget from "../components/displayWidget"

const Settings: React.FC = () => {
    const [widgetVis, setWidgetVis] = useState<number>(1)

    return (
        <div className="container-fluid">
            <Header/>
            <div className="row p-3">
                <div className="col-lg-2 d-flex flex-column gap-1 justify-content-start align-items-center border-end" >
                    <Link to="/dashboard" className="btn w-100">
                        <IoIosArrowRoundBack size={40} />
                    </Link>
                    <div className="btn btn-primary w-100 mt-3" onClick={() => setWidgetVis(1)}>Account</div>
                    <div className="btn btn-primary w-100 mt-3" onClick={() => setWidgetVis(2)}>Display</div>
                </div>
                <div className="col-lg-10 d-flex flex-column justify-content-start align-items-center p-5">
                    {widgetVis === 1 && <div className="d-flex flex-column align-items-center">
                        <h4 className="main-font fs-light">Account</h4>
                        <UserAccount />
                    </div>}
                    {widgetVis === 2 && <DisplayWidget/>}
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    )
}

export default Settings
