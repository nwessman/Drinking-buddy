import React from "react";
import "../App.css";
import { IoIosSearch} from "react-icons/io";
import Navigation from "../reactjs/NavigationPresenter";
import {
    MapContainer,
    TileLayer,
    Popup,
    Marker,
  } from 'react-leaflet'

function ActivityView(props){
    const position = [51.505, -0.09];

    return (
        <div className = "background_image">
            <Navigation></Navigation>
            <div className="activity">
            <MapContainer className="leafletMap" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
   
            <div className="searchActivity">
                <input type = "text" placeholder = "Search..." className="searchInputA"/>
            </div>
            <div className="searchActivity">
            <button  className="searchAButton" style = {{opacity: .8}}><IoIosSearch size="35px"/></button>
            </div>
            </div>
            
        </div>
        );
}
export default ActivityView;