import React from "react";
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

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <h2 className="skills-title">Skills & Technologies</h2>
        <div className="banner">
          <div
            className="slider"
            style={{ "--quantity": skills.length } as React.CSSProperties}
          >
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className="item"
                style={{ "--position": index + 1 } as React.CSSProperties}
              >
                <img src={skill.image} alt={skill.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
