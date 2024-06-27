import React from "react";
import { Marker } from "react-leaflet";
import IconLocation from "./IconLocation";

const CurrentMarker = ({ location }) => {
  const { currentLocation } = location; // Extrae las coordenadas de currentLocation
  return (
    <>
      {currentLocation && ( // Verifica si currentLocation está definido
        <Marker
          position={[currentLocation.lat, currentLocation.lng]} // Usa currentLocation
          title="Ubicación Actual"
          icon={IconLocation}
        />
      )}
    </>
  );
};

export default CurrentMarker;
