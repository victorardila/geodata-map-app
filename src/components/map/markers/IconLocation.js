import PointLocation from '../../../assets/gif/location_map.gif';
import ShadowIcon from "../../../assets/gif/location_map_shadow.gif";
import L  from "leaflet";

const IconLocation = L.icon({
    iconUrl: PointLocation,
    shadowUrl: ShadowIcon,
    iconSize: [30, 30],
    shadowSize: [30, 30],
    iconAnchor: [15, 30],
    shadowAnchor: [15, 30],
    popupAnchor: [0, -30],
});

export default IconLocation;
