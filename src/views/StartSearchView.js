import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import React from "react";
import "../App.css";
import { Autocomplete, TextField } from "@mui/material"
import citiesList from "../cityInfoDB.js"
import { Button, Icon} from 'semantic-ui-react'

function StartSearchView(props){

    let minDate = new Date();

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
    
    return (
            <div className="background_image">

            
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
                        <DateRangePickerComponent min={minDate} delayUpdate={true} placeholder="Choose Date Range" change = {onCalenderChange}/>
                    </div>
                    <div className="search">
                        <div className="show" data-tooltip={(props.params.loc && props.params.des && props.params.start && props.params.end) === false ? "Did you fill out the forms correctly?" : "Let's explore!"}><Button disabled = {(props.params.loc && props.params.des && props.params.start && props.params.end) === false ? true : false}
                                icon size = 'big' onClick = {onSearchClick}>
                            <Icon name='search' />
                        </Button>
                        </div>
                    </div>
                        
                </div>

                </div>
            </div>
        );
}
export default StartSearchView;
