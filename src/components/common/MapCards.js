import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import DataMapCards from "../../assets/data/DataMapCards.json";
import {
  useGlobalState,
  setLayerMap,
  setTypeViewData,
  setCurrentLocation,
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
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import html2canvas from "html2canvas";
import Cookies from "js-cookie";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MapCards = ({ type }) => {
  const { state, dispatch } = useGlobalState();
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [selectedTypeViewData, setSelectedTypeViewData] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const dataMapCards = DataMapCards.settings.menu;

  const icons = {
    faMap: faMap,
    faMapLocationDot: faMapLocationDot,
    faCamera: faCamera,
    faExpand: faExpand,
    faArrowsToCircle: faArrowsToCircle,
    faCrosshairs: faCrosshairs,
    faLocationArrow: faLocationArrow,
    faSearch: faSearch,
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleOnClick = (index) => {
    dataMapCards.forEach((button, i) => {
      if (i === 0 || i === 1) {
        if (openSubMenu === index) {
          setOpenSubMenu(null);
        } else {
          setOpenSubMenu(index);
        }
      } else {
        // Botones sin submenu
        if (i === index) {
          if (button.label === "Tomar Captura de Mapa") {
            handleTakeScreenshot();
          } else if (button.label === "Centrar Mapa") {
            handleCenterMap();
          } else if (button.label === "Mostrar Ubicación Actual") {
            handleFindCurrentLocation();
          }
        }
      }
    });
  };

  const handleCenterMap = () => {
    const currentLocation = {
      location: state.currentLocation.location,
      zoom: 5,
      state: "current",
    };
    setCurrentLocation(dispatch, currentLocation);
    Cookies.set("currentLocation", JSON.stringify(currentLocation), {
      expires: 7,
    });
  };

  const handleFindCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = {
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          zoom: 14,
          state: "current",
        };
        setCurrentLocation(dispatch, currentLocation);
        Cookies.set("currentLocation", JSON.stringify(currentLocation), {
          expires: 7,
        });
      });
    }
  };

  const handleTakeScreenshot = async () => {
    if (state.screenshotRef) {
      setTimeout(async () => {
        // capturará la imagen del mapa leaflet y la guardará en el estado imageURL
        const canvas = await html2canvas(state.screenshotRef);
        const dataURL = canvas.toDataURL("ScreenshopMap/png");
        setImageURL(dataURL);
        // mostrar la imagen en una nueva ventana del navegador y ponerle a la url el dataURL
        const newWindow = window.open();
        newWindow.document.write(
          `<body style="margin: 0;">
            <div style="display: flex; flex-direction: column; width: 100%; height: 100%; border: none">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 1fr; width: -webkit-fill-available; height: 5%; justify-content: center; align-items: center; background-color: white; border: 1px solid #ccc; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                <hr></hr>
                <h3 style="margin: 0; text-align: center;">Captura de Mapa</h3>
                <div style="display: flex; width: 100%; height: 100%; justify-content: center; align-items: center;">
                  <buton style="width:10%; border: none; background: transparent; font-size: 20px; cursor: pointer;">
                    <a href="${dataURL}" download="screenshot.png" style="display: flex; height: 100%; color: black; font-size: 20px; cursor: pointer; justify-content: center; align-items: center;">
                      <img src="https://img.icons8.com/ios/50/000000/download.png" style="height: 60%;" />
                    </a>
                  </buton>
                  <button style="height: 100%; width:10%; border: none; background: transparent; font-size: 20px; cursor: pointer;" onclick="window.close();">X</button>
                </div>
              </div>
              <div style="display: flex; width: -webkit-fill-available; height: 92%; justify-content: center; align-items: center; padding: 10px;">
                <img src="${dataURL}" style="width: 100%; height: 100%; border-radius: 10px;" />
              </div>
            </div>
          </body>
          `
        );
      }, 100); // Pequeño retraso de 100ms
    }
  };

  const handleEnterSettings = (e) => {
    e.target.style.transition = "all 0.3s";
    e.target.style.cursor = "pointer";
    e.target.style.background = "linear-gradient(-45deg, #fff, #fff)";
  };

  const handleLeaveSettings = (e) => {
    e.target.style.transition = "all 0.3s";
    e.target.style.cursor = "pointer";
    e.target.style.background = "transparent";
  };

  const handleSearchValue = (e) => {
    console.log(e.target.value);
  };

  const handleEnterSearch = (e) => {
    e.target.style.transition = "all 0.3s";
    e.target.style.cursor = "pointer";
  }

  const handleLeaveSearch = (e) => {
    e.target.style.transition = "all 0.3s";
    e.target.style.cursor = "pointer";
  }

  const handleOptionChangeRadio = (optionValue, button) => {
    if (button === "Tipo de Mapa") {
      // obtengo el submenu de la opción seleccionada de dataMapCards de forma directa
      const submenu = dataMapCards[0].submenu.find(
        (sub) => sub.value === optionValue
      );
      setSelectedLayer(submenu.value);
      setLayerMap(dispatch, submenu.value);
      Cookies.set("layerMapSelected", submenu.value, { expires: 7 });
    } else if (button === "Tipo de visuailización") {
      // obtengo el submenu de la opción seleccionada de dataMapCards de forma directa
      const submenu = dataMapCards[1].submenu.find(
        (sub) => sub.value === optionValue
      );
      setSelectedTypeViewData(submenu.value);
      setTypeViewData(dispatch, submenu.value);
      Cookies.set("typeViewDataSelected", submenu.value, { expires: 7 });
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
    } else {
      console.log("No hay layer guardado");
      setLayerMap(dispatch, "osm");
      setSelectedLayer("osm");
      Cookies.set("layerMapSelected", "osm", { expires: 7 });
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
    } else {
      console.log("No hay typeViewData guardado");
      setTypeViewData(dispatch, "default");
      setSelectedTypeViewData("default");
      Cookies.set("typeViewDataSelected", "default", { expires: 7 });
    }
  }, [dispatch, dataMapCards, setSelectedLayer, setSelectedTypeViewData]);

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
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s",
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
              width: "-webkit-fill-available",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <select
              style={{
                width: "40%",
                height: "40px",
                borderRadius: "5px",
                background: "white",
                boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                border: "0.5px solid rgba(0, 0, 0, 0.2)",
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
                background: "white",
                boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                border: "0.5px solid rgba(0, 0, 0, 0.2)",
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
          <div
            style={{
              display: "flex",
              width: "75%",
              height: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {/* Barra de búsqueda */}
            <div
              style={{
                display: "flex",
                width: "80%",
                height: "40px",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 10px",
              }}
            >
              <input
                type="text"
                placeholder="Search"
                onChange={handleSearchValue}
                style={{
                  width: "100%",
                  height: "100%",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                  borderLeft: "1px solid #ccc",
                  borderRight: "none",
                  borderTop: "1px solid #ccc",
                  borderBottom: "1px solid #ccc",
                  padding: "0 10px",
                  fontSize: "18px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  width: "5%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "white",
                  borderTop: "1px solid #ccc",
                  borderBottom: "1px solid #ccc",
                  borderRight: "1px solid #ccc",
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
                onMouseEnter={handleEnterSearch}
                onMouseLeave={handleLeaveSearch}
              >
                <FontAwesomeIcon icon={icons.faSearch} />
              </div>
            </div>
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
            {/* Botones de ajustes de mapa */}
            {dataMapCards.map((button, index) => (
              <div
                key={index}
                className="settings-button"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height:
                    openSubMenu === index && button.submenu
                      ? "fit-content"
                      : "5%",
                  margin: "2px 5px",
                }}
              >
                {/* Boton de ajuste personalizado */}
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
                  onClick={() => handleOnClick(index)}
                  onMouseEnter={handleEnterSettings}
                  onMouseLeave={handleLeaveSettings}
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
                            checked={
                              selectedLayer === subButton.value ||
                              selectedTypeViewData === subButton.value
                            }
                            onChange={() =>
                              handleOptionChangeRadio(
                                subButton.value,
                                button.label
                              )
                            }
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
