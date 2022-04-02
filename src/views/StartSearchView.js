import React from "react";
import "../App.css";
import {IoMdSwap} from "react-icons/io";


function StartSearchView(){
    
return (
    <div className="searchWrapper">
        
        <div className ="search">
            <input type = "text" placeholder = "From" className="searchInputs"/>
            <IoMdSwap style = {{ opacity: 0.6}} size = "30px"/>
            <input type = "text" placeholder= "To" className="searchInputs"/>
        </div>

        <div className="dates">
        </div>
        
    </div>  
    );
}
export default StartSearchView;