import React, { useRef, useState, useEffect } from "react";
import "./Skills.css";

const imagesPath = "/assets/components/Skills/";

const Skills: React.FC = () => {
  const skills = [
    { id: 1, name: "React", image: `${imagesPath}reactLogo.png`, scale: 0.9 },
    { id: 2, name: "TypeScript", image: `${imagesPath}tsLogo.png`, scale: 0.7 },
    { id: 3, name: "php", image: `${imagesPath}PHPLogo.png` },
    { id: 4, name: "Python", image: `${imagesPath}pythonLogo.png`, scale: 0.7 },
    { id: 5, name: "JavaScript", image: `${imagesPath}jsLogo.png` },
    { id: 6, name: "HTML", image: `${imagesPath}htmlLogo.png`, scale: 0.75 },
    { id: 7, name: "CSS", image: `${imagesPath}cssLogo.png`, scale: 0.8 },
    { id: 8, name: "MySQL", image: `${imagesPath}mysqlLogo.png`, scale: 0.7 },
    {
      id: 9,
      name: "postgresql",
      image: `${imagesPath}postgresqlLogo.png`,
      scale: 0.7,
    },
    { id: 10, name: "c++", image: `${imagesPath}c++Logo.png`, scale: 0.7 },
  ];

  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentRotation = useRef(0);

  const anglePerItem = 360 / skills.length;

  const autoplayRef = useRef<number | null>(null);
  const autoplaySpeed = 0.1;
  const resumeTimeoutRef = useRef<number | null>(null);

  const startAutoplay = () => {
    if (autoplayRef.current) return;

    const animate = () => {
      setRotation((prev) => prev + autoplaySpeed);
      autoplayRef.current = requestAnimationFrame(animate);
    };

    autoplayRef.current = requestAnimationFrame(animate);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      cancelAnimationFrame(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const resumeAutoplayWithDelay = () => {
    stopAutoplay();
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = window.setTimeout(() => {
      startAutoplay();
    }, 5000);
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const snapToNearest = () => {
    const rawIndex = Math.round(rotation / anglePerItem);
    let targetRotation = rawIndex * anglePerItem;

    while (targetRotation - rotation > 180) targetRotation -= 360;
    while (targetRotation - rotation < -180) targetRotation += 360;

    const duration = 300;
    const start = performance.now();
    const initial = rotation;
    const delta = targetRotation - initial;

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const newRot = initial + delta * eased;

      setRotation(newRot);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  const handleStart = (clientX: number) => {
    stopAutoplay();
    isDragging.current = true;
    startX.current = clientX;
    currentRotation.current = rotation;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging.current) return;

    const delta = clientX - startX.current;
    const newRotation = currentRotation.current + delta * 0.3;

    setRotation(newRotation);
  };

  const handleEnd = () => {
    if (!isDragging.current) return;

    isDragging.current = false;
    snapToNearest();
    resumeAutoplayWithDelay();
  };

  const getCurrentItemIndex = () => {
    let normalizedRotation = rotation % 360;
    if (normalizedRotation < 0) normalizedRotation += 360;

    const invertedRotation = 360 - normalizedRotation;
    const rawIndex = Math.round(invertedRotation / anglePerItem);
    return rawIndex % skills.length;
  };

  const currentItemIndex = getCurrentItemIndex();
  const currentSkill = skills[currentItemIndex];

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <h2 className="skills-title">Skills & Technologies</h2>

        <div className="banner">
          <div
            className="slider"
            style={
              {
                "--quantity": skills.length,
                transform: `perspective(1000px) rotateX(-5deg) rotateY(${rotation}deg)`,
              } as React.CSSProperties
            }
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseMove={(e) => handleMove(e.clientX)}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => {
              e.preventDefault();
              handleMove(e.touches[0].clientX);
            }}
            onTouchEnd={handleEnd}
          >
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className="item"
                style={{ "--position": index + 1 } as React.CSSProperties}
              >
                <img
                  src={skill.image}
                  alt={skill.name}
                  draggable={false}
                  style={{
                    transform: skill.scale ? `scale(${skill.scale})` : "none",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>
          <div
            className="drag-layer"
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseMove={(e) => handleMove(e.clientX)}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onTouchEnd={handleEnd}
          />
          <div className="skill-label" key={currentSkill.id}>
            {currentSkill.name}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
