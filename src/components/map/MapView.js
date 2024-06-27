import React, { useEffect, useState } from "react";
import "./MapView.css";
import { useGlobalState } from "../../hooks/GlobalStateContext";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import Markers from "./markers/Markers";
import CurrentMarker from "./current-loctaion-marker/CurrentMarker";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarked } from "@fortawesome/free-solid-svg-icons";
import "leaflet-routing-machine";
import "leaflet-control-custom"; // Asegúrate de tener el archivo Awns.json en la misma ubicación que tu componente
import { motion } from "framer-motion";
import Position from "../../assets/data/Positions.json";

const MapView = () => {
  const { state } = useGlobalState();
  const { clearRoute } = state;

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
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <CurrentMarker location={location} />
        </MapContainer>
      </div>
    </motion.div>
  );
};

export default MapView;

