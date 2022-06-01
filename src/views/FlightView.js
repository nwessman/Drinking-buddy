import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";
import { Button, Icon, Popup } from "semantic-ui-react";

export default function renderFlights(props){


    function renderFlightsCB(item, index){

        function buttonClickACB(){
            window.open("https://www.aviasales.com" + item.link);
        }

        function convert(time){
          let hour = Math.round(time/60);
          return hour;
        }

        return(
          <div key = {index}>
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
                <Popup hideOnScroll = "true" content = "Flight is now added." on = "click" trigger = {<Button data-tooltip= 'Add to "My Trips"' onClick={() => {props.saveFlightChoice(item)}} className="bookFlight"><Icon name = "plus"/></Button>}/>
                <Button onClick = {buttonClickACB} className= "bookFlight">Book flight</Button>
              </div>
              <div className= "flightsItem">
                Price: {item.price} SEK
              </div>
            </div>
            </div>
        
        )
    }
    
    if(props.flights.prices !== undefined && props.flights.prices.length > 0){
      return (
          <div className = "background_image">
              
              <h1 className= "flightHeader"> 
       Available flights from {props.from} to {props.to}
                </h1>
              <div className="box">
                  {props.flights.prices.map(renderFlightsCB)}
              </div>
          </div>
          );
    } else {
      return (
          <div className = "background_image">
          
          <h1 className= "flightHeader"> 
              No flights available at this date. Try searching for an earlier date or change destination.
                  </h1>
          <div className="box">
          <Button className = "bookHotelButton" onClick={props.doNewSearch}>Search for a new Trip!</Button>
              </div>
      </div>
      );
  }
}