import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";
import {
    MapContainer,
    TileLayer,
    Popup,
    Marker,
  } from 'react-leaflet'

function ActivityView(props){
    const position = props.position;

    return (
        <div className = "background_image">
            <Navigation></Navigation>
            <div className="box">
            <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="leaflet">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            </MapContainer>

            </div>
            
        </div>
        );
}
export default ActivityView;