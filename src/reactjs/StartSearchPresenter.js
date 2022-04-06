import StartSearchView from "../views/StartSearchView";
import React from "react";


export default function Search(props){

  function saveSearchParams(from, to, start, end){

    function formatDateCB(date) {
      var newDate = new Date(date); 
      newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset()); 
      return newDate.toISOString().split('T')[0];
    }

    props.model.setCurrentLocation(from);
    props.model.setSearchDestination(to);
    props.model.setStartDate(formatDateCB(start));
    props.model.setEndDate(formatDateCB(end));
    //console.log("Start date: " + formatDateCB(start) + "End date: " + formatDateCB(end))
  }

  return <StartSearchView onSearchClick={saveSearchParams} />;
}