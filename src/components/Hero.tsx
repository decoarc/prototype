import React from "react";
import "./Hero.css";
import { scrollToSection } from "../utils/scrollToSection";

const Hero: React.FC = () => {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    scrollToSection(targetId);
  };

  return (
    <section className="hero" id="hero" aria-label="Introduction">
      <div className="hero-inner">
        <p className="hero-eyebrow">Hi, I&apos;m</p>
        <h1 className="hero-title">André Arcodaci</h1>
        <p className="hero-tagline">Full Stack Developer</p>
        <p className="hero-description">
          Building intuitive digital experiences through software, automation,
          and smart solutions.
        </p>
        <div className="hero-actions">
          <a
            href="#projects"
            className="hero-cta hero-cta-primary"
            onClick={(e) => handleNavClick(e, "projects")}
          >
            View projects
          </a>
        </div>
      </div>
      <div className="hero-glow" aria-hidden="true" />
    </section>
  );
};

export default Hero;
