import React, { useEffect, useState } from "react";
import "./MapView.style.css";
import { useGlobalState } from "../../hooks/GlobalStateContext";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import CurrentMarker from "./current-loctaion-marker/CurrentMarker";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarked } from "@fortawesome/free-solid-svg-icons";
import "leaflet-routing-machine";
import "leaflet-control-custom";
import { motion } from "framer-motion";

const { BaseLayer } = LayersControl;

const MapView = () => {
  const { state } = useGlobalState();
  const { clearRoute, layer } = state;

  const [location, setLocation] = useState({
    currentLocation: { lat: 4.570868, lng: -74.297333 },
    zoom: 6,
  });

  useEffect(() => {
    const clearRouteMap = () => {
      if (clearRoute) {
        const routingControl = document.getElementsByClassName(
          "leaflet-routing-container leaflet-bar leaflet-control"
        )[0];
        if (routingControl) {
          routingControl.remove();
        }
      }
    };
    clearRouteMap();
  }, [clearRoute]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          currentLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          zoom: 13,
        });
      });
    }
  }, []);

  const thunderforestApiKey = "a8b55da1ace34ac8b1548ae7b89b7619"; // Reemplaza con tu clave de API de Thunderforest
  const hereApp = {
    appId: "dXuMwCPtrHDaa2DdmRhj", // Reemplaza con tu clave de aplicación HERE
    appCode: "4IxupNVPEAdz_nIz9f1pej8NG-t3PWQkWqgW2pptFIo", // Reemplaza con tu clave de código HERE
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
  };
  // Verificación de que `layer` tenga un valor válido antes de usarlo
  const selectedLayer = layers[layer] || layers.osm;
  
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
      <div className="map">
        <MapContainer center={location.currentLocation} zoom={location.zoom}>
          <LayersControl position="topright">
            <BaseLayer checked name={selectedLayer.name}>
              <TileLayer
                url={selectedLayer.url}
                attribution={selectedLayer.attribution}
              />
            </BaseLayer>
          </LayersControl>
          <CurrentMarker location={location} />
        </MapContainer>
      </div>
    </motion.div>
  );
};

export default MapView;
