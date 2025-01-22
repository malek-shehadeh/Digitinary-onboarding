// import React, { useState } from "react";
// import {
//   Code,
//   GitMerge,
//   BookOpenCheck,
//   BriefcaseBusiness,
//   Component,
//   DollarSign,
//   Box,
//   Users,
// } from "lucide-react";

// import { Link, useNavigate } from "react-router-dom";
// import "../Style/Sidebar.scss";
// import logo from "../assets/Digitinary-Logo.png";
// import user1 from "../assets/user1.png";
// import user2 from "../assets/user2.png";
// import user3 from "../assets/user3.png";
// import user4 from "../assets/user4.png";
// import user5 from "../assets/user5.png";
// import user6 from "../assets/user6.png";
// import tasneemAvatar from "../assets/taneemAvater.png";

// const Sidebar: React.FC = () => {
//   const [isFrontEndSelected, setIsFrontEndSelected] = useState(false);
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const navigate = useNavigate();

//   const menuItems = [
//     {
//       category: "Front-end",
//       icon: <Code className="menu-item-icon" />,
//       path: "/front-end",
//       onClick: () => setIsFrontEndSelected(true),
//     },
//     {
//       category: "Back-end",
//       icon: <GitMerge className="menu-item-icon" />,
//       path: "/back-end",
//       onClick: () => setIsFrontEndSelected(false),
//     },
//     {
//       category: "Quality Assurance",
//       icon: <BookOpenCheck className="menu-item-icon" />,
//       path: "/qa",
//       onClick: () => setIsFrontEndSelected(false),
//     },
//     {
//       category: "Human Resource",
//       icon: <BriefcaseBusiness className="menu-item-icon" />,
//       path: "/hr",
//       onClick: () => setIsFrontEndSelected(false),
//     },
//     {
//       category: "UI UX Designer",
//       icon: <Component className="menu-item-icon" />,
//       path: "/ui-ux",
//       onClick: () => setIsFrontEndSelected(false),
//     },
//     {
//       category: "Financial Officer",
//       icon: <DollarSign className="menu-item-icon" />,
//       path: "/finance",
//       onClick: () => setIsFrontEndSelected(false),
//     },
//     {
//       category: "Product Manager",
//       icon: <Box className="menu-item-icon" />,
//       path: "/product-manager",
//       onClick: () => setIsFrontEndSelected(false),
//     },
//   ];

//   const frontEndCoworkers = [
//     { name: "Alice", image: user1 },
//     { name: "Bob", image: user2 },
//     { name: "Charlie", image: user3 },
//     { name: "Dave", image: user4 },
//     { name: "Eve", image: user5 },
//     { name: "Frank", image: user6 },
//   ];

//   const handleViewAllClick = () => {
//     navigate("/co-workers");
//   };

//   const handleMenuItemClick = (category: string) => {
//     setActiveCategory(category);
//   };

//   return (
//     <div className="sidebar-wrapper open">
//       <aside className="sidebar">
//         <div className="sidebar-header">
//           <div className="logo">
//             <Link to="/">
//               <img src={logo} alt="Digitinary Logo" className="logo-image" />
//             </Link>
//           </div>
//         </div>
//         <div className="sidebar-content">
//           <h2>Departments</h2>
//           <nav className="sidebar-menu">
//             {menuItems.map(({ category, icon, path, onClick }) => (
//               <Link
//                 key={category}
//                 to={path}
//                 className={`menu-item ${
//                   activeCategory === category ? "active" : ""
//                 }`}
//                 onClick={() => {
//                   handleMenuItemClick(category);
//                   onClick && onClick();
//                 }}
//               >
//                 <span className="menu-item-icon">{icon}</span>
//                 <span>{category}</span>
//               </Link>
//             ))}
//           </nav>
//         </div>

//         <div className="sidebar-coworkers">
//           {isFrontEndSelected && (
//             <>
//               <h2>Co-workers</h2>
//               <div className="coworkers">
//                 {frontEndCoworkers.slice(0, 4).map((coworker, index) =>
//                   coworker.image ? (
//                     <img
//                       key={index}
//                       src={coworker.image}
//                       alt={coworker.name}
//                       className="coworker-icon"
//                     />
//                   ) : (
//                     <Users key={index} />
//                   )
//                 )}
//                 {frontEndCoworkers.length > 4 && (
//                   <div
//                     className="coworker-extra"
//                     onClick={handleViewAllClick}
//                   >
//                     +{frontEndCoworkers.length - 4}
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </div>

