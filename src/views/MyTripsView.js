import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";
import { Button} from 'semantic-ui-react'


// view needs work, check below for data structure of a saved trip
function MyTripsView(props){

  function capitalize(value){
    return value.split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  }
      return (
          <div className = "background_image">
              <Navigation></Navigation>
              <div className="box">
                <div className = "tripContainer">
                <div className="ui cards">
                  {
                    props.savedTrips.map(e => {
                      return(
                          <div className="ui card">
                              <div className="content">
                                <a className="header">{capitalize(e.from)} to {capitalize(e.to)}</a>
                                <div className="meta">
                                  <div>{e.departDate} - {e.returnDate}</div>
                                </div>
                                <div className="description">
                                <div>
                                        <div>Hotel: {(e.savedAccommodation) ? String(e.savedAccommodation.hotel_name) : "None"}</div>
                                        <div>Flight: {(e.savedFlight) ? String(e.savedFlight) : "None"}</div>
                                </div>
                                </div>
                                <Button color = "red" onClick={() => props.deleteTrip(e.tripName)} class="ui right floated button">
                                  Delete Trip
                                </Button>
                                <Button onClick={() => props.selectTrip(e)} class="ui left floated button">
                                  Explore Trip
                                </Button>
                              </div>
                          </div>
                      )
                    })
                  }
                  </div>
                  </div>

                  <Button color="#08243f" classname = "bookHotelButton" onClick={props.doNewSearch}>Search for a new Trip!</Button>

              </div>
          </div>
        );
}
export default MyTripsView;

/**
 * STRUCTURE OF A LIST ITEM IN 'props.savedTrips'
 * accommodationList : [{..}, ... , {...}]
 * departDate: "2022 .."
 * returndate: "2022 .."
 * flightsDepart: [{..}, ... , {...}]
 * from: ""
 * lat: 123
 * lng: 123
 * savedAccommodation: { hotel props } OR "none"
 * savedFlight: { flight props } OR "none"
 * to: ""
 * tripName: "name of trip, which is also the key"

                        <div key={e.tripName}>
                            <span>from {e.from} to {e.to}.</span>
                            <span>Date {e.departDate} to {e.returnDate}.</span>
                            <button onClick={() => props.selectTrip(e)}>Explore Trip</button>
                            <button onClick={() => props.deleteTrip(e.tripName)}>Delete Trip</button>
                            <span>my saved hotel: {(e.savedAccommodation) ? String(e.savedAccommodation) : "None"}</span>
                            <span>my saved flight: {(e.savedFlight) ? String(e.savedFlight) : "None"}</span>
                        </div>


*/