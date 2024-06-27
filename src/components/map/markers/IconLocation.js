import { resources } from "../../../assets/resources";
import L  from "leaflet";

const IconLocation = L.icon({
    iconUrl: resources.pointLocation,
    shadowUrl: resources.shadowIcon,
    iconSize: [30, 30],
    shadowSize: [30, 30],
    iconAnchor: [15, 30],
    shadowAnchor: [15, 30],
    popupAnchor: [0, -30],
});

export default IconLocation;
