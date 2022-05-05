import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";
import {exFlights} from "./flights";

export default function renderFlights(props){
    function renderFlights(){
        console.log("Flights: " + props.flights);

        function buttonClickACB(){
            window.location = "https://www.aviasales.com" + props.link;
        }

        return(
            <div className="flightsContainer">
                <div className="flight">
                    <p >{props.origin}</p>
                    <p >{props.depart_date}</p>
                    <div className = "flightBar"></div>
                    <p >{props.destination}</p>
                    <p>{props.return_date}</p>
                </div>
                <button onClick = {buttonClickACB}>Book flight</button>
            </div>
        
        )
    }
    
    return (
        <div className = "background_image">
            <Navigation></Navigation>
            <div>
                {props.hotels.map(renderFlights)}
            </div>
        </div>
        );
}