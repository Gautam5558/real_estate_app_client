import React, { useEffect } from 'react'
import "./map.css"
import { MapContainer, TileLayer } from "react-leaflet"
import GeoCoderMarker from '../geocodermarker/GeoCoderMarker'


const Map = ({ address, city, country }) => {


    return (
        <MapContainer
            center={[53.35, 18.8]}
            zoom={3}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "36vh", marginTop: "20px", zIndex: 0, borderRadius: "5px" }}
        >
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <GeoCoderMarker address={`${address} ${city} ${country}`} />
        </MapContainer>
    )
}

export default Map