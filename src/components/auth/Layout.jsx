import React from "react";
import Map from "../../assets/image/background.png";
import "./Layout.css";

const Layout = ({ path, children }) => {
  return (
    <div
      className="layout-login"
      style={{
        backgroundImage: `url(${Map})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        imageResolution: "from-image",
        imageRendering: "auto",
      }}
    >
      <div className="blur-container">
        <div
          className="layout-login-content"
          style={{ width: path !== "login" && path !== null ? "60%" : "30%" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
