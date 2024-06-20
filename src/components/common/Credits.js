import React from "react";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Credits = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "-webkit-fill-available",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>
          Designed and developed by{" "}
          <a
            href="https://portafolio-web-profesional.web.app/"
            target="_blank"
            rel="noreferrer"
          >
            Victor Ardila
          </a>
        </p>
        <Logo />
      </div>
      {/*Espacio para redactar un mensaje directo a whatsapp*/}
      <div style={{ display: "flex", width:"15%", flexDirection: "column", alignItems:"center", justifyContent:"center", borderLeft: "1px solid rgba(0,0,0, 0.2)", borderRight: "1px solid rgba(0,0,0, 0.2)" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems:"center", justifyContent:"center" }}>
          <a href="https://wa.me/573168280456" target="_blank" rel="noreferrer">
            <FontAwesomeIcon
              icon={faWhatsapp}
              style={{
                color: "#25d366",
                fontSize: "30px",
                margin: "0 5px",
              }}
            />
          </a>
          <h3>Send a message</h3>
        </div>
        <input type="text" placeholder="Type your name here" style={{
          width: "200px",
          height: "30px",
          borderRadius: "10px",
          border: "1px solid grey",
          margin: "10px 0",
          padding: "0 2px",
          fontSize: "16px"
        }} />
        <input type="text" placeholder="Type your message here" style={{
          width: "200px",
          height: "60px",
          borderRadius: "10px",
          border: "1px solid grey",
          margin: "10px 0",
          padding: "0 2px",
          fontSize: "16px"
        }} />
        <button>Send</button>
      </div>
    </div>
  );
};

export default Credits;
