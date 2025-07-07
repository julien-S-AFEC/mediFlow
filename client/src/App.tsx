import { BrowserRouter, Routes, Route } from "react-router-dom";

import NeedLogginRoute from "./vues/needLoggedRoute";
import Connexion from "./vues/connexion";
import Register from "./vues/register";
import Dashboard from "./vues/dashboard";
import PatientDetails from "./vues/patientDetails";
import Institutes from "./vues/institutes";
import Doctors from "./vues/doctors";
import Error404 from "./vues/error404";

const App = () => {
  return (
    <div className="container-fluid p-0 m-0">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Connexion />}></Route>
          <Route path="/connexion" element={<Connexion />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route
            path="/dashboard"
            element={
              <NeedLogginRoute>
              <Dashboard />
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
            path="/institutes"
            element={
              <NeedLogginRoute>
              <Institutes />
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

          <Route path="/*" element={<Error404 />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
