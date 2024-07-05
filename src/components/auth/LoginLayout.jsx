import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Map from "../../assets/image/background.png";
import Login from "./login/Login";
import Register from "./register/Register";
import Regain from "./regain/Regain";
import "./LoginLayout.style.css";

const LoginLayout = () => {
  const { "*": path } = useParams();

  useEffect(() => {
    console.log(path)
  }, [path])
  
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
          <Login />
          {path === "register" ? (
            <Register />
          ) : path === "reset-password" ? (
            <Regain />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
