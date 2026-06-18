import React from "react";
import "./PersonalProjects.css";

const projectsImagesPath = "/assets/components/Projects/";

type Project = {
  id: string;
  title: string;
  description: string;
  url: string;
  previewImage: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: "map-areas",
    title: "Map Areas",
    description:
      "Draw and manage polygon areas on an interactive map. Save areas, clear the canvas, and add polygons by coordinates in Lat/Lng, UTM, or GMS format.",
    url: "https://geo-areas-php.onrender.com/",
    previewImage: `${projectsImagesPath}map-areas.png`,
    tags: ["PHP", "Maps", "Geospatial"],
  },
];

const PersonalProjects: React.FC = () => {
  return (
    <section className="personal-projects" id="projects">
      <div className="container personal-projects-content">
        <h2 className="personal-projects-heading">Personal Projects</h2>
        <p className="personal-projects-intro">
          Side projects I build to explore ideas and sharpen my craft.
        </p>

        <ul className="personal-projects-list">
          {projects.map((project) => (
            <li key={project.id} className="project-card">
              <a
                href={project.url}
                className="project-card-preview"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} live demo`}
              >
                <img
                  src={project.previewImage}
                  alt=""
                  className="project-card-preview-image"
                  draggable={false}
                />
                <span
                  className="project-card-preview-overlay"
                  aria-hidden="true"
                />
                <span className="project-card-preview-label">Live demo</span>
              </a>

              <div className="project-card-body">
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-description">{project.description}</p>

                <ul className="project-card-tags" aria-label="Technologies">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>

                <a
                  href={project.url}
                  className="project-card-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View project
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PersonalProjects;
