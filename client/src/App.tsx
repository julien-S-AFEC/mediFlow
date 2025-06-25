import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connexion from "./vues/connexion";
import CreateAcount from "./vues/createAcount";

const App = () => {
  return (
    <div className="container-fluid p-0 m-0">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Connexion />}></Route>
          <Route path="/createAcount" element={<CreateAcount />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
