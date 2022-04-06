import StartSearchView from "../views/StartSearchView";
import React from "react";
import { searchHotels } from "../geoSource";


export default function Search(props){
  
  function serachForHotelsCB(){
    //searchHotels({latitute:59.334591,longitute:18.063240})
    //searchHotels({query:"burger", type: "main course"})
    props.model.doSearch(props.model.searchParams);

  }
  function setSearchLatCB(val){
    props.model.setSearchLatQuery(val);

  }
  function setSearchLongCB(val){
    props.model.setSearchLongQuery(val);
  }

  function saveSearchParams(from, to, start, end){

    props.model.setCurrentLocation(from);
    props.model.setSearchDestination(to);
    props.model.setStartDate(start);
    props.model.setEndDate(end);
  }

  return <StartSearchView onSearchClick={saveSearchParams} searchEvent={serachForHotelsCB} setLat={setSearchLatCB} setLong={setSearchLongCB}/>;
}