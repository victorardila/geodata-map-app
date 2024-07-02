import React from "react";
import { Marker } from "react-leaflet";
import IconLocation from "./IconLocation";

const CurrentMarker = ({ location }) => {
  return (
    <>
      {location && ( // Verifica si currentLocation está definido
        <Marker
          position={[location.lat, location.lng]} // Usa currentLocation
          title="Ubicación Actual"
          icon={IconLocation}
        />
      )}
    </>
  );
};

export default CurrentMarker;
