import React from "react";
import Flags from "../../assets/data/Flags.json";
import vision from "../../assets/image/vision.png";
import mision from "../../assets/image/mision.png";
import logros from "../../assets/image/logros.png";

const images = {
  "mision.png": mision,
  "vision.png": vision,
  "logros.png": logros,
};

const FlagTriads = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Bandera de Triads */}
      {Flags.map((flag, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              height: "80%",
              width: "20%",
              background: flag.Color,
              borderLeft: "1px solid rgba(0, 0, 0, 0.2)",
              borderRight: "1px solid rgba(0, 0, 0, 0.2)",
              borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
              borderTopRightRadius: "50px",
              borderTopLeftRadius: "50px",
              borderBottomRightRadius: "120px",
              borderBottomLeftRadius: "120px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              marginLeft: "20px",
              marginRight: "20px",
              boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            // Agrega la regla :hover para el efecto de aumento de tamaño
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <div
              style={{
                display: "flex",
                height: "6%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  borderLeft: "90px solid transparent",
                  borderRight: "90px solid transparent",
                  borderTop: "80px solid white",
                }}
              ></div>
            </div>
            {/* Contenido de la bandera */}
            <div style={{ display: "flex", height: "94%", width: "100%" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: "1fr 4fr 3fr",
                  width: "100%",
                  height: "100%",
                }}
              >
                <h1 style={{ color: "white" }}>{flag.Title}</h1>
                <p style={{ color: "white", alignSelf: "center", justifySelf:"center", textAlign: "justify", paddingLeft:"20px", paddingRight:"20px" }}>{flag.Description}</p>
                <img src={images[flag.Image]} alt={flag.Title} style={{width:"80%", alignSelf: "center", justifySelf:"center"}} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FlagTriads;
