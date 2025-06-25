import React, { useEffect, useState } from "react";
import ConnexionWidget from "../components/connexionWidget";

const Connexion: React.FC = () => {
  const [isTranslated, setIstranslated] = useState<string>("translateY(-50%)");
  const [backZomm, setBackZoom] = useState<string>("transform: scale(1.0); transform-origin: 0 0;");

  const translateBg = (): void => {
    if (window.innerWidth >= 992) {
      setIstranslated("translateY(-50%)");
      setBackZoom("transform-scale-100");
    } else {
      setIstranslated("none");
      setBackZoom("transition-transform-scale-150");
    }
  };

  useEffect(() => {
    addEventListener("resize", translateBg);

    return () => {
      removeEventListener("resize", translateBg);
    };
  }, []);

  const transformP: string = window.innerWidth >= 992 ? "translateY(-50%)" : "none";
  console.log(transformP);

  return (
    <div className="d-flex flex-column align-items-center justify-items-center">
      <img src="src/assets/img/connexion_back.jpg" alt="connexion_back_img" className={`position-absolute justify-self-center w-100`} style={{ zIndex: -1, transform: isTranslated, transform: backSize }} />
      <div className="d-flex flex-lg-row flex-column mx-5 gap-xl-5 gap-md-2 align-items-center">
        <img src="src/assets/logos/logo_bordered.png" alt="mediflow-logo" style={{ width: "5rem" }} />
        <div className="main-font fs-3 fw-semibold">
          MediFlow, <span className="main-font fs-3 fw-light">simplify patient care, streamline prescription</span>
        </div>
      </div>
      <ConnexionWidget />
    </div>
  );
};
export default Connexion;
