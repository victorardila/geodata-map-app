import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import MapView from "../map/MapView"
import "./DashboardLayout.style.css";

const DashboardLayout = ({path}) => {
  return (
    <div className="layout-app">
      <Sidebar />
      <div className="layout-content">
        <Header />
        <div className="content-wrapper">
          <div className="content-wrapper-card">
          {path === "dashboard/map" ? (
        <MapView />
      ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
