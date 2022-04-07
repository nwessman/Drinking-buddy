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
                <span>List of Hotel options</span>
                <ul>
                {
                props.hotels.map(e => {
                    return (
                        <div>   
                            <img src={e.main_photo_url}/>
                            <span>{e.address}</span>
                            <span>{e.min_total_price}</span>
                        </div>
                        );
                    })
                }
                </ul>
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