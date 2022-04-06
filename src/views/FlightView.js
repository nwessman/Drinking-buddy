import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";

export default function FlightView(props){
    
    return (
        <div className = "background_image">
            <Navigation></Navigation>
            Det här är flyg.
        </div>
        );
}