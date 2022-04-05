import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";

export default function AccommodationView(props){
    
    return (
        <div className = "background_image">
            <Navigation></Navigation>
            Det här är hotell.
        </div>
        );
}