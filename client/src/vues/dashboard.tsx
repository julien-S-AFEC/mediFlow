import DashboardTable from "../components/dashboardTable"
import Header from "../components/header"

const Dashboard = () => {
    return (<>
        <Header />
        <div className="container mt-5">
            <DashboardTable />
        </div>
    </>
    )
}

export default Dashboard