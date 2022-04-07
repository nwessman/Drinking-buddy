import StartSearchView from "../views/StartSearchView";
import React from "react";
//import { searchHotels } from "../geoSource";
import {getHotels} from '../geoSource.js'


export default function Search(props){
  
  function serachForHotelsCB(){
    //searchHotels({latitute:59.334591,longitute:18.063240})
    //searchHotels({query:"burger", type: "main course"})
    //props.model.doSearch(props.model.searchParams);
    // GET HOTELS BEHÖVER OBJEKT {startDate, endDate, lat, lng}
    getHotels({lat: "59.2669", lng: "15.1965", startDate: "2022-09-30", endDate: "2022-10-01"})

  }
  function setSearchLatCB(val){
    props.model.setSearchLatQuery(val);

  }
  function setSearchLongCB(val){
    props.model.setSearchLongQuery(val);
  }

  function doSearch(from, to, start, end){
    function formatDateCB(date) {
      try {
        var newDate = new Date(date); 
        newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset()); 
        return newDate.toISOString().split('T')[0];
      } catch {
        // To do: Gör någon form av flagga för att sök-inputen är fel
        props.model.setStartDate(null);
        props.model.setEndDate(null);
      }
    }
    
    props.model.setCurrentLocation(from);
    props.model.setSearchDestination(to);
    props.model.setStartDate(formatDateCB(start));
    props.model.setEndDate(formatDateCB(end));

    props.model.doSearch();
  }

  return <StartSearchView onSearchClick={doSearch} searchEvent={serachForHotelsCB} setLat={setSearchLatCB} setLong={setSearchLongCB}/>;
}