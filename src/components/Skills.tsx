import React, { useRef, useState } from "react";
import "./Skills.css";

const Skills: React.FC = () => {
  const skills = [
    { id: 1, name: "React", image: "/logo512.png" },
    { id: 2, name: "TypeScript", image: "/logo512.png" },
    { id: 3, name: "Node.js", image: "/logo512.png" },
    { id: 4, name: "CSS", image: "/logo512.png" },
    { id: 5, name: "JavaScript", image: "/logo512.png" },
    { id: 6, name: "HTML", image: "/logo512.png" },
  ];

  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentRotation = useRef(0);

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
    isDragging.current = false;
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
                <img src={skill.image} alt={skill.name} draggable={false} />
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
