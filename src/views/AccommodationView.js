import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";

export default function AccommodationView(props){
    function renderHotelsCB(hotel){
        return (
            <span key={hotel.id}>
                <div>{hotel.hotel_name}</div>
            </span>
        );
    }
    
    return (
        <div className = "background_image">
            <Navigation></Navigation>
            Det här är hotell.
            <div className="box">
                <ul className="boxItems">
                   hotel 1
                   <div className="image"> image</div>
                </ul>
                <ul className="boxItems">
                   hotel 2
                   <div className="image"> image</div>
                </ul>
                <ul className="boxItems">
                   hotel 3
                   <div className="image"> image</div>
                </ul>
            </div>
        </div>
        );
}