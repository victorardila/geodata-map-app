import React, { useEffect, useState } from "react";
import User from "../../../assets/image/user.png";
import ButtonMenu from "../../../assets/data/Buttons.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalState, setMapCards } from "../../../hooks/GlobalStateContext";
import signOut from "../../../assets/svg/signOut.svg";
import statics from "../../../assets/svg/statics.svg";
import map from "../../../assets/svg/map.svg";
import robot from "../../../assets/svg/robot.svg";
import database from "../../../assets/svg/database.svg";
import info from "../../../assets/svg/info.svg";
import {
  faCaretDown,
  faCaretUp,
  // faChartLine,
  // faDatabase,
  // faMap,
  // faRobot,
  // faSignOutAlt,
  // faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie"; // Importar Cookies desde js-cookie
import "./Sidebar.style.css";

const Sidebar = () => {
  const { state, dispatch } = useGlobalState();
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const buttonMenu = ButtonMenu.dashboard.buttons;

  const icons = {
    "statics": statics,
    "database": database,
    "map": map,
    "robot": robot,  
    "info": info,
    "signOut": signOut,
  };

  const initialCheckboxStates = {
    "2-1": state.mapCards.search.visible,
    "2-2": state.mapCards.info.visible,
    "2-3": state.mapCards.settings.visible,
  };

  const [checkboxStates, setCheckboxStates] = useState(initialCheckboxStates);

  useEffect(() => {
    const cookieStates = ["searchCheckState", "infoCheckState", "settingsCheckState"];
    cookieStates.forEach((cookie) => {
      const value = Cookies.get(cookie);
      if (value !== undefined) {
        const key = cookie === "searchCheckState" ? "2-1" :
                    cookie === "infoCheckState" ? "2-2" : "2-3";
        const visible = value === "true";
        setCheckboxStates((prevStates) => ({
          ...prevStates,
          [key]: visible,
        }));
        dispatch({
          type: key === "2-1" ? "search" : key === "2-2" ? "info" : "settings",
          visible,
        });
      }
    });
  }, [dispatch]);

  const handleCheckboxChange = (key) => {
    const newCheckboxState = !checkboxStates[key];
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [key]: newCheckboxState,
    }));

    const actionType = key === "2-1" ? "search" : key === "2-2" ? "info" : "settings";
    setMapCards(dispatch, actionType, newCheckboxState);
    Cookies.set(`${actionType}CheckState`, newCheckboxState);
    // console.log(`${actionType}CheckState`, Cookies.get(`${actionType}CheckState`));
  };

  const handleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const handleOnClick = (route) => {
    window.location.href = route.includes("logout") ? '/auth/login' : route;
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
                // Si el boton tiene submenu
                <div
                  className="sidebar-button"
                  style={{
                    height:
                      isSidebarOpen && openSubMenu === index ? "23%" : "5%",
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
                        width: isSidebarOpen ? "22%" : "100%",
                        justifyContent: isSidebarOpen ? "flex-start" : "center",
                        fontSize: isSidebarOpen ? "18px" : "22px",
                        transition: "all 0.3s",
                      }}
                    >
                      {/* cada boton tiene su propia animacion solo es mapearla */}
                      <img src={icons[button.icon]} alt={button.icon} className="icon-transition" />
                      {/* <FontAwesomeIcon icon={icons[button.icon]} fade={button.anim} /> */}
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
                                  checkboxStates[`${index}-${subIndex}`] ||
                                  false
                                }
                                style={{ width: "20px", height: "20px" }}
                                onClick={() =>
                                  handleCheckboxChange(`${index}-${subIndex}`)
                                }
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
                // Si el boton no tiene submenu
                <div
                  className="sidebar-button"
                  style={{ height: "5%", justifyContent: "space-between" }}
                  onClick={() => {
                    handleOnClick(button.route)}
                  }
                >
                  <button style={{ height: "100%" }}>
                    <span
                      className="button-icon"
                      style={{
                        display: "flex",
                        width: isSidebarOpen ? "28%" : "100%",
                        justifyContent: isSidebarOpen ? "flex-start" : "center",
                        fontSize: isSidebarOpen ? "18px" : "22px",
                        transition: "all 0.3s",
                      }}
                    >
                      <img src={icons[button.icon]} alt={button.icon} className="icon-transition" />
                      {/* <FontAwesomeIcon icon={icons[button.icon]} fade={button.anim} /> */}
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
