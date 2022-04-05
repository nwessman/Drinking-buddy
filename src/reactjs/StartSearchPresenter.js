import StartSearchView from "../views/StartSearchView";
import React from "react";
import { searchHotels } from "../geoSource";


export default function Search(props){
  
  function serachForHotelsCB(){
    searchHotels({latitute:59.334591,longitute:18.063240})
    //props.model.doSearch(props.model.searchParams);
  }
  function setSearchCoorCB(val){
    props.model.setSearchQuery(val);

  }
  function saveSearchParams(from, to, start, end){

    props.model.setCurrentLocation(from);
    props.model.setSearchDestination(to);
    props.model.setStartDate(start);
    props.model.setEndDate(end);
  }

  return <StartSearchView onSearchClick={saveSearchParams} searchEvent={serachForHotelsCB} setSearchQuery={ setSearchCoorCB}/>;
}