import StartSearchView from "../views/StartSearchView";
import React from "react";
import { getHotels } from "../geoSource";


export default function Search(props){
  
  function serachForHotelsCB(){
    //searchHotels({latitute:59.334591,longitute:18.063240})
    //searchHotels({query:"burger", type: "main course"})
    //props.model.doSearch(props.model.searchParams);
    // GET HOTELS BEHÖVER OBJEKT {startDate, endDate, lat, lng}
    // REQUIRES OBJECT {startDate, endDate, lat, lng}

  }
  function setSearchLatCB(val){
    props.model.setSearchLatQuery(val);
  }

  function setSearchLongCB(val){
    props.model.setSearchLongQuery(val);
  }

  function doSearch(from, to, start, end){
    function formatDateCB(date) {
      try{
        var newDate = new Date(date); 
        newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset()); 
        return newDate.toISOString().split('T')[0];
      } catch(error) {
        console.log("Empty dates in search");
        // Todo: better error handling
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