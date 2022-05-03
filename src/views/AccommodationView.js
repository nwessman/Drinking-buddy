import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";

export default function AccommodationView(props){
    console.log("list of hotels: ");
    console.log(props.hotels);
    try {
        return (
            <div className = "background_image">
                <Navigation></Navigation>   
                
                <div className="box">
                {
                props.hotels.map(e => {
                    return (
                        <div key={e.hotel_id} className="boxItems" onClick={function clickCB(){
                            return props.chosenAccomodation(e.hotel_id);
                        }}>   
                            
                            <img src={e.main_photo_url} alt="Error 404" height="80"/>
                            <div>{e.address}</div>
                            <div>{e.min_total_price} kr</div>
                            </div>
                        );
                    })
                }
                </div>
                {props.children}
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