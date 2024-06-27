import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-app">
      <Sidebar />
      <div className="layout-content">
        <Header />
        <div className="content-wrapper">
          <div className="content-wrapper-card">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
