import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import Map from "../map/MapView";
import MapCards from "../common/MapCards";
import { useGlobalState } from "../../hooks/GlobalStateContext";
import "./DashboardLayout.style.css";
import Cookies from "js-cookie";

const DashboardLayout = ({ path }) => {
  const { dispatch } = useGlobalState();
  const [checkboxStates, setCheckboxStates] = useState({
    "2-1": false,
    "2-2": false,
    "2-3": false,
  });

  useEffect(() => {
    const search = Cookies.get("searchCheckState");
    const settings = Cookies.get("settingsCheckState");
    const info = Cookies.get("infoCheckState");

    // Update checkbox states and dispatch actions based on cookie values
    if (search !== undefined && search !== null) {
      setCheckboxStates((prevStates) => ({
        ...prevStates,
        "2-1": search === "true",
      }));
      dispatch({
        type: "search",
        visible: search === "true",
      });
    }
    if (settings !== undefined && settings !== null) {
      setCheckboxStates((prevStates) => ({
        ...prevStates,
        "2-2": settings === "true",
      }));
      dispatch({
        type: "settings",
        visible: settings === "true",
      });
    }
    if (info !== undefined && info !== null) {
      setCheckboxStates((prevStates) => ({
        ...prevStates,
        "2-3": info === "true",
      }));
      dispatch({
        type: "info",
        visible: info === "true",
      });
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="layout-app">
      <Sidebar />
      <div className="layout-content">
        <Header />
        <div className="content-wrapper">
          <div className="content-wrapper-card">
            <div className="content-wrapper-card-relative">
              {/*Capa de personalizacion por encima de leaflet*/}
              <div className="search-bar-container">
                {
                  checkboxStates["2-1"] ? (
                    <MapCards type={"search"} />
                  ) : null
                }
              </div>
              <div className="container-settings-map">
                {
                  checkboxStates["2-3"] ? (
                    <MapCards type={"settings"} />
                  ) : null
                }
              </div>
              <div className="container-info-map">
                {
                  checkboxStates["2-2"] ? (
                    <MapCards type={"info"} />
                  ) : null
                }
              </div>
              {path === "dashboard/map" ? <Map /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
