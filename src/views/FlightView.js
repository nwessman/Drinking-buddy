import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";

export default function renderFlights(props){
    const flightData = Object.keys(props.flights);
    console.log("Hej: " + flightData)


    function renderFlightsCB(item){

        function buttonClickACB(){
            window.location = "https://www.aviasales.com" + props.link;
        }

        return(
            <div className="flightsContainer">
                <div className="flight">
                    <p >{item.origin}</p>
                </div>
                <button onClick = {buttonClickACB}>Book flight</button>
            </div>
        
        )
    }
    
    return (
        <div className = "background_image">
            <Navigation></Navigation>
            <div className="box">
                {flightData.map(renderFlightsCB)}
            </div>
        </div>
        );
}