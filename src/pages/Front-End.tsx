import React, { useState } from "react";
import { motion } from "framer-motion";
import "../Style/Front-End.scss";
import ArenaLogo from "../assets/ArenaLogo.png";
import DgateLogo from "../assets/DgateLogo.png";
import KnetLogo from "../assets/KnetLogo.png";
import Card from "../components/Card";

interface ProjectType {
  name: string;
  img: string;
  description: string;
}

const projects: ProjectType[] = [
  {
    name: "Arena",
    img: ArenaLogo,
    description: "Project to create a modular micro-frontend architecture.",
  },
  {
    name: "D-Gate",
    img: DgateLogo,
    description: "Project for the D-Gate system development.",
  },
  {
    name: "K-Net",
    img: KnetLogo,
    description: "Developing the K-Net networking system.",
  },
];

const FrontEnd: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleCardClick = (projectName: string) => {
    setSelectedProject(projectName === selectedProject ? null : projectName);
  };

  return (
    <div className="frontend-page">
      <h1 className="page-title">Front-End Departments</h1>
      <h2 className="page-desc">We have three projects we work on in Diditinary company</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className={`project-card ${
              selectedProject === project.name ? "selected-card" : ""
            }`}
            layout
            transition={{ layout: { duration: 0.6 }, type: "spring" }}
            onClick={() => handleCardClick(project.name)}
          >
            <Card img={project.img} name={project.name} description={project.description} />
          </motion.div>
        ))}

        {selectedProject === "D-Gate" && (
          <>
            <motion.div
              className="sub-gate"
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ layout: { duration: 0.6 }, type: "spring" }}
            >
              <Card
                img={ArenaLogo}
                name="Console"
                description="Sub project"
              />
            </motion.div>

            <motion.div
              className="sub-gate"
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ layout: { duration: 0.6 }, type: "spring" }}
            >
              <Card
                img={KnetLogo}
                name=".NET"
                description="Sub project"
              />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default FrontEnd;
