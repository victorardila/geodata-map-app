import React from "react";
import Logo from "../../../assets/icon/icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faBell } from "@fortawesome/free-solid-svg-icons";
import notification from "../../../assets/gif/notification.gif";
import "./Header.style.css";

const Header = () => {
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
            {/* <img src={notification} alt="Notification" /> */}
            <FontAwesomeIcon icon={faBell} shake style={{color: "rgba(242, 185, 12)"}} />
            <FontAwesomeIcon icon={faCog} spin style={{color: "rgba(40, 40, 40, 0.7)"}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
