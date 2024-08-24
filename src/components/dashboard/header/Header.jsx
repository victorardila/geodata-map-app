import React, { useEffect, useState } from "react";
import Logo from "../../../assets/icon/icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faBell } from "@fortawesome/free-solid-svg-icons";
import bellNoti from "../../../assets/gif/notification.gif";
import "./Header.style.css";

const Header = () => {
  const [notification, setNotification] = useState(0);
  // declaro una funcion que se cargara 4min despues de que se renderice el componente y quede asi
  useEffect(() => {
    const interval = setInterval(() => {
      setNotification(notification + 1);
    }, 120000);
    return () => clearInterval(interval);
  }, [notification]);
  return (
    <div className="header-state-app">
      <div className="header-state-card">
        <div className="layout-header-state">
          <div className="header-logo-state">
            <img src={Logo} alt="Logo" />
            <h3>GeoData Map</h3>
          </div>
          <div className="header-title-state">
            <h3>Dashboard</h3>
          </div>
          <div className="header-cog-state">
            {notification > 0 ? (
              <div className="header-item">
                <img src={bellNoti} alt="Notification" />
              </div>
            ) : (
              <div className="header-item">
                <FontAwesomeIcon
                  icon={faBell}
                  style={{ color: "rgba(242, 185, 12)" }}
                />
              </div>
            )}
            <div className="header-item">
              <FontAwesomeIcon
                icon={faCog}
                spin
                style={{ color: "rgba(40, 40, 40, 0.7)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
