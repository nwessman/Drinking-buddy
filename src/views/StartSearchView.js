import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import React from "react";
import { IoIosSearch } from "react-icons/io";
import "../App.css";
import { Autocomplete, TextField } from "@mui/material"
import citiesList from "../cityInfoDB.js"
import { Button, Icon, Message, Popup} from 'semantic-ui-react'

function StartSearchView(props){

    function onSearchClick(){
        props.onSearchClick();
    } 

    function onFromChange(evt, val){
        const location = val.toLowerCase();
        props.setCurrentLocation(location);
    }

    function onToChange(evt, val){
        const destination = val.toLowerCase();
        props.setSearchDestination(destination);
    }

    function onCalenderChange(evt) {
        try{
            props.setStartDate(evt.value[0]);
            props.setEndDate(evt.value[1]);
        }
        catch(error){
        }
    }

    function navigateStartSearchACB() {
        window.location.hash = "startsearch";
    }

    function capitalize(value){
        return  value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    }

    let options =[...new Set(citiesList.map(x => capitalize(x.city) + ", " + capitalize(x.country)))] 
    
    return (
            <div className="background_image">

                <div className='navigationbar'>
                    <h1 className='name_logo' onClick={navigateStartSearchACB}>TravelBuddy</h1>
                </div>

            
                <div className='searchWrapper'>
                <div className='box3'>
                    <h2 className='flightHeader'> Explore a new destination!</h2>
                    <div className ="search">
                        <Autocomplete
                                onChange={onFromChange}
                                style={{ color: "white" }}
                                disablePortal
                                id="combo-box-demo"
                                options={options}
                                sx={{ input: { color: "black" }, width: 300, m: 2, backgroundColor: "white"}}
                                inputlabelprops={{style: {color: "white",}}}
                                renderInput={(params) => (<TextField {...params} label="From" />)}
                            />
                            <Autocomplete
                                onChange={onToChange}
                                style={{ color: "white" }}
                                disablePortal
                                id="combo-box-demo"
                                options={options}
                                sx={{ input: { color: "black" }, width: 300, m: 2, backgroundColor: "white"}}
                                inputlabelprops={{style: {color: "white",}}}
                                renderInput={(params) => (<TextField {...params} label="To" />)}
                            />
                    </div>
                    <div className="search">
                        <DateRangePickerComponent delayUpdate={true} placeholder="Choose Date Range" change = {onCalenderChange}/>
                    </div>
                    <div className="search">
                        <Button 
                                icon size = 'big' animated = "vertical" onClick = {onSearchClick}>
                            <Icon name='search' />
                        </Button>
                    </div>
                        
                </div>

                </div>
                <Button color="#08243f" className='checkPreviousSearchButton' onClick={props.checkPreviousSearch}>My saved trips </Button>
            </div>
        );
}
export default StartSearchView;
