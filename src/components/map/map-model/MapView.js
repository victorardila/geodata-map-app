import React, { useEffect, useState } from "react";
import "./MapView.css";
import { useGlobalState } from "../../../hooks/GlobalStateContext";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import Markers from "../markers/Markers";
import CurrentMarker from "../current-loctaion-marker/CurrentMarker";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarked } from "@fortawesome/free-solid-svg-icons";
import "leaflet-routing-machine";
import "leaflet-control-custom"; // Asegúrate de tener el archivo Awns.json en la misma ubicación que tu componente
import { motion } from "framer-motion";
import Position from "../../../assets/data/Positions.json";

const MapView = (route, { checkNodes, checkSeeRoute, transport }) => {
  const { state } = useGlobalState();
  const { clearRoute } = state;

  const [location, setLocation] = useState({
    currentLocation: { lat: 4.570868, lng: -74.297333 },
    zoom: 6,
  });
  function buscarRuta(route) {
    const latitudes = [];
    const longitudes = [];
    if (route.route.length > 0) {
      const rutaCompleta = route.route;
      const ciudades = rutaCompleta.split("->").map((ciudad) => ciudad.trim());
      for (let i = 0; i < ciudades.length; i++) {
        const ciudad = ciudades[i];
        if (Position[ciudad]) {
          latitudes.push(Position[ciudad].lat);
          longitudes.push(Position[ciudad].lon);
        }
      }
    }
    return { longitudes, latitudes };
  }
  function Routing({ route }) {
    const ubicaciones = buscarRuta(route);
    const map = useMap();
    //necesito recorrer la lista de latitudes y longitudes y pintarlas en el mapa
    useEffect(() => {
      if (
        ubicaciones.longitudes.length > 1 &&
        ubicaciones.latitudes.length > 1
      ) {
        // Crea una matriz de puntos de ruta con las latitudes y longitudes
        const waypoints = [];
        for (let i = 0; i < ubicaciones.longitudes.length; i++) {
          waypoints.push(
            L.latLng(ubicaciones.latitudes[i], ubicaciones.longitudes[i])
          );
        }

        // Limpia cualquier enrutamiento anterior
        map.eachLayer(function (layer) {
          if (layer instanceof L.Routing.Control) {
            map.removeControl(layer);
          }
        });

        // Agrega una nueva capa de enrutamiento
        L.Routing.control({
          waypoints,
          routeWhileDragging: true,
          autoRoute: true,
          show: checkSeeRoute, // Esto muestra la ruta en el mapa
          // lineOptions: {
          //  styles: [
          //     {color: 'orange', opacity: 0.2, weight: 4},
          //  ],
          // },
          createMarker: function (i, waypoint, n) {
            // Crea marcadores para los puntos de ruta (opcional)
            return null;
          },
        }).addTo(map);
      }
    }, [ubicaciones, map]);
  }

  useEffect(() => {
    const clearRouteMap = () => {
      if (clearRoute) {
        console.log("clearRouteMap");
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
      className="container"
    >
      <div className="title">
        <FontAwesomeIcon icon={faMapMarked} />
        <span>Mapa Interactivo</span>
      </div>
      <div className="map">
        <MapContainer center={location.currentLocation} zoom={location.zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <CurrentMarker location={location} />
          <Markers checkNodes={checkSeeRoute} />
          <Routing route={route} />
        </MapContainer>
      </div>
    </motion.div>
  );
};

export default MapView;

