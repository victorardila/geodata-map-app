import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import Offers from "../../assets/data/Offers.json";

const OffersContainer = ({ offer }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleClick = (offer) => {
    navigate("/payment-market", { state: { offer } });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "-webkit-fill-available",
      }}
    >
      {offer ? (
        <div
            style={{
              display: "flex",
              height:"60%",
              width: "60%",
              flexDirection: "column",
              alignItems: "center",
              marginRight: "1%",
              marginLeft: "1%",
              transition: "height 0.3s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "10%",
                width: "80%",
                background: offer.color,
                color: "white",
                fontSize: "22px",
                fontWeight: "bold",
                borderTopRightRadius: "80px",
                borderTopLeftRadius: "80px",
              }}
            >
              {offer.title}
            </div>
            <div
              style={{
                display: "flex",
                height: "90%",
                width: "100%",
                flexDirection: "column",
                justifyContent: "center",
                background: "rgba(255, 255, 255, 0.9)",
                alignItems: "center",
                border: "1px solid rgba(0, 0, 0, 0.3)",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  height: "60px",
                  width: "100%",
                  fontSize: "30px",
                  background: offer.color,
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                <h2 style={{ padding: "0px", margin: "0px", color: "white" }}>
                  ${offer.price}
                </h2>
              </div>
              <div
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
              />
              <p style={{ color:"black", textShadow: "none" }}>{offer.description}</p>
              <div
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
              />
              <div style={{ height: "-webkit-fill-available", width: "100%" }}>
                {offer.benefits.map((benefit, index) => (
                  <div key={index}>
                    <h3>{benefit.title}</h3>
                    <p style={{ color:"black", textShadow: "none" }}>{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
      ) : (
        Offers.map((offer, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              height: hoveredIndex === index ? "65%" : "60%",
              width: "20%",
              flexDirection: "column",
              alignItems: "center",
              marginRight: "1%",
              marginLeft: "1%",
              transition: "height 0.3s ease",
              transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
              cursor: hoveredIndex === index ? "pointer" : "default",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleClick(offer)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "10%",
                width: "80%",
                background: offer.color,
                color: "white",
                fontSize: "22px",
                fontWeight: "bold",
                borderTopRightRadius: "80px",
                borderTopLeftRadius: "80px",
              }}
            >
              {offer.title}
            </div>
            <div
              style={{
                display: "flex",
                height: "90%",
                width: "100%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid rgba(0, 0, 0, 0.3)",
                borderRadius: "10px",
                boxShadow:
                  hoveredIndex === index
                    ? "0 10px 20px rgba(0, 0, 0, 0.2)"
                    : "5px 5px 5px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div
                style={{
                  height: "60px",
                  width: "100%",
                  fontSize: "30px",
                  background: offer.color,
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                <h2 style={{ padding: "0px", margin: "0px", color: "white" }}>
                  ${offer.price}
                </h2>
              </div>
              <div
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
              />
              <p>{offer.description}</p>
              <div
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
              />
              <div style={{ height: "-webkit-fill-available", width: "100%" }}>
                {offer.benefits.map((benefit, index) => (
                  <div key={index}>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                ))}
              </div>
              <div
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "20%",
                  width: "100%",
                }}
              >
                <button
                  style={{
                    backgroundColor: hoveredIndex === index ? "red" : "green",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    cursor: "pointer",
                    width: "80%",
                    borderRadius: "5px",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OffersContainer;
