import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";

export default function renderFlights(props){


    function renderFlightsCB(item, index){

        function buttonClickACB(){
            window.location = "https://www.aviasales.com" + item.link;
        }

        return(
          <div>
                <div class = "flightHeader"> 
       Available flights from {props.from} to {props.to}
                </div>
           <div className ="flightsContainer">
                <div className ="flight">
                    <div class = "flightsItem"><div>
                        {item.origin}
                      </div>
                    <div className="duration">
                        {item.depart_date}
                    </div>
                    </div>
                  <div class = "flightsItem">
                    <div class = "duration">
                      {item.duration} minutes
                    </div>
                    <div class="flightBar"></div>
                  </div>
                    <div class = "flightsItem" >{item.destination}</div>
                </div>
              <div class = "flightsItem">
                <button onClick = {buttonClickACB} class = "bookFlight">Book flight</button>
                Price: 
                {item.price} SEK
              </div>
            </div>
            </div>
        
        )
    }
    
    try{
    return (
        <div className = "background_image">
            <Navigation></Navigation>
            <div className="box">
                {props.flights.prices.map(renderFlightsCB)}
            </div>
        </div>
        );
    } catch(error) {
    return (
        <div className = "background_image">
        <Navigation></Navigation>
        <div className="box">
                No flights available.
            </div>
    </div>
    );
}
}