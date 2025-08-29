import React, { useCallback, useEffect, useState } from "react";
import ConnexionWidget from "../../components/connexionWidget";

const Connexion: React.FC = () => {
  const [scaled, setIsScalled] = useState<string>("translateY(-50%) scale(100%)");

  const adaptBG = useCallback((): void => {
    setIsScalled(window.innerWidth >= 900 ? "translateY(-40%) scale(100%)" : "");
  }, [])

  useEffect(() => {
    adaptBG();
    addEventListener("resize", adaptBG);

    return () => {
      removeEventListener("resize", adaptBG);
    };
  }, []);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="col-12">
        <img src="/img/connexion_back_mobile.jpg" alt="connexion_back_img" className='img img-fluid position-absolute m-0 p-0' style={{ width: "100vw", zIndex: -1, transform: scaled }} />
      </div>
      <div className="col-12 mt-3 text-center justify-items-center align-items-center">
        <img src="/logos/logo_bordered.png" alt="mediflow-logo" style={{ width: "5rem" }} />
        <div className="main-font fs-3 fw-semibold">
          MediFlow, <span className="main-font fs-3 fw-light">simplify patient care, streamline prescription</span>
        </div>
      </div>
      <ConnexionWidget />
    </div>
  );
};

export default Connexion;
