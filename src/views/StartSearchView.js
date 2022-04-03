import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import React from "react";
import { IoIosSearch, IoMdSwap } from "react-icons/io";
import "../App.css";


function StartSearchView(){
    
return (
    <div className="searchWrapper">
        
        <div className ="search">
            <input type = "text" placeholder = "From" className="searchInputs"/>
            <IoMdSwap style = {{ opacity: 0.6}} size = "30px"/>
            <input type = "text" placeholder= "To" className="searchInputs"/>
        </div>
        <div className="search">
            <DateRangePickerComponent placeholder="Choose Date Range"/>
        </div>
        <div className="search">
            <button style = {{opacity: .8}}><IoIosSearch /** onclick = {} */ size="50px"/></button>
        </div>
        
    </div>  
    );
}
export default StartSearchView;