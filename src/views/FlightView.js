import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";

export default function renderFlights(props){
    console.log(props.flights);

    function renderFlightsCB(item){

        function buttonClickACB(){
            window.location = "https://www.aviasales.com" + item.link;
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
    
    if(props.flights.prices !== undefined){
    return (
        <div className = "background_image">
            <Navigation></Navigation>
            <div className="box">
                {props.flights.prices.map(renderFlightsCB)}
            </div>
        </div>
        );
    } else {
    return (
        <div className = "background_image">
        <Navigation></Navigation>
    </div>
    );
}
}