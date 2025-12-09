import React, { useEffect, useRef, useState } from "react";
import "./Header.css";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const goingDown = currentY > lastScrollY.current;

      if (goingDown) {
        const faded = Math.max(0, 1 - currentY / 300);
        setHeaderOpacity(faded);
      } else {
        setHeaderOpacity(1);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="header"
      style={{
        opacity: headerOpacity,
        visibility: headerOpacity === 0 ? "hidden" : "visible",
        pointerEvents: headerOpacity === 0 ? "none" : "auto",
      }}
    >
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
