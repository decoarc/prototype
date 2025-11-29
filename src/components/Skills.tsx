import React, { useRef, useState } from "react";
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
  ];

  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentRotation = useRef(0);

  const anglePerItem = 360 / skills.length;

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
  };

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
        </div>
      </div>
    </section>
  );
};

export default Skills;
