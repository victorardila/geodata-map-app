import React from 'react'
import { Marker } from "react-leaflet";
import IconLocation from './IconLocation';
import Positions from '../../../assets/data/Positions.json';

const Markers = ({checkNodes}) => {
    return(
        <>
            {Object.keys(Positions).map(city => (
                <Marker
                    key={city}
                    position={[Positions[city].lat, Positions[city].lon]}
                    title={Positions[city].numero}
                    icon={IconLocation}
                />
            ))}
        </>
    );
}

export default Markers