import React from "react";
import "../App.css";
import {MenuItems} from "./MenuItems";

function NavigationView(props){
    // function ACB(){
    //     return props.onSideBarClick();
    // }
    function renderMenuItems(item, index){

        function someCB(){
            window.location.hash = item.hash;
        }
        
        return (
        <li key={index} className={item.cName}>
            <a onClick = {someCB} >
            {item.icon}
            <span>{item.title}</span>
            </a>
        </li>
        );

    }

return (
    <div className="navigationbar">
        <h2 className="name_logo">TravelBuddy</h2>
        <ul className="menuBar">
        {MenuItems.map(renderMenuItems)}
        </ul>
    </div>
        
    );
}
export default NavigationView;