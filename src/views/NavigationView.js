import React from "react";
import "../App.css";
import {MenuItems} from "./MenuItems";
import {Dropdown} from 'semantic-ui-react'

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
            <div className="navLink" onClick = {someCB} >
            {item.icon}
            <span> {item.title}</span>
            </div>
        </li>
        );

    }

    if(props.renderStatus === 2){
        return (
            <div className="navigationbar">
                <h1 onClick={navigateStartSearchCB} className="name_logo">TravelBuddy</h1>
                <ul className="menuBar">
                {MenuItems.map(renderMenuItems)}
                <div className ="centerUser">
                <Dropdown icon = {<img alt = "userIcon" className="userIcon" src={props.userImage} text = {<div className="userName">{props.userName}</div>}/>}>
                    <Dropdown.Menu>
                    <Dropdown.Item onClick={() => props.logOut()} text = "Log out"/>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
                </ul>
            </div>
                
            );
    } else if (props.renderStatus === 0) {
        return (
            <div className="navigationbar">
                <h1 className="name_logo">TravelBuddy</h1>
            </div>
        );
    } else {
        return (
            <div className="navigationbar">
                <h1 onClick={navigateStartSearchCB} className="name_logo">TravelBuddy</h1>
                <ul className="menuBar">
                {renderMenuItems(MenuItems[3])}
                <div className ="centerUser">
                <Dropdown icon = {<img alt = "userIcon" className="userIcon" src={props.userImage} text = {<div className="userName">{props.userName}</div>}/>}>
                    <Dropdown.Menu>
                    <Dropdown.Item onClick={() => props.logOut()} text = "Log out"/>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
                </ul>
            </div>
        );
    }
}
export default NavigationView;