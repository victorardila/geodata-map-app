import CurrentLocation from '../../../assets/gif/location_map.gif';
import CurrentLocationShadow from '../../../assets/gif/location_map_shadow.gif';
import L  from "leaflet";

const IconLocation = L.icon({
    iconUrl: CurrentLocation,
    shadowUrl: CurrentLocationShadow,
    iconSize: [55, 55],
    shadowSize: [58, 58],
    iconAnchor: [15, 30],
    shadowAnchor: [15, 32],
    popupAnchor: [0, -30],
});

export default IconLocation;