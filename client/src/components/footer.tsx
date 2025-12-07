import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className={`py-4 mt-5 border-top shadow-sm w-100 mt-auto mb-0 footer-root`}>
      <div className="container text-center">
        <div className="text-muted main-font" style={{ fontSize: "1rem" }}>
          MediFlow,
          <span className="fw-semibold">by le J</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
