import React, { useCallback, useRef, useState } from "react";
import "./AboutSection.css";

const imagesPath = "/assets/components/About/";
const REVEAL_RADIUS = 120;

const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState({ x: 0, y: 0, active: false });

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    setReveal({
      x: clientX - rect.left,
      y: clientY - rect.top,
      active: true,
    });
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    updatePosition(event.clientX, event.clientY);
  };

  const handleMouseLeave = () => {
    setReveal((prev) => ({ ...prev, active: false }));
  };

  const handleClick = () => {
    if (!window.matchMedia("(hover: none)").matches) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    setReveal((prev) => ({
      x: rect.width / 2,
      y: rect.height / 2,
      active: !prev.active,
    }));
  };

  const isRevealed = reveal.active;
  const radius = isRevealed ? REVEAL_RADIUS : 0;

  return (
    <section className="about-section" id="about">
      <div className="container">
        <h2>Meet Me</h2>
        <div className="about-content">
          <div
            ref={containerRef}
            className="about-image"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            role="img"
            aria-label="Foto de perfil com efeito cibernético ao passar o mouse"
          >
            <img
              src={`${imagesPath}perfil.png`}
              alt=""
              className="about-image-base"
              draggable={false}
            />
            <img
              src={`${imagesPath}perfil_2.png`}
              alt=""
              className="about-image-reveal"
              draggable={false}
              style={{
                WebkitMaskImage: `radial-gradient(circle ${radius}px at ${reveal.x}px ${reveal.y}px, black 0%, black 75%, transparent 100%)`,
                maskImage: `radial-gradient(circle ${radius}px at ${reveal.x}px ${reveal.y}px, black 0%, black 75%, transparent 100%)`,
              }}
            />
            <div
              className="about-image-glow"
              style={{
                left: reveal.x,
                top: reveal.y,
                opacity: isRevealed ? 1 : 0,
                width: REVEAL_RADIUS * 2,
                height: REVEAL_RADIUS * 2,
              }}
              aria-hidden="true"
            />
          </div>
          <div className="about-text">
            <p className="about-headline">
              Engineer by background,
              <br />
              <span className="about-headline-accent">
                Full Stack Developer by passion.
              </span>
            </p>
            <p className="about-body">
              I love transforming complex problems into intuitive digital
              experiences through software, automation, and smart solutions.
            </p>
            <p className="about-body about-body-closing">
              Always curious, always learning, and always looking for better
              ways to build things that create real impact.
            </p>
            <a href="#work" className="explore-link">
              Explore work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
