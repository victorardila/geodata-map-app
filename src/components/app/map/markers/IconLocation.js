import PointLocation from "../../../../assets/icon/point_location.png";
import ShadowIcon from "../../../../assets/icon/current_location_shadow.png";
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
