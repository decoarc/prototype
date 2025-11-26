import React from "react";
import "./AboutSection.css";

const AboutSection: React.FC = () => {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <h2>Meet Me</h2>
        <div className="about-content">
          <div className="about-image">
            <div className="image-label">Imagem 1</div>
          </div>
          <div className="about-text">
            <h3>(Your Instructor)</h3>
            <p>Introduction text</p>
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
