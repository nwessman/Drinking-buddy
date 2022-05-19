import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";

export default function AccommodationView(props){

    try {
        return (
            <div className = "background_image">
                <Navigation></Navigation>   
                
                <div className="box">
                    <div className= "flightHeader"> 
                        Available hotels at your chosen destination
                    </div>
                    <div className="boxContainer">
                {
                props.hotels.map(e => {
                    return (
                        <div key={e.hotel_id} className="boxItems" onClick={function clickCB(){
                            return props.chosenAccomodation(e.hotel_id);}}
                            >   
                            <img src={e.max_photo_url} alt="Error 404" height="200" width="300"/>
                            <div className = "accDescription">
                                <div className="text.bold">{e.hotel_name}</div>
                                <div className="text">{e.city_trans}</div>
                                <div className="text">{e.address}</div>
                                <div className="text">{e.min_total_price} SEK</div>
                                <div className = "bookHotel">
                                <button onClick = {function buttonClickedACB(){ window.open(e.url);}} className = "bookHotelButton"> Book now! </button>
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
        
    } catch (error) {
        return (
            <div className = "background_image">
                <Navigation></Navigation>
                <span>No hotels found at your destination.</span>
            </div>
        );
    } 
    
        
}