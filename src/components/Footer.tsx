import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">Logo Prototype by Me</div>
          <p className="footer-copyright">© 2025 Me. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
