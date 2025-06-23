import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connexion from "./vues/connexion";

const App = () => {

  return (
    <div className="container-fluid p-0 m-0">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Connexion />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
