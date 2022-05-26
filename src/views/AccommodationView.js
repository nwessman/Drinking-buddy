import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";
import { Button, Icon, Popup} from 'semantic-ui-react'

export default function AccommodationView(props){

    console.log(props.hotels)

    if(props.hotels !== undefined && props.hotels.length > 0)
        return (
            <div className = "background_image">
                <Navigation></Navigation>   
                
                <h1 className= "flightHeader"> 
                        Available hotels at your chosen destination
                    </h1>
                <div className="tripBox">
                    <div className="boxContainer">
                {
                props.hotels.map(e => {
                    return (
                        <div key={e.hotel_id} className="boxItems">   
                            <img src={e.max_photo_url} alt="Error 404" height="200" width="300" onClick={function clickCB(){
                            return props.chosenAccomodation(e.hotel_id);}}/>
                            <div className = "accDescription">
                                <div className="bold">{e.hotel_name}</div>
                                <div className="t">{e.city_trans}</div>
                                <div className="t">{e.address}</div>
                                <div className="t">{Math.round(e.min_total_price)} SEK</div>
                                <div className = "bookHotel">
                                <Popup hideOnScroll = "true" content = "Hotel is now added." on = "click" trigger = {<Button className = "bookHotelButton" data-tooltip= 'Add to "My Trips"' onClick={() => {props.saveHotelChoice(e);}} ><Icon name='plus'/></Button>}/>
                                <Button onClick = {function buttonClickedACB(){ window.open(e.url);}} className = "bookHotelButton"> Book now! </Button>
                            </div>
                            </div>
                        </div>
                        );
                    })
                }
                </div>
                
                {props.children}
                </div>
                </div>
            );
        
    else {
        return (
            <div className = "background_image">
                <Navigation></Navigation>
                <h1 className= "flightHeader"> 
              No hotels available at this destination. Try searching for an earlier date or change destination.
                  </h1>
          <div className="box">
          <Button className = "bookHotelButton" onClick={props.doNewSearch}>Search for a new Trip!</Button>
              </div>
            </div>
        );
    } 
    
        
}