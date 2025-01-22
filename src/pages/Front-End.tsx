// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import "../Style/Front-End.scss";
// import ArenaLogo from "../assets/ArenaLogo.png";
// import DgateLogo from "../assets/DgateLogo.png";
// import KnetLogo from "../assets/KnetLogo.png";
// import Card from "../components/Card";
// import ArenaPage from "../pages/arenaPage";


// interface ProjectType {
//   name: string;
//   img: string;
//   description: string;
//   email: string;
// }

// const projects: ProjectType[] = [
//   {
//     name: "Arena",
//     img: ArenaLogo,
//     description: "Project to create a modular micro-frontend architecture.",
//     email: "arena@example.com",
//   },
//   {
//     name: "D-Gate",
//     img: DgateLogo,
//     description: "Project for the D-Gate system development.",
//     email: "dgate@example.com",
//   },
//   {
//     name: "K-Net",
//     img: KnetLogo,
//     description: "Developing the K-Net networking system.",
//     email: "knet@example.com",
//   },
// ];

// const FrontEnd: React.FC = () => {
//   const [selectedProject, setSelectedProject] = useState<string | null>(null);
//   const [logoPosition, setLogoPosition] = useState<{
//     top: number;
//     left: number;
//     width: number;
//     height: number;
//   } | null>(null);

//   const handleCardClick = (
//     projectName: string,
//     cardRef: HTMLDivElement | null
//   ) => {
//     if (projectName === "Arena" && cardRef) {
//       const rect = cardRef.getBoundingClientRect();
//       setLogoPosition({
//         top: rect.top,
//         left: rect.left,
//         width: rect.width,
//         height: rect.height,
//       });
//     }
//     setSelectedProject(projectName === selectedProject ? null : projectName);
//   };

//   return (
//     <div className="frontend-page">
//       <AnimatePresence>
//         {selectedProject === "Arena" && logoPosition && (
//           <>
//             <motion.div
//               className="arena-logo"
//               initial={{
//                 top: logoPosition.top,
//                 left: logoPosition.left,
//                 width: logoPosition.width,
//                 height: logoPosition.height,
//               }}
//               animate={{
//                 top: 20,
//                 left:270,
//                 width: 50,
//                 height: 50,
//               }}
//               transition={{
//                 duration: 1,
//                 ease: "easeInOut",
//               }}
//             >
//               <img src={ArenaLogo} alt="Arena Logo" />
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1 }}
//             >
//               <ArenaPage />
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {!selectedProject && (
//         <motion.div 
//           className="projects-container"
//           initial={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           {projects.map((project) => (
//             <div
//               key={project.name}
//               className="project-card"
//               onClick={(e) =>
//                 handleCardClick(project.name, e.currentTarget as HTMLDivElement)
//               }
//             >
//               <Card
//                 img={project.img}
//                 name={project.name}
//                 description={project.description}
//                 email={project.email}
//               />
//             </div>
//           ))}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default FrontEnd;
// src/pages/Front-End.tsx


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../Style/Front-End.scss";
import ArenaLogo from "../assets/ArenaLogo.png";
import DgateLogo from "../assets/DgateLogo.png";
import KnetLogo from "../assets/KnetLogo.png";
import Card from "../components/Card";
import ArenaPage from "../pages/arenaPage";
import DgatePage from "../pages/arenaPage";
import KnetPage from "../pages/arenaPage";
import { useProject } from "../context/ProjectContext";

interface ProjectType {
  name: string;
  img: string;
  description: string;
  email: string;
}

const projects: ProjectType[] = [
  {
    name: "Arena",
    img: ArenaLogo,
    description: "Project to create a modular micro-frontend architecture.",
    email: "arena@example.com",
  },
  {
    name: "D-Gate",
    img: DgateLogo,
    description: "Project for the D-Gate system development.",
    email: "dgate@example.com",
  },
  {
    name: "K-Net",
    img: KnetLogo,
    description: "Developing the K-Net networking system.",
    email: "knet@example.com",
  },
];

const FrontEnd: React.FC = () => {
  const { selectedProject, setSelectedProject } = useProject();
  const [logoPosition, setLogoPosition] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const handleCardClick = (
    projectName: string,
    cardRef: HTMLDivElement | null
  ) => {
    if (cardRef) {
      const rect = cardRef.getBoundingClientRect();
      setLogoPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
    setSelectedProject(projectName === selectedProject ? null : projectName);
  };

  return (
    <div className="frontend-page">
      <AnimatePresence>
        {selectedProject === "Arena" && logoPosition && (
          <>
            <motion.div
              className="arena-logo"
              initial={{
                top: logoPosition.top,
                left: logoPosition.left,
                width: logoPosition.width,
                height: logoPosition.height,
              }}
              animate={{
                top: 20,
                left: 270,
                width: 50,
                height: 50,
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
            >
              <img src={ArenaLogo} alt="Arena Logo" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <ArenaPage />
            </motion.div>
          </>
        )}
        {selectedProject === "D-Gate" && logoPosition && (
          <>
            <motion.div
              className="arena-logo"
              initial={{
                top: logoPosition.top,
                left: logoPosition.left,
                width: logoPosition.width,
                height: logoPosition.height,
              }}
              animate={{
                top: 20,
                left: 270,
                width: 50,
                height: 50,
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
            >
              <img src={DgateLogo} alt="D-Gate Logo" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <DgatePage />
            </motion.div>
          </>
        )}
        {selectedProject === "K-Net" && logoPosition && (
          <>
            <motion.div
              className="arena-logo"
              initial={{
                top: logoPosition.top,
                left: logoPosition.left,
                width: logoPosition.width,
                height: logoPosition.height,
              }}
              animate={{
                top: 20,
                left: 270,
                width: 50,
                height: 50,
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
            >
              <img src={KnetLogo} alt="K-Net Logo" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <KnetPage />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {!selectedProject && (
        <motion.div
          className="projects-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {projects.map((project) => (
            <div
              key={project.name}
              className="project-card"
              onClick={(e) =>
                handleCardClick(project.name, e.currentTarget as HTMLDivElement)
              }
            >
              <Card
                img={project.img}
                name={project.name}
                description={project.description}
                email={project.email}
              />
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FrontEnd;