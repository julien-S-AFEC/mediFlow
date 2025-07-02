import { useEffect, useState } from "react"
import { Permissions } from '../types.ts';
import DashboardTable from "../components/dashboardTable"
import Header from "../components/header"
import OptionsWidget from "../components/optionsWidget"
import CreatePatient from "../vues/createPatient"

const Dashboard = () => {

    const [permissions, setPermissions] = useState<Permissions>()
    const [dashboardVisible, setDashboardVisible] = useState(true)

    useEffect(() => {
        fetch('http://localhost:3000/api/users/getCurrentUserPermissions', { method: 'GET', credentials: 'include', headers: { 'Content-type': 'application/json' } })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => setPermissions(data))
    }, [])

    return (<>
        <Header />
        <div className="container-fluid">
            <div className="d-flex">
                <OptionsWidget permissions={permissions} setDashboardVisibleHandler={setDashboardVisible} />
                {dashboardVisible 
                ? <DashboardTable permissions={permissions} />
                : <CreatePatient />}
            </div>
        </div>
    </>
    )
}

export default Dashboard