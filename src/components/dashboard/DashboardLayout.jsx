import React, { useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import MapCards from "../common/MapCards";
import { useGlobalState } from "../../hooks/GlobalStateContext";
import "./DashboardLayout.style.css";
import Cookies from "js-cookie";
import MapView from "../map/MapView";

const DashboardLayout = ({ path }) => {
  const { state, dispatch } = useGlobalState();

  useEffect(() => {
    const search = Cookies.get("searchCheckState");
    const settings = Cookies.get("settingsCheckState");
    const info = Cookies.get("infoCheckState");

    // Update checkbox states and dispatch actions based on cookie values
    if (search !== undefined && search !== null) {
      dispatch({
        type: "SET_MAP_CARDS",
        payload: { type: "search", visible: search === "true" },
      });
    }
    if (settings !== undefined && settings !== null) {
      dispatch({
        type: "SET_MAP_CARDS",
        payload: { type: "settings", visible: settings === "true" },
      });
    }
    if (info !== undefined && info !== null) {
      dispatch({
        type: "SET_MAP_CARDS",
        payload: { type: "info", visible: info === "true" },
      });
    }
  }, [state, dispatch]); // Dependencia 'state' asegura que se ejecute cuando 'state' cambie

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
                  ) : null}
                </div>
                <div className="container-settings-map">
                  {state.mapCards.settings.visible ? (
                    <MapCards type={"settings"} />
                  ) : null}
                </div>
                <div className="container-info-map">
                  {state.mapCards.info.visible ? (
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