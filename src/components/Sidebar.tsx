import React, { useState} from "react";
import {
  Code,
  GitMerge,
  BookOpenCheck,
  BriefcaseBusiness,
  Component,
  DollarSign,
  Box,
  Users,
  ChevronLeft,
  ChevronRight,
  
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/Sidebar.scss";
import logo from "../assets/Digitinary-Logo.png";
import logoIcon from "../assets/digitinary_icon.png"; 
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

  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const { setSelectedProject } = useProject();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const menuItems = [
    {
      category: "Front-end",
      icon: <Code strokeWidth={1.75} className="menu-item-icon" />,
      path: "/front-end",
      onClick: () => {
        setIsFrontEndSelected(true);
        setSelectedProject(null);
      },
    },
    {
      category: "Back-end",
      icon: <GitMerge strokeWidth={1.75} className="menu-item-icon" />,
      path: "/back-end",
      onClick: () => setIsFrontEndSelected(false),
    },
    {
      category: "Quality Assurance",
      icon: <BookOpenCheck strokeWidth={1.75} className="menu-item-icon" />,
      path: "/qa",
      onClick: () => setIsFrontEndSelected(false),
    },
    {
      category: "Human Resource",
      icon: <BriefcaseBusiness strokeWidth={1.75} className="menu-item-icon" />,
      path: "/hr",
      onClick: () => setIsFrontEndSelected(false),
    },
    {
      category: "UI UX Designer",
      icon: <Component strokeWidth={1.75} className="menu-item-icon" />,
      path: "/ui-ux",
      onClick: () => setIsFrontEndSelected(false),
    },
    {
      category: "Financial Officer",
      icon: <DollarSign strokeWidth={1.75} className="menu-item-icon" />,
      path: "/finance",
      onClick: () => setIsFrontEndSelected(false),
    },
    {
      category: "Product Manager",
      icon: <Box strokeWidth={1.75} className="menu-item-icon" />,
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
    <div className={`sidebar-wrapper ${isOpen ? "open" : "closed"}`}>
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        <div className="toggle-circle">
          {isOpen ? (
            <ChevronLeft className="toggle-icon" />
          ) : (
            <ChevronRight className="toggle-icon" />
          )}
        </div>
      </button>

        <div className="sidebar-header">
          <div className="logo">
            <Link to="/">
              <img 
                src={isOpen ? logo : logoIcon} 
                alt="Digitinary Logo" 
                className={`logo-image ${!isOpen ? 'logo-icon' : ''}`}
              />
            </Link>
          </div>
        </div>

        <div className="sidebar-content">
          {isOpen && <h2>Departments</h2>}
          <nav className="sidebar-menu">
            {menuItems.map(({ category, icon, path, onClick }) => (
              <Link
                key={category}
                to={path}
                className={`menu-item ${activeCategory === category ? "active" : ""}`}
                onClick={() => {
                  handleMenuItemClick(category);
                  if (onClick) onClick();
                }}
              >
                <span className="menu-item-icon">{icon}</span>
                {isOpen && <span>{category}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {isOpen && isFrontEndSelected && (
          <div className="sidebar-coworkers">
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
          </div>
        )}

        <div className="sidebar-footer">
          <div className="profile">
            <img
              src={tasneemAvatar}
              alt="User Avatar"
              className="profile-avatar"
            />
            {isOpen && (
              <div>
                <p className="profile-name">Tasneem Farraj</p>
                <p className="profile-email">tasneemfarraj@gmail.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;