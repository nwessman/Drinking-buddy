import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";
import { Button} from 'semantic-ui-react'


// view needs work, check below for data structure of a saved trip
function MyTripsView(props){

  console.log(props.flights);
  console.log(props.savedTrips)

      function getCategory(categoryArray){
        let category = categoryArray.find(e => 
            (e === 'commercial.supermarket' || 
             e === 'catering.bar' ||
             e === 'entertainment.museum' ||
             e === 'adult.nightclub' ||
             e ==='commercial.shopping_mall'  ||
             e ==='catering.restaurant'  ||
             e === 'entertainment.cinema' ||
             e === 'entertainment.theme_park'  ||
             e === 'healthcare.hospital')
        );
        switch (category) {
            case 'commercial.supermarket':
                    return ["https://thumbs.dreamstime.com/b/shoppingvagn-i-en-supermarket-40320116.jpg", "Supermarket"] 
    
            case 'catering.bar':
                    return ["https://static.thatsup.co/content/img/place/b/a/bar-nombre-0.jpg", "Bar"]
        
            case 'entertainment.museum':
                    return ["https://cdn.britannica.com/51/194651-050-747F0C18/Interior-National-Gallery-of-Art-Washington-DC.jpg","Museum"]
    
            case 'adult.nightclub':
                    return ["https://media.timeout.com/images/105520557/750/562/image.jpg", "Night Club"]
    
            case 'commercial.shopping_mall':
                    return ["https://visitskane.com/sites/default/files/images/list-items/2016-11/Melodifestival_Malmo_2013_foto_Fredrik_Johansson.jpg", "Shopping Mall"] 
    
            case 'catering.restaurant':
                    return ["https://static.thatsup.co/content/img/article/15/jul/b%C3%A4sta-restaurangerna-i-city.jpg", "Restaurant" ]
    
            case 'entertainment.cinema':
                    return ["https://www.europa-cinemas.org/storage/1416/prix-europa-cinemas-2018.jpeg", "Cinema"]
    
            case 'entertainment.theme_park':
                    return ["https://www.snl.com/articles/409719194.jpg", "Theme Park"]
    
            case 'healthcare.hospital':
                    return ["https://cdn.systematic.com/media/g0sj1tbg/hospital-building-001-global.jpg?cropAlias=hero_large&width=992&height=483&quality=80&mode=crop&null", "Hospital"] 
            
            default:
                return ["https://pngset.com/images/maps-icon-point-of-interest-heart-plectrum-paper-sweets-transparent-png-1545765.png", ""]
        }
    }

  function capitalize(value){
    return value.split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  }
      return (
          <div className = "background_image">
              <Navigation></Navigation>
              <h1 className="flightHeader">My Trips</h1>
              <div className="tripBox">
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
                                        <div>Hotel: {(e.savedAccommodation) ? String(e.savedAccommodation.hotel_name) + "  (" + String(e.savedAccommodation.min_total_price) + " SEK)" : "None"}</div>
                                        <div>Flight: {(e.savedFlight === "none") ? "None" : String(e.savedFlight.origin) + " to " + String(e.savedFlight.destination) + " (" + String(e.savedFlight.price) + " SEK)"}</div>
                                        <div>Activity: {(e.savedActivity === "None") ? "None" : String(e.savedActivity.name) + "  (" + String(getCategory(e.savedActivity.categories)[1]) + ")"}</div>
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

                  <Button className = "bookHotelButton" onClick={props.doNewSearch}>Search for a new Trip!</Button>

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