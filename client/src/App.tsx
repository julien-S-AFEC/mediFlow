import { BrowserRouter, Routes, Route } from "react-router-dom";
import NeedLogginRoute from "./vues/needLoggedRoute";
import Connexion from "./vues/auth/connexion";
import Register from "./vues/auth/register";
import Dashboard from "./vues/dashboard";
import Patients from "./vues/patients";
import PatientDetails from "./vues/patientDetails";
import Institutes from "./vues/institutes";
import InstituteDetails from "./vues/instituteDetails";
import Doctors from "./vues/doctors";
import ArchivedPatients from "./vues/archivedPatients";
import PrescriptionView from "./vues/prescriptionView";
import UserManagement from "./vues/userManagement";
import Error404 from "./vues/error404";
import DoctorDetails from "./vues/doctorDetails";
import { Tooltip } from "react-tooltip";
import PassLost from "./vues/password/passLost";
import ResetPassword from "./vues/password/resetPassword";
import Settings from "./vues/settings";
import EmailVerified from "./vues/auth/emailVerified";

const App = () => {
  return (
    <div className="container-fluid p-0 m-0">
      <Tooltip id="mediFlowTooltip" variant="info" delayShow={500} border={"19px"} opacity={90}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Connexion />}></Route>
          <Route path="/connexion" element={<Connexion />}></Route>
          <Route path="/emailVerified/:token" element={<EmailVerified />}></Route>
          <Route path="/passLost" element={<PassLost />}></Route>
          <Route path="/resetPassword/:token" element={<ResetPassword />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/settings" element={<Settings />}></Route>

          <Route
            path="/dashboard"
            element={
              <NeedLogginRoute>
                <Dashboard />
              </NeedLogginRoute>
            }
          ></Route>

          <Route
            path="/patients"
            element={
              <NeedLogginRoute>
                <Patients />
              </NeedLogginRoute>
            }
          ></Route>

          <Route
            path="/patientDetails/:patientId"
            element={
              <NeedLogginRoute>
                <PatientDetails />
              </NeedLogginRoute>
            }
          ></Route>

          <Route
            path="/patientDetails/:patientId/prescriptionView/:fileId"
            element={
              <NeedLogginRoute>
                <PrescriptionView />
              </NeedLogginRoute>
            }
          ></Route>

          <Route
            path="/institutes"
            element={
              <NeedLogginRoute>
                <Institutes />
              </NeedLogginRoute>
            }
          ></Route>

          <Route
            path="/instituteDetails/:instituteId"
            element={
              <NeedLogginRoute>
                <InstituteDetails />
              </NeedLogginRoute>
            }
          ></Route>

          <Route
            path="/doctors"
            element={
              <NeedLogginRoute>
                <Doctors />
              </NeedLogginRoute>
            }
          ></Route>

          <Route
            path="/doctorDetails/:doctorId"
            element={
              <NeedLogginRoute>
                <DoctorDetails />
              </NeedLogginRoute>
            }
          ></Route>

          <Route
            path="/archivedPatients"
            element={
              <NeedLogginRoute>
                <ArchivedPatients />
              </NeedLogginRoute>
            }
          ></Route>

          <Route
            path="/userManagement"
            element={
              <NeedLogginRoute>
                <UserManagement />
              </NeedLogginRoute>
            }
          ></Route>

          <Route path="/*" element={<Error404 />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
