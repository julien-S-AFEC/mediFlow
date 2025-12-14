import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import ArchivedPatients from "./vues/archivedPatients";
import Connexion from "./vues/auth/connexion";
import EmailVerified from "./vues/auth/emailVerified";
import Register from "./vues/auth/register";
import Dashboard from "./vues/dashboard";
import DoctorDetails from "./vues/doctorDetails";
import Doctors from "./vues/doctors";
import Documentation from "./vues/Documentation";
import Error404 from "./vues/error404";
import InstituteDetails from "./vues/instituteDetails";
import Institutes from "./vues/institutes";
import NeedLogginRoute from "./vues/needLoggedRoute";
import PassLost from "./vues/password/passLost";
import ResetPassword from "./vues/password/resetPassword";
import PatientDetails from "./vues/patientDetails";
import Patients from "./vues/patients";
import PrescriptionView from "./vues/prescriptionView";
import Settings from "./vues/settings";
import ThemeProvider from "./vues/themeProvider";
import UserManagement from "./vues/userManagement";


const App = () => {

  return (
    <div className="container-fluid p-0 m-0">
      <Tooltip id="mediFlowTooltip" variant="info" delayShow={500} border={"19px"} opacity={90} />
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
              <ThemeProvider>
                <NeedLogginRoute>
                  <Dashboard />
                </NeedLogginRoute>
              </ThemeProvider>
            }
          ></Route>

          <Route
            path="/patients"
            element={
              <ThemeProvider>
                <NeedLogginRoute>
                  <Patients />
                </NeedLogginRoute>
              </ThemeProvider>
            }
          ></Route>

          <Route
            path="/patientDetails/:patientId"
            element={
              <ThemeProvider>
                <NeedLogginRoute>
                  <PatientDetails />
                </NeedLogginRoute>
              </ThemeProvider>
            }
          ></Route>

          <Route
            path="/patientDetails/:patientId/prescriptionView/:fileId"
            element={
              <ThemeProvider>
                <NeedLogginRoute>
                  <PrescriptionView />
                </NeedLogginRoute>
              </ThemeProvider>
            }
          ></Route>

          <Route
            path="/institutes"
            element={
              <ThemeProvider>
                <NeedLogginRoute>
                  <Institutes />
                </NeedLogginRoute>
              </ThemeProvider>
            }
          ></Route>

          <Route
            path="/instituteDetails/:instituteId"
            element={
              <ThemeProvider>
                <NeedLogginRoute>
                  <InstituteDetails />
                </NeedLogginRoute>
              </ThemeProvider>
            }
          ></Route>

          <Route
            path="/doctors"
            element={
              <ThemeProvider>
                <NeedLogginRoute>
                  <Doctors />
                </NeedLogginRoute>
              </ThemeProvider>
            }
          ></Route>

          <Route
            path="/doctorDetails/:doctorId"
            element={
              <ThemeProvider>
                <NeedLogginRoute>
                  <DoctorDetails />
                </NeedLogginRoute>
              </ThemeProvider>
            }
          ></Route>

          <Route
            path="/archivedPatients"
            element={
              <ThemeProvider>
                <NeedLogginRoute>
                  <ArchivedPatients />
                </NeedLogginRoute>
              </ThemeProvider>
            }
          ></Route>
          <Route
            path="/documentation"
            element={
              <ThemeProvider>
                <NeedLogginRoute>
                  <Documentation />
                </NeedLogginRoute>
              </ThemeProvider>
            }
          ></Route>

          <Route
            path="/userManagement"
            element={
              <ThemeProvider>
                <NeedLogginRoute>
                  <UserManagement />
                </NeedLogginRoute>
              </ThemeProvider>
            }
          ></Route>

          <Route path="/*" element={<Error404 />}></Route>
        </Routes>
      </BrowserRouter>
    </div >
  );
};

export default App;
