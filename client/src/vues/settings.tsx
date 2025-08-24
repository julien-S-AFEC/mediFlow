import { useState } from "react"
import { User } from "../types"
import UserAccount from "../components/users/userAccount"

const Settings: React.FC = () => {
    const [widgetVis, setWidgetVis] = useState<Number>(1)


    return (
        <div className="container-fluid">
            <div className="row p-3">
                <div className="col-2 d-flex flex-column gap-2 justify-content-start align-items-center border-end" style={{ minHeight: '100vh' }}>
                    <div className="btn btn-primary w-100 mt-3" onClick={() => setWidgetVis(1)}>Account</div>
                    <div className="btn btn-primary w-100 mt-3" onClick={() => setWidgetVis(2)}>Display</div>
                </div>
                <div className="col-2"></div>
                <div className="col-6 d-flex flex-column justify-content-start align-items-center border shadow p-5 mt-5">
                    {widgetVis === 1 && <UserAccount />}
                    {widgetVis === 2 && <div>display</div>}
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    )
}

export default Settings
