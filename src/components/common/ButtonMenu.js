import React, { useState } from "react";

const ButtonMenu = ({ text, type, color, path }) => {
  const [isHoveredButtonMenu, setIsHoveredButtonMenu] = useState(false);
  const [isHoveredButtonLogin, setIsHoveredButtonLogin] = useState(false);

  const buttonMenuStyle = {
    fontSize: "20px",
    fontWeight: isHoveredButtonMenu ? "bold" : "normal",
    background: "transparent",
    width: "90%",
    borderRadius: "5px",
    margin: "5px",
    border: "none",
    outline: "none",
    position: "relative",
    backgroundClip: isHoveredButtonMenu ? "text" : "none",
    WebkitBackgroundClip: isHoveredButtonMenu ? "text" : "none",
    WebkitTextFillColor: isHoveredButtonMenu
      ? "transparent"
      : color === "transparent"
      ? "black"
      : "white",
    backgroundImage: isHoveredButtonMenu
      ? color==="transparent"?"linear-gradient(-45deg, #F22727, rgba(0,0,0,0.9))":"linear-gradient(45deg, #fff7f7, #ffebeb, #ffdfdf, #ffd3d3, #ffc7c7, #ffbbbb, #ffafaf, #ffa3a3, #ff9797, #ff8b8b, #ff7f7f)"
      : "none",
    cursor: isHoveredButtonMenu ? "pointer" : "default",
  };

  const buttonLoginStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    background: isHoveredButtonLogin
      ? "linear-gradient(-25deg, #F22727 10%, rgba(0,0,0,0.9) 55%)"
      : "transparent",
    WebkitTextFillColor: isHoveredButtonLogin
      ? "white"
      : color === "transparent"
      ? "black"
      : "white",
    width: "-webkit-fill-available",
    boxShadow: isHoveredButtonLogin
      ? "6px 6px 6px 0px rgba(0,0,0,0.4)"
      : "4px 4px 4px 0px rgba(0,0,0,0.3)", // Cambia el box-shadow en hover
    borderRadius: isHoveredButtonLogin ? "10px" : "5px", // Cambia el radio del borde en hover
    margin: "5px",
    border: color === "transparent"
      ? "1px solid rgba(0,0,0,0.4)":"1px solid rgba(255,255,255,0.6)",
    cursor: isHoveredButtonLogin ? "pointer" : "default", // Cambia el cursor en hover
    transition: "background-color 0.3s, box-shadow 0.3s", // Transiciones suaves
  };

  const buttonContent = {
    display: "flex",
    width: type === "button-menu" ? "100%" : "90%",
  };

  return (
    <div className="button-content" style={buttonContent}>
      {type === "button-menu" ? (
        <div
          className="button-content"
          style={{
            display: "flex",
            flexDirection: "row",
            width: "-webkit-fill-available",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            className="button-menu"
            style={buttonMenuStyle}
            onMouseEnter={() => setIsHoveredButtonMenu(true)}
            onMouseLeave={() => setIsHoveredButtonMenu(false)}
          >
            {text}
          </button>
        </div>
      ) : (
        <button
          className="button-login"
          style={buttonLoginStyle}
          onClick={() => window.location.replace(path)}
          onMouseEnter={() => setIsHoveredButtonLogin(true)}
          onMouseLeave={() => setIsHoveredButtonLogin(false)}
        >
          {text}
        </button>
      )}
    </div>
  );
};

export default ButtonMenu;
