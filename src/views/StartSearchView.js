import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import React from "react";
import { IoIosSearch, IoMdSwap } from "react-icons/io";
import "../App.css";



function StartSearchView(props){
    
    let from, to, start, end;
    
/*     const [location, setLocation ] = React.useState("");
    const [destination, setDestination] = React.useState("");
    const [startDate, setStart] = React.useState("");
    const [endDate, setEnd] = React.useState(""); */

    
    function onSearchClick(){
        props.onSearchClick(from,to,start,end);
        window.location.hash = "hotels";
    }

    function onFromChange(evt){
        from = evt.target.value;
//        setLocation(from);
        //return props.setSearchLatEv(evt.target.value);
        //return props.setLat(evt.target.value);
    }

    function onToChange(evt){
        to = evt.target.value;
 //       setDestination(to);
        //return props.setSearchEvent(evt.target.value);
        //return props.setSearchLongEv(evt.target.value);
        //return props.setLong(evt.target.value);
    }

    function onCalenderChange(evt) {
        try{
            start = evt.value[0];
            end = evt.value[1];
 //           setStart(start);
  //          setEnd(end);
        }
        catch(error){
 //           setStart("");
//            setEnd("");
    }

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
                    <IoMdSwap style = {{ opacity: 0.6}} size = "50px"/>
                <input type = "text" placeholder= "To" className="searchInputs" onChange = {onToChange}/>
            </div>
            <div className="search">
                <DateRangePickerComponent delayUpdate={true} placeholder="Choose Date Range" change = {onCalenderChange}/>
            </div>
            <div className="search">
                <button  onClick = {onSearchClick} style = {{opacity: .8}}><IoIosSearch size="50px"/></button>
            </div>

            </div>
            </div>
        );
}
export default StartSearchView;