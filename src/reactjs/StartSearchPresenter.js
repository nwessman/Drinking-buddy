import StartSearchView from "../views/StartSearchView";
import React from "react";


export default function Search(props){

  function saveSearchParams(from, to, start, end){
    props.model.setCurrentLocation(from);
    props.model.setSearchDestination(to);
    props.model.setStartDate(start);
    props.model.setEndDate(end);
  }

  return <StartSearchView onSearchClick={saveSearchParams} />;
}