//         <div className="sidebar-footer">
//           <div className="profile">
//             <img
//               src={tasneemAvatar}
//               alt="User Avatar"
//               className="profile-avatar"
//             />
//             <div>
//               <p className="profile-name">Tasneem Farraj</p>
//               <p className="profile-email">tasneemfarraj@gmail.com</p>
//             </div>
//           </div>
//         </div>
//       </aside>
//     </div>
//   );
// };

// export default Sidebar;
// src/components/Sidebar.tsx //mean


import React, { useState } from "react";
import {
  Code,
  GitMerge,
  BookOpenCheck,
  BriefcaseBusiness,
  Component,
  DollarSign,
  Box,
  Users,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import "../Style/Sidebar.scss";
import logo from "../assets/Digitinary-Logo.png";
import user1 from "../assets/user1.png";
import user2 from "../assets/user2.png";
import user3 from "../assets/user3.png";
import user4 from "../assets/user4.png";
import user5 from "../assets/user5.png";
import user6 from "../assets/user6.png";
import tasneemAvatar from "../assets/taneemAvater.png";
import { useProject } from "../context/ProjectContext";

const Sidebar: React.FC = () => {
  const [isFrontEndSelected, setIsFrontEndSelected] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setSelectedProject } = useProject();

  const menuItems = [
    {
      category: "Front-end",
      icon: <Code className="menu-item-icon" />,
      path: "/front-end",
      onClick: () => {
        setIsFrontEndSelected(true);
        setSelectedProject(null);
      },
    },
    {
      category: "Back-end",
      icon: <GitMerge className="menu-item-icon" />,
      path: "/back-end",
      onClick: () => setIsFrontEndSelected(false),
    },
    {
      category: "Quality Assurance",
      icon: <BookOpenCheck className="menu-item-icon" />,
      path: "/qa",
      onClick: () => setIsFrontEndSelected(false),
    },
    {
      category: "Human Resource",
      icon: <BriefcaseBusiness className="menu-item-icon" />,
      path: "/hr",
      onClick: () => setIsFrontEndSelected(false),
    },
    {
      category: "UI UX Designer",
      icon: <Component className="menu-item-icon" />,
      path: "/ui-ux",
      onClick: () => setIsFrontEndSelected(false),
    },
    {
      category: "Financial Officer",
      icon: <DollarSign className="menu-item-icon" />,
      path: "/finance",
      onClick: () => setIsFrontEndSelected(false),
    },
    {
      category: "Product Manager",
      icon: <Box className="menu-item-icon" />,
      path: "/product-manager",
      onClick: () => setIsFrontEndSelected(false),
    },
  ];

  const frontEndCoworkers = [
    { name: "Alice", image: user1 },
    { name: "Bob", image: user2 },
    { name: "Charlie", image: user3 },
    { name: "Dave", image: user4 },
    { name: "Eve", image: user5 },
    { name: "Frank", image: user6 },
  ];

  const handleViewAllClick = () => {
    navigate("/co-workers");
  };

  const handleMenuItemClick = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="sidebar-wrapper open">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Digitinary Logo" className="logo-image" />
            </Link>
          </div>
        </div>
        <div className="sidebar-content">
          <h2>Departments</h2>
          <nav className="sidebar-menu">
            {menuItems.map(({ category, icon, path, onClick }) => (
              <Link
                key={category}
                to={path}
                className={`menu-item ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() => {
                  handleMenuItemClick(category);
                  onClick && onClick();
                }}
              >
                <span className="menu-item-icon">{icon}</span>
                <span>{category}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="sidebar-coworkers">
          {isFrontEndSelected && (
            <>
              <h2>Co-workers</h2>
              <div className="coworkers">
                {frontEndCoworkers.slice(0, 4).map((coworker, index) =>
                  coworker.image ? (
                    <img
                      key={index}
                      src={coworker.image}
                      alt={coworker.name}
                      className="coworker-icon"
                    />
                  ) : (
                    <Users key={index} />
                  )
                )}
                {frontEndCoworkers.length > 4 && (
                  <div
                    className="coworker-extra"
                    onClick={handleViewAllClick}
                  >
                    +{frontEndCoworkers.length - 4}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="sidebar-footer">
          <div className="profile">
            <img
              src={tasneemAvatar}
              alt="User Avatar"
              className="profile-avatar"
            />
            <div>
              <p className="profile-name">Tasneem Farraj</p>
              <p className="profile-email">tasneemfarraj@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;