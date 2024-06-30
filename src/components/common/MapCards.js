import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DataMapCards from "../../assets/data/DataMapCards.json";
import {
  useGlobalState,
  setLayerMap,
  setTypeViewData,
} from "../../hooks/GlobalStateContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsToCircle,
  faCamera,
  faCrosshairs,
  faExpand,
  faLocationArrow,
  faMap,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie"; // Importar Cookies desde js-cookie
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MapCards = ({ type }) => {
  const { dispatch } = useGlobalState();
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [selectedTypeViewData, setSelectedTypeViewData] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const dataMapCards = DataMapCards.settings.menu;

  const icons = {
    faMap: faMap,
    faMapLocationDot: faMapLocationDot,
    faCamera: faCamera,
    faExpand: faExpand,
    faArrowsToCircle: faArrowsToCircle,
    faCrosshairs: faCrosshairs,
    faLocationArrow: faLocationArrow,
  };

  const handleSubMenu = (index) => {
    if (openSubMenu === index) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(index);
    }
  };

  // Cuando se monta el componente, obtener la opción seleccionada guardada en cookies
  useEffect(() => {
    const storedLayer = Cookies.get("layerMapSelected");
    const storedTypeViewData = Cookies.get("typeViewDataSelected");

    if (storedLayer) {
      setSelectedLayer(storedLayer);
      dataMapCards.forEach((button) => {
        const labelButton = button.label;
        if (labelButton === "Tipo de Mapa") {
          button.submenu.forEach((sub) => {
            if (sub.value === storedLayer) {
              setLayerMap(dispatch, sub.value);
            }
          });
        }
      });
    }

    if (storedTypeViewData) {
      setSelectedTypeViewData(storedTypeViewData);
      dataMapCards.forEach((button) => {
        const labelButton = button.label;
        if (labelButton === "Tipo de visuailización") {
          button.submenu.forEach((sub) => {
            if (sub.value === storedTypeViewData) {
              setTypeViewData(dispatch, sub.value);
            }
          });
        }
      });
    }
  }, []);

  const handleMouseEnter = (e) => {
    e.target.style.transition = "all 0.3s";
    e.target.style.cursor = "pointer";
    e.target.style.border = "1px solid #ccc";
    e.target.style.background = "linear-gradient(-45deg, #fff, #fff)";
  };

  const handleMouseLeave = (e) => {
    e.target.style.transition = "all 0.3s";
    e.target.style.cursor = "pointer";
    e.target.style.background = "transparent";
  };

  const handleOptionChange = (optionValue) => {
    dataMapCards.forEach((button) => {
      const labelButton = button.label;
      if (labelButton === "Tipo de Mapa") {
        button.submenu.forEach((sub) => {
          if (sub.value === optionValue) {
            setSelectedLayer(sub.value);
            setLayerMap(dispatch, sub.value);
            Cookies.set("layerMapSelected", sub.value, { expires: 7 });
          }
        });
      } else if (labelButton === "Tipo de visuailización") {
        button.submenu.forEach((sub) => {
          if (sub.value === optionValue) {
            setSelectedTypeViewData(sub.value);
            setTypeViewData(dispatch, sub.value);
            Cookies.set("typeViewDataSelected", sub.value, { expires: 7 });
          }
        });
      }
    });
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      style={{
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(-45deg, rgba(255, 255, 255, 0.8) 10%, rgba(255, 255, 255, 0.7) 40%, rgba(255, 255, 255, 0.9) 70%)",
        width: type !== "search" ? "400px" : "600px",
        height: type !== "search" ? "600px" : "70px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Barra de búsqueda y filtros */}
      {type === "search" ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "flex-end",
          }}
        >
          {/* Filtros dropdowns */}
          <div
            style={{
              display: "flex",
              height: "100%",
              width: "40%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <select
              style={{
                width: "40%",
                height: "40px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                padding: "0 10px",
                fontSize: "16px",
              }}
            >
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <select
              style={{
                width: "40%",
                height: "40px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                padding: "0 10px",
                fontSize: "16px",
              }}
            >
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          {/* Barra de búsqueda */}
          <div
            style={{
              display: "flex",
              width: "60%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Search"
              style={{
                width: "80%",
                height: "40px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                padding: "0 10px",
                fontSize: "16px",
              }}
            />
          </div>
        </div>
      ) : type === "settings" ? (
        // Tarjeta de ajustes de mapa
        <div
          style={{
            display: "grid",
            width: "100%",
            height: "100%",
            gridTemplateRows: "1fr 10fr",
            gridTemplateColumns: "1fr",
          }}
        >
          <div
            className="container-title-settings"
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h3>Ajustes de Mapa</h3>
          </div>
          <div
            className="content-settings"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {dataMapCards.map((button, index) => (
              <div
                key={index}
                className="settings-button"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: openSubMenu === index ? "fit-content" : "5%",
                  margin: "2px 5px",
                }}
              >
                <button
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "40px",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    background: "linear-gradient(-45deg, #f3f3f3, #f3f3f3)",
                  }}
                  onClick={() => handleSubMenu(index)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span style={{ fontSize: "20px", border: "none !important" }}>
                    {button.label}
                  </span>
                  <span style={{ fontSize: "20px", border: "none !important" }}>
                    <FontAwesomeIcon icon={icons[button.icon]} />
                  </span>
                </button>
                {openSubMenu === index && button.submenu && (
                  <div
                    className="settings-submenu"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(-45deg, #f3f3f3, #f3f3f3)",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      margin: "2px 0",
                    }}
                  >
                    {button.submenu.map((subButton, subIndex) => (
                      <div
                        key={subIndex}
                        className="settings-button"
                        style={{ display: "flex", height: "fit-content" }}
                      >
                        <label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <input
                            type="radio"
                            value={subButton.value}
                            checked={ selectedLayer === subButton.value || selectedTypeViewData === subButton.value }
                            onChange={() => handleOptionChange(subButton.value)}
                          />
                          <span style={{ fontSize: "16px", marginLeft: "5px" }}>
                            {subButton.label}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Tarjeta capturas de mapa y rutas almacenadas
        <Slider {...sliderSettings} style={{ width: "100%", height: "100%" }}>
          <div
            style={{
              display: "grid",
              width: "100%",
              height: "100%",
              gridTemplateRows: "1fr 10fr",
              gridTemplateColumns: "1fr",
            }}
          >
            <div
              className="container-title-settings"
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3>Capturas de Mapa</h3>
            </div>
            <div
              className="content-info"
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "grid",
              width: "100%",
              height: "100%",
              gridTemplateRows: "1fr 10fr",
              gridTemplateColumns: "1fr",
            }}
          >
            <div
              className="container-title-settings"
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3>Rutas guardadas</h3>
            </div>
            <div
              className="content-info"
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            ></div>
          </div>
          {/* Puedes agregar más slides aquí */}
        </Slider>
      )}
    </motion.div>
  );
};

export default MapCards;
