import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import React from "react";
import { IoIosSearch, IoMdSwap } from "react-icons/io";
import "../App.css";



function StartSearchView(props){
    
    let to, from, start, end;

    
    function onClickSearchCoor(){
        //props.onSearchClick(to,from,start,end);
        console.log("search is being made...");
        return props.searchEvent();
     
    }

    function onFromChange(evt){
        //from = evt.target.value;
        //return props.setSearchLatEv(evt.target.value);
        return props.setLat(evt.target.value);
    }

    function onToChange(evt){
        //to = evt.target.value;
        //return props.setSearchEvent(evt.target.value);
        //return props.setSearchLongEv(evt.target.value);
        return props.setLong(evt.target.value);
    }

    function onCalenderChange(evt) {
        start = evt.value[0];
        end = evt.value[1];
    }

   



    return (
        <div className="searchWrapper">
            
            <div className ="search">
                <input type = "text" placeholder = "From" className="searchInputs" onChange = {onFromChange}/>
                <IoMdSwap style = {{ opacity: 0.6}} size = "30px"/>
                <input type = "text" placeholder= "To" className="searchInputs" onChange = {onToChange}/>
            </div>
            <div className="search">
                <DateRangePickerComponent placeholder="Choose Date Range" change = {onCalenderChange}/>
            </div>
            <div className="search">
                <button style = {{opacity: .8}}><IoIosSearch onClick = {onClickSearchCoor/*onClickSearch*/}  size="50px"/></button>
                <div></div>
            </div>
            
        </div>  
        );
}
export default StartSearchView;