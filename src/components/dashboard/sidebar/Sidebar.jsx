import React, { useState } from "react";
import User from "../../../assets/image/user.png";
import ButtonMenu from "../../../assets/data/Buttons.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faChartLine,
  faDatabase,
  faMap,
  faRobot,
  faSignOutAlt,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.style.css";

const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const buttonMenu = ButtonMenu.dashboard.buttons;

  // Initialize checkboxStates with false for each checkbox
  const initialCheckboxStates = buttonMenu.reduce((acc, button, index) => {
    if (button.submenu) {
      button.submenu.forEach((subButton, subIndex) => {
        if (subButton.type === "checkbox") {
          acc[`${index}-${subIndex}`] = false;
        }
      });
    }
    return acc;
  }, {});

  const [checkboxStates, setCheckboxStates] = useState(initialCheckboxStates);

  const icons = {
    faChartLine: faChartLine,
    faDatabase: faDatabase,
    faMap: faMap,
    faRobot: faRobot,
    faCircleInfo: faCircleInfo,
    faSignOutAlt: faSignOutAlt,
  };

  const handleCheckboxChange = (key) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key], // Toggle the checkbox state
    }));
  };

  const handleSubMenu = (index) => {
    if (openSubMenu === index) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(index);
    }
  };

  const handleLogout = () => {
    window.location.href = "/login";
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
                        <React.Fragment key={`${index}-${subIndex}`}>
                          {subButton.type === "button" ? (
                            <button
                              onClick={() =>
                                (window.location.href = subButton.route)
                              }
                            >
                              {subButton.label}
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleCheckboxChange(`${index}-${subIndex}`)
                              }
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={
                                  checkboxStates[`${index}-${subIndex}`] || false
                                }
                                style={{ width: "20px", height: "20px" }}
                                onChange={() =>
                                  handleCheckboxChange(`${index}-${subIndex}`)
                                }
                              />
                              <span>{subButton.label}</span>
                              <span style={{ width: "20px" }}>
                                {subButton.info}
                              </span>
                            </button>
                          )}
                        </React.Fragment>
                      ))}
                  </div>
                </div>
              ) : (
                <div
                  className="sidebar-button"
                  style={{ height: "5%", justifyContent: "space-between" }}
                  onClick={() => {
                    if (button.route.includes("logout")) {
                      handleLogout();
                    }
                  }}
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
