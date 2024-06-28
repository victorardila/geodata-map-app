import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import Map from "../map/Map";
import MapCards from "../common/MapCards";
import "./DashboardLayout.style.css";

const DashboardLayout = ({ path }) => {
  return (
    <div className="layout-app">
      <Sidebar />
      <div className="layout-content">
        <Header />
        <div className="content-wrapper">
          <div className="content-wrapper-card">
            <div className="content-wrapper-card-relative">
              {/*Capa de personalizacion por encima de leaflet*/}
              <div className="search-bar-container">
                <MapCards type={"search"} />
              </div>
              <div className="container-settings-map">
                <MapCards type={"settings"} />
              </div>
              <div className="container-info-map">
                <MapCards type={"info"} />
              </div>
              {path === "dashboard/map" ? <Map /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
