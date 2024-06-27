import React, { useState } from "react";
import User from "../../../assets/image/user.png";
import ButtonMenu from "../../../assets/data/Buttons.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faHome,
  faDatabase,
  faMap,
  faRobot,
  faSignOutAlt,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const buttonMenu = ButtonMenu.dashboard.buttons;

  const icons = {
    faHome: faHome,
    faDatabase: faDatabase,
    faMap: faMap,
    faRobot: faRobot,
    faCircleInfo: faCircleInfo,
    faSignOutAlt: faSignOutAlt,
  };

  const handleSubMenu = (index) => {
    if (openSubMenu === index) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(index);
    }
  };

  return (
    <div
      className="sidebar"
      style={{ width: isSidebarOpen ? "20%" : "5%" }}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => {
        setIsSidebarOpen(false);
        setOpenSubMenu(null);
      }}
    >
      <div className="sidebar-profile">
        <div className="sidebar-profile-image">
          <img src={User} alt="profile" />
        </div>
        <h4>Name User</h4>
      </div>
      <div className="sidebar-menu">
        <div className="sidebar-title">
          <h3>Menu</h3>
        </div>
        <div className="sidebar-buttons">
          {buttonMenu.map((button, index) => (
            <React.Fragment key={index}>
              {button.submenu ? (
                // Si el botón tiene submenu
                <div
                  className="sidebar-button"
                  style={{
                    height:
                      isSidebarOpen && openSubMenu === index ? "18%" : "5%",
                  }}
                  onClick={() => handleSubMenu(index)}
                >
                  <button
                    style={{
                      height: isSidebarOpen && openSubMenu ? "36%" : "100%",
                      justifyContent: isSidebarOpen
                        ? "space-between"
                        : "center",
                    }}
                  >
                    <span
                      className="button-icon"
                      style={{
                        display: "flex",
                        fontSize: isSidebarOpen ? "18px" : "22px",
                      }}
                    >
                      <FontAwesomeIcon icon={icons[button.icon]} />
                    </span>
                    <span
                      className="button-label"
                      style={{ display: isSidebarOpen ? "flex" : "none" }}
                    >
                      {button.label}
                    </span>
                    {button.submenu && (
                      <span
                        className="button-icon"
                        style={{
                          display: isSidebarOpen ? "flex" : "none",
                          fontSize: isSidebarOpen ? "18px" : "22px",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={openSubMenu === index ? faCaretDown : faCaretUp}
                          className="icon-transition"
                        />
                      </span>
                    )}
                  </button>
                  <div
                    className="sidebar-submenu"
                    style={{
                      display:
                        isSidebarOpen && openSubMenu === index
                          ? "flex"
                          : "none",
                      flexDirection: "column",
                    }}
                  >
                    {isSidebarOpen &&
                      button.submenu.map((subButton, subIndex) => (
                        <button key={`${index}-${subIndex}`}>
                          {subButton.label}
                        </button>
                      ))}
                  </div>
                </div>
              ) : (
                // Si el botón no tiene submenu
                <div
                  className="sidebar-button"
                  style={{ height: "5%", justifyContent: "space-between" }}
                >
                  <button style={{ height: "100%" }}>
                    <span
                      className="button-icon"
                      style={{
                        display: "flex",
                        width: isSidebarOpen ? "20%" : "100%",
                        justifyContent: isSidebarOpen ? "flex-start" : "center",
                        fontSize: isSidebarOpen ? "18px" : "22px",
                        transition: "all 0.3s",
                      }}
                    >
                      <FontAwesomeIcon icon={icons[button.icon]} />
                    </span>
                    <span
                      className="button-label"
                      style={{
                        display: isSidebarOpen ? "block" : "none",
                        width: "-webkit-fill-available",
                      }}
                    >
                      {button.label}
                    </span>
                    <span
                      className="button-icon"
                      style={{
                        display: "flex",
                        width: isSidebarOpen ? "20%" : "0",
                      }}
                    ></span>
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
