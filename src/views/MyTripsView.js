import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";


// view needs work, check below for data structure of a saved trip
function MyTripsView(props){
      return (
          <div className = "background_image">
              <Navigation></Navigation>
              <div className="box">
                  {
                    props.savedTrips.map(e => {
                      return(
                        <div key={e.tripName}>
                            <span>from {e.from} to {e.to}.</span>
                            <span>Date {e.departDate} to {e.returnDate}.</span>
                            <button onClick={() => props.selectTrip(e)}>Explore Trip</button>
                            <button onClick={() => props.deleteTrip(e.tripName)}>Delete Trip</button>
                            <span>my saved hotel: {(e.savedAccommodation) ? String(e.savedAccommodation) : "None"}</span>
                            <span>my saved flight: {(e.savedFlight) ? String(e.savedFlight) : "None"}</span>
                        </div>
                      )
                    })
                  }
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
 */