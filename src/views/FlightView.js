import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";

export default function renderFlights(props){


    function renderFlightsCB(item, index){

        function buttonClickACB(){
            window.location = "https://www.aviasales.com" + item.link;
        }

        function convert(time){
          let hour = Math.round(time/60);
          return hour;
        }

        return(
          <div key = {index}>
                <div className= "flightHeader"> 
       Available flights from {props.from} to {props.to}
                </div>
           <div className ="flightsContainer">
                <div className ="flight">
                    <div className= "flightsItem"><div>
                        {item.origin}
                      </div>
                    <div className="duration">
                        {item.depart_date.split('T')[0]}
                    </div>
                    </div>
                  <div className= "flightsItem">
                    <div className= "duration">
                      {convert(item.duration)} hours
                    </div>
                    <div className="flightBar"></div>
                    <div className= "duration"> Transfers: {item.transfers}</div>
                  </div>
                    <div className= "flightsItem" >{item.destination}</div>
                </div>
              <div className= "flightsItem">
                <button onClick = {buttonClickACB} className= "bookFlight">Book flight</button>
                Price: {item.price} SEK
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