import React from "react";

type Iprops = {
  stickyBot?: boolean;
};

const Footer: React.FC<Iprops> = ({ stickyBot = false }) => {
  return (
    <footer className={`bg-light py-4 border-top shadow-sm w-100 mt-auto ${stickyBot ? "position-absolute bottom-0" : ""}`}>
      <div className="container text-center">
        <div className="text-muted main-font" style={{ fontSize: "1rem" }}>
          MediFlow,
          <span className="fw-semibold">by Mr JS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
