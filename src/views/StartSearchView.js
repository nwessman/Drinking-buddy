import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import React from "react";
import { IoIosSearch, IoMdSwap } from "react-icons/io";
import "../App.css";


function StartSearchView(props){
    
    let to, from, start, end;


    function onClickSearch(evt){
        props.onSearchClick(to,from,start,end);
    }

    function onFromChange(evt){
        from = evt.target.value;
    }

    function onToChange(evt){
        to = evt.target.value;
    }

    function onCalenderChange(evt) {
        start = evt.value[0];
        end = evt.value[1];
    }

    function onClickSearchACB(){
        window.location.hash = "flights";
    }

    function navigateStartSearchACB() {
        window.location.hash = "startsearch";
        
    }


    return (
            <div className="background_image">

                <div className='navigationbar'>
                    <h2 className='name_logo' onClick={navigateStartSearchACB}>TravelBuddy</h2>
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
                <button style = {{opacity: .8}}><IoIosSearch onClick = {onClickSearchACB}  size="50px"/></button>
            </div>

            </div>
            </div>
        );
}
export default StartSearchView;