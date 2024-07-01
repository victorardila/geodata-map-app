import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import MapCards from "../common/MapCards";
import { useGlobalState } from "../../hooks/GlobalStateContext";
import "./DashboardLayout.style.css";
import Cookies from "js-cookie";
import MapView from "../map/MapView";

const DashboardLayout = ({ path }) => {
  const { state } = useGlobalState();
  const [searchState, setSearchState] = useState(false);
  const [settingsState, setSettingsState] = useState(false);
  const [infoState, setInfoState] = useState(false);

  useEffect(() => {
    // Obtengo los valores de las cookies y los asigno a los estados
    const cookieStates = ["searchCheckState", "infoCheckState", "settingsCheckState"];
    cookieStates.forEach((cookie) => {
      const value = Cookies.get(cookie);
      if (value !== undefined) {
        const key = cookie === "searchCheckState" ? "search" :
                    cookie === "infoCheckState" ? "info" : "settings";
        const visible = value === "true";
        if (key === "search") setSearchState(visible);
        if (key === "info") setInfoState(visible);
        if (key === "settings") setSettingsState(visible);
        console.log(cookie, value);
      }
    });
  }, []);

  return (
    <div className="dashboard-layout">
      <div className="layout-app">
        <Sidebar />
        <div className="layout-content">
          <Header />
          <div className="content-wrapper">
            <div className="content-wrapper-card">
              <div className="content-wrapper-card-relative">
                {/* Capa de personalizacion por encima de leaflet */}
                <div className="search-bar-container">
                  {state.mapCards.search.visible ? (
                    <MapCards type={"search"} />
                  ) : searchState ? (
                    <MapCards type={"search"} />
                  ) : null}
                </div>
                <div className="container-settings-map">
                  {state.mapCards.settings.visible ? (
                    <MapCards type={"settings"} />
                  ) : settingsState ? (
                    <MapCards type={"settings"} />
                  ) : null}
                </div>
                <div className="container-info-map">
                  {state.mapCards.info.visible ? (
                    <MapCards type={"info"} />
                  ) : infoState ? (
                    <MapCards type={"info"} />
                  ) : null}
                </div>
                {/* Mapa de leaflet */}
                {path === "dashboard/map" ? <MapView /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;