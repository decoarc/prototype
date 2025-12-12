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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();

    // Fecha o menu mobile se estiver aberto
    setIsMenuOpen(false);

    // Encontra o elemento alvo
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Calcula a altura do header dinamicamente
      const headerElement = document.querySelector(".header") as HTMLElement;
      const headerHeight = headerElement ? headerElement.offsetHeight : 80;

      // Calcula a posição com offset para compensar o header fixo
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      // Faz scroll suave
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

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
          <a href="#about" onClick={(e) => handleNavClick(e, "about")}>
            About
          </a>
          <a href="#skills" onClick={(e) => handleNavClick(e, "skills")}>
            Skills
          </a>
          <a href="#projects" onClick={(e) => handleNavClick(e, "projects")}>
            Projects
          </a>
          <a href="#features" onClick={(e) => handleNavClick(e, "features")}>
            Features
          </a>
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
