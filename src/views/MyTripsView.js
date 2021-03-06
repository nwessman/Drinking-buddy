import React from "react";
import "../App.css";
import { Button, Message} from 'semantic-ui-react'


function MyTripsView(props){

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

  if(props.savedTrips.length > 0){
      return (
          <div className = "background_image">
              
              <h1 className="flightHeader">My Trips</h1>
              <div className="tripBox">
                <div className = "tripContainer">

                                <div className="ui cards">
                  {props.savedTrips.map(e => {
                      return(
                          <div key={e.tripName} className="ui card">
                              <div className="content">
                                <div className="header">{capitalize(e.from)} to {capitalize(e.to)}</div>
                                <div className="meta">
                                  <div>{e.departDate} - {e.returnDate}</div>
                                </div>
                                <div className="description">
                                <div>
                                        <div><b>Hotel:</b> {(e.savedAccommodation) === "none" ? "None" : String(e.savedAccommodation.hotel_name) + "  (" + String(Math.round(e.savedAccommodation.min_total_price)) + " SEK)" }</div>
                                        <br/>
                                        <div><b>Flight:</b> {(e.savedFlight === "none") ? "None" : String(e.savedFlight.origin) + " to " + String(e.savedFlight.destination) + " (" + String(e.savedFlight.price) + " SEK)"}</div>

                                        <br/>
                                        <div><b>Activities:</b> <ul>{(e.savedActivity === "None") ? "None" : e.savedActivity.map(a => {
                                                return (
                                                <li className="noBullets"key={a.name}>
                                                {String(a.name) + " " + String(a.address_line2) + "  (" + String(getCategory(a.categories)[1]) + ")"}
                                                <br/>
                                                <br/>
                                                </li>
                                                );
                                        }
                                        )}</ul> 
                                        </div>

                                </div>
                                </div>
                                <Button color = "red" onClick={() => props.deleteTrip(e.tripName)} className="ui right floated button">
                                  Delete Trip
                                </Button>
                                <Button onClick={() => props.selectTrip(e)} className="ui left floated button">
                                  Explore Trip
                                </Button>
                              </div>
                          </div>
                      )})
                }
                </div>
                </div> 
                <Button className="bookHotelButton" onClick={props.doNewSearch}> Search for a new Trip!</Button>
                </div>
                </div>              
        );
} else {
        return (

                <div className = "background_image">
                        <h1 className="flightHeader">My Trips</h1>
                        <div className="tripBox">
                        <Message negative>
                        <Message.Header>Oops!</Message.Header>
                        <p>You have no saved trips! 
                                Add a hotel, flight or activity in order to save your trip.</p>
                        </Message>
                        <Button className="bookHotelButton" onClick={props.doNewSearch}> Search for a new Trip!</Button>
                        </div>
                </div>
        );
        
}
}
export default MyTripsView;

