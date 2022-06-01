import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import React from "react";
import "../App.css";
import { Autocomplete, TextField } from "@mui/material"
import citiesList from "../cityInfoDB.js"
import { Button, Icon} from 'semantic-ui-react'

function StartSearchView(props){

    function onSearchClick(){
        props.onSearchClick();
    } 

    function onFromChange(evt, val){
        try{
            const location = val.toLowerCase();
            props.setCurrentLocation(location);
        }
        catch(error){
            props.setCurrentLocation("");
        }
    }

    function onToChange(evt, val){
        try{
            const destination = val.toLowerCase();
            props.setSearchDestination(destination);
        }
        catch(error){
            props.setSearchDestination("");
        }
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

    function popUpText(){
        if(props.loading){
            return "Is searching...";
        }
        if((props.params.loc && props.params.des && props.params.start && props.params.end) === false)
        {
            return "Did you fill out the forms correctly?"; 
        }
        return "Let's explore!";

    }
    
    return (
            <div className="background_image">

                <div className='navigationbar'>
                    <h1 className='name_logo' onClick={navigateStartSearchACB}>TravelBuddy</h1>
                </div>

            
                <div className='searchWrapper'>
                <div className='box3'>
                    <h2 className='boxHeader'> Explore a new destination!</h2>
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
                        <div className="show" data-tooltip={popUpText()}><Button disabled = {(props.params.loc && props.params.des && props.params.start && props.params.end && !props.loading) === false ? true : false}
                                icon size = 'big' onClick = {onSearchClick}>
                            <Icon name='search' />
                        </Button>
                        </div>
                    </div>
                        
                </div>

                </div>
                <Button className='checkPreviousSearchButton' onClick={props.checkPreviousSearch}>My saved trips </Button>
            </div>
        );
}
export default StartSearchView;
