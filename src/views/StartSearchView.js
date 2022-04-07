import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import React from "react";
import { IoIosSearch, IoMdSwap } from "react-icons/io";
import "../App.css";



function StartSearchView(props){
    
    let from, to, start, end;

    
    function onSearchClick(){
        props.onSearchClick(from,to,start,end);
    }

    function onFromChange(evt){
        from = evt.target.value;
        //return props.setSearchLatEv(evt.target.value);
        //return props.setLat(evt.target.value);
    }

    function onToChange(evt){
        to = evt.target.value;
        //return props.setSearchEvent(evt.target.value);
        //return props.setSearchLongEv(evt.target.value);
        //return props.setLong(evt.target.value);
    }

    function onCalenderChange(evt) {
        start = evt.value[0];
        end = evt.value[1];
    }

    function navigateHotelsACB(){
        window.location.hash = "hotels";
    }

    function navigateStartSearchACB() {
        window.location.hash = "startsearch";
        
    }


    return (
            <div className="background_image">

                <div className='navigationbar'>
                    <h1 className='name_logo' onClick={navigateStartSearchACB}>TravelBuddy</h1>
                </div>

                <div className='searchWrapper'>
            
            <div className ="search">
                <input type = "text" placeholder = "From" className="searchInputs" onChange = {onFromChange}/>
                    <IoMdSwap style = {{ opacity: 0.6}} size = "30px"/>
                <input type = "text" placeholder= "To" className="searchInputs" onChange = {onToChange}/>
            </div>
            <div className="search">
                <DateRangePickerComponent placeholder="Choose Date Range" change = {onCalenderChange}/>
            </div>
            <div className="search">
                <button onClick = {onSearchClick} style = {{opacity: .8}}><IoIosSearch onClick = {navigateHotelsACB}  size="50px"/></button>
            </div>

            </div>
            </div>
        );
}
export default StartSearchView;