import React, { useEffect, useState, useRef } from "react";
import "./MapView.style.css";
import { useGlobalState } from "../../hooks/GlobalStateContext";
import { MapContainer, TileLayer, LayersControl, useMap } from "react-leaflet";
import CurrentMarker from "./current-loctaion-marker/CurrentMarker";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarked } from "@fortawesome/free-solid-svg-icons";
import "leaflet-routing-machine";
import "leaflet-control-custom";
import { motion } from "framer-motion";
import { polygon } from "leaflet";

const { BaseLayer, Overlay } = LayersControl;

const MapView = () => {
  const thunderforestApiKey = process.env.REACT_APP_THUNDER_FOREST_APIKEY;
  const { state, dispatch } = useGlobalState();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [location, setLocation] = useState(state.currentLocation);
  const { layer, typeViewData } = state;
  const localScreenshotRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (state.currentLocation) {
      setLocation(state.currentLocation);
    }
  }, [state.currentLocation, location.zoom, location.location]);

  useEffect(() => {
    if (localScreenshotRef.current && mapLoaded) {
      const screenshotRef = localScreenshotRef.current;
      screenshotRef.style.width = "100%";
      screenshotRef.style.height = "100%";
      dispatch({ type: "SET_SCREENSHOT_REF", payload: screenshotRef });
    }
  }, [localScreenshotRef, dispatch, mapLoaded]);

  // Reemplaza con tu clave de API de Thunderforest
  const hereApp = {
    appId: "dXuMwCPtrHDaa2DdmRhj", // Reemplaza con tu clave de aplicación HERE
    appCode: "4IxupNVPEAdz_nIz9f1pej8NG-t3PWQkWqgW2pptFIo", // Reemplaza con tu clave de código HERE
  };

  // Hook para actualizar el mapa cuando cambian las coordenadas o el zoom
  const UpdateMap = ({ location }) => {
    const map = useMap();

    useEffect(() => {
      if (map) {
        map.setView(location.location, location.zoom);
      }
    }, [location, map]);

    return null;
  };

  const layers = {
    osm: {
      name: "OpenStreetMap",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "",
    },
    esri: {
      name: "Esri WorldStreetMap",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ",
    },
    cartoVoyager: {
      name: "CartoDB Voyager",
      url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
    cartoPositron: {
      name: "CartoDB Positron",
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
    cartoDark: {
      name: "CartoDB Dark",
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
    thunderforest: {
      name: "Thunderforest Outdoor",
      url: `https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=${thunderforestApiKey}`,
      attribution:
        'Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    here: {
      name: "Here Satellite",
      url: `https://aerial.maps.cit.api.here.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?app_id=${hereApp.appId}&app_code=${hereApp.appCode}`,
      attribution:
        'Map data &copy; 1987-2024 <a href="https://developer.here.com/documentation/map-tile/dev_guide/topics/quick-start.html">HERE</a>',
    },
    wikimedia: {
      name: "Wikimedia",
      url: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
    },
    opentopomap: {
      name: "OpenTopoMap",
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.opentopomap.org">OpenTopoMap</a> contributors',
    },
    openrailwaymap: {
      name: "OpenRailwayMap",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  };

  const dataTypes = {
    default: {
      name: "Default",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "",
    },
    openrailwaymap: {
      name: "OpenRailwayMap",
      url: "https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.openrailwaymap.org">OpenRailwayMap</a> contributors',
    },
    points: {
      name: "Points",
      url: "https://heatmap-external-a.strava.com/tiles/all/bluered/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.strava.com">Strava</a>',
    },
    routes: {
      name: "Routes",
      url: "https://heatmap-external-a.strava.com/tiles/all/bluered/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.strava.com">Strava</a>',
    },
    polygons: {
      name: "Polygons",
      url: "https://heatmap-external-a.strava.com/tiles/all/bluered/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.strava.com">Strava</a>',
    },
    lines: {
      name: "Lines",
      url: "https://heatmap-external-a.strava.com/tiles/all/bluered/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.strava.com">Strava</a>',
    },
    heatmap: {
      name: "HeatMap",
      url: "https://heatmap-external-a.strava.com/tiles/all/bluered/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.strava.com">Strava</a>',
    },
    labels: {
      name: "Labels",
      url: "https://heatmap-external-a.strava.com/tiles/all/bluered/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.strava.com">Strava</a>',
    },
    area: {
      name: "Area",
      url: "https://heatmap-external-a.strava.com/tiles/all/bluered/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.strava.com">Strava</a>',
    },
    density: {
      name: "Density",
      url: "https://heatmap-external-a.strava.com/tiles/all/bluered/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.strava.com">Strava</a>',
    },
    terrain: {
      name: "Terrain",
      url: "https://heatmap-external-a.strava.com/tiles/all/bluered/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.strava.com">Strava</a>',
    },
  };


  // Verificación de que `layer` tenga un valor válido antes de usarlo
  const selectedLayer = layers[layer] || layers.osm;
  const selectedTypeViewData = dataTypes[typeViewData] || dataTypes.default;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="container-map"
    >
      <div className="title">
        <FontAwesomeIcon icon={faMapMarked} />
        <span>Mapa Interactivo</span>
      </div>
      <div className="map" ref={localScreenshotRef}>
        <MapContainer
          center={location.location}
          zoom={location.zoom}
          whenReady={() => setMapLoaded(true)} // Marca el mapa como cargado cuando esté listo
          ref={mapRef}
        >
          <LayersControl position="topright">
            <BaseLayer checked name={selectedLayer.name}>
              <TileLayer
                url={selectedLayer.url}
                attribution={selectedLayer.attribution}
              />
            </BaseLayer>
            {/* Capa de analisis sobre el mapa*/}
            {selectedTypeViewData !== "default" ? (
              <Overlay checked name="OpenRailwayMap">
                <TileLayer
                  url={selectedTypeViewData.url}
                  attribution={selectedTypeViewData.attribution}
                />
              </Overlay>
            ) : null}
          </LayersControl>
          {location.state !== "default" ? (
            <CurrentMarker location={location.location} />
          ) : null}
          <UpdateMap location={location} />
        </MapContainer>
      </div>
    </motion.div>
  );
};

export default MapView;
