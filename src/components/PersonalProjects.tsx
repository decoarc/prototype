import React from "react";
import "./PersonalProjects.css";

const PersonalProjects: React.FC = () => {
  return (
    <section className="personal-projects">
      <div className="personal-projects-content">
        <div className="personal-projects-images">
          <div className="personal-projects-image-item">
            <div className="image-label">Imagem 6</div>
          </div>
          <div className="personal-projects-image-item">
            <div className="image-label">Imagem 7</div>
          </div>
          <div className="personal-projects-image-item">
            <div className="image-label">Imagem 8</div>
          </div>
        </div>
        <h1 className="personal-projects-title">Title Prototype</h1>
      </div>
    </section>
  );
};

export default PersonalProjects;
