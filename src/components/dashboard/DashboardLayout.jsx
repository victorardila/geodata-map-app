import React, { useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import MapCards from "../common/MapCards";
import Overview from "../../modules/dashboard/Overview";
import Datatraement from "../../modules/dashboard/DataTraement";
import Predictions from "../../modules/dashboard/Predictions";
import Help from "../../modules/dashboard/Help";
import Settings from "../../modules/dashboard/Settings";
import { useGlobalState, setMapCards } from "../../hooks/GlobalStateContext";
import "./DashboardLayout.style.css";
import Cookies from "js-cookie";
import MapView from "../map/MapView";

const DashboardLayout = ({ path }) => {
  const { state, dispatch } = useGlobalState();

  useEffect(() => {
    // Obtengo los valores de las cookies y lo asigno al GlobalState
    const cookieStates = [
      "searchCheckState",
      "infoCheckState",
      "settingsCheckState",
    ];
    cookieStates.forEach((cookie) => {
      const value = Cookies.get(cookie);
      if (value !== undefined) {
        const key =
          cookie === "searchCheckState"
            ? "2-1"
            : cookie === "infoCheckState"
            ? "2-2"
            : "2-3";
        const visible = value === "true";
        // console.log(key, visible);
        dispatch({
          type: key === "2-1" ? "search" : key === "2-2" ? "info" : "settings",
          visible,
        });
        setMapCards(
          dispatch,
          key === "2-1" ? "search" : key === "2-2" ? "info" : "settings",
          visible
        );
      }
    });
  }, [dispatch]);

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
                {path === "dashboard/map" ? (
                  <>
                    <div
                      className="search-bar-container"
                      style={{
                        display: state.mapCards.search.visible
                          ? "block"
                          : "none",
                      }}
                    >
                      {state.mapCards.search.visible ? (
                        <MapCards type={"search"} />
                      ) : null}
                    </div>
                    <div
                      className="container-settings-map"
                      style={{
                        display: state.mapCards.settings.visible
                          ? "block"
                          : "none",
                      }}
                    >
                      {state.mapCards.settings.visible ? (
                        <MapCards type={"settings"} />
                      ) : null}
                    </div>
                    <div
                      className="container-info-map"
                      style={{
                        display: state.mapCards.info.visible ? "block" : "none",
                      }}
                    >
                      {state.mapCards.info.visible ? (
                        <MapCards type={"info"} />
                      ) : null}
                    </div>
                  </>
                ) : null}
                {/* Componentes por rutas */}
                {path === "dashboard/overview" ? (
                  <Overview />
                ) : path === "dashboard/datatraement" ? (
                  <Datatraement />
                ) : path === "dashboard/map" ? (
                  <MapView />
                ): path === "dashboard/predictions" ? (
                  <Predictions />
                ): path === "dashboard/help" ? (
                  <Help />
                ): path === "dashboard/settings" ? (
                  <Settings />
                ) : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
