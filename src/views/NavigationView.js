import React from "react";
import "../App.css";
import {MenuItems} from "./MenuItems";

function NavigationView(props){
    
    function navigateStartSearchCB(){
        window.location.hash = "startsearch";
    }

    function renderMenuItems(item, index){
        
        function someCB(){
            window.location.hash = item.hash;
        }
        
        return (
        <li key={index} className={item.cName}>
            <a onClick = {someCB} >
            {item.icon}
            <span> {item.title}</span>
            </a>
        </li>
        );

    }

    if(props.renderStatus === true){
        return (
            <div className="navigationbar">
                <h1 onClick={navigateStartSearchCB} className="name_logo">TravelBuddy</h1>
                <ul className="menuBar">
                {MenuItems.map(renderMenuItems)}
                </ul>
            </div>
                
            );
    } else {
        return (
            <div className="navigationbar">
                <h1 className="name_logo">TravelBuddy</h1>
            </div>
        );
    }
}
export default NavigationView;