import React, { useState } from "react";
import "./Header.css";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          {" "}
          <img src="/logoHome.png" alt="Logo Prototype" className="logo" />
        </div>
        <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
          <a href="#type1">type1</a>
          <a href="#type2">type2</a>
          <a href="#type3">type3</a>
          <a href="#type4">type4</a>
        </nav>
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
