import React from "react";
import "./Layout.css";

const Layout = ({ path, children }) => {
  return (
    <div className="layout-login">
      <div
        className="layout-login-content"
        style={{width: path !== 'login' && path!==null ? '60%' : '30%'}}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
