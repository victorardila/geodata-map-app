import React, { useEffect, useCallback, lazy } from "react";
import { useGlobalState, setMapCards } from "../../hooks/GlobalStateContext";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import MapCards from "../common/MapCards";
import "./DashboardLayout.style.css";

// Importar componentes de forma dinámica
const Overview = lazy(() => import("../../modules/dashboard/Overview"));
const DataTreatment = lazy(() => import("../../modules/dashboard/DataTreatment"));
const Predictions = lazy(() => import("../../modules/dashboard/Predictions"));
const Help = lazy(() => import("../../modules/dashboard/Help"));
const Settings = lazy(() => import("../../modules/dashboard/Settings"));
const MapView = lazy(() => import("../map/MapView"));

const DashboardLayout = () => {
  const { "*": component } = useParams();
  const { state, dispatch } = useGlobalState();

  const updateStateFromCookies = useCallback(() => {
    const cookieStates = [
      { name: "searchCheckState", type: "search", key: "2-1" },
      { name: "infoCheckState", type: "info", key: "2-2" },
      { name: "settingsCheckState", type: "settings", key: "2-3" },
    ];

    cookieStates.forEach(({ name, type, key }) => {
      const value = Cookies.get(name);
      if (value !== undefined) {
        const visible = value === "true";
        dispatch({ type, visible });
        setMapCards(dispatch, type, visible);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    updateStateFromCookies();
  }, [updateStateFromCookies]);

  const renderMapCards = () => (
    <>
      {["search", "settings", "info"].map((type) => (
        <div
          key={type}
          className={`container-${type}-map`}
          style={{ display: state.mapCards[type].visible ? "block" : "none" }}
        >
          {state.mapCards[type].visible && <MapCards type={type} />}
        </div>
      ))}
    </>
  );

  const components = {
    "": <Overview />,
    overview: <Overview />,
    datatraement: <DataTreatment />,
    map: (
      <>
        {renderMapCards()}
        <MapView />
      </>
    ),
    predictions: <Predictions />,
    help: <Help />,
    settings: <Settings />,
  };

  return (
    <div className="dashboard-layout">
      <div className="layout-app">
        <Sidebar />
        <div className="layout-content">
          <Header />
          <div className="content-wrapper">
            <div className="content-wrapper-card">
              <div className="content-wrapper-card-relative">
                {components[component] || null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;