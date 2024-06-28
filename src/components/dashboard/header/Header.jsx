import React from "react";
import Logo from "../../../assets/icon/icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog } from "@fortawesome/free-solid-svg-icons";
import "./Header.style.css";

const Header = ({path}) => {
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
            <FontAwesomeIcon icon={faBell} />
            <FontAwesomeIcon icon={faCog} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
