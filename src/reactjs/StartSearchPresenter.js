import StartSearchView from "../views/StartSearchView";
import React from "react";


export default function Search(props){

  //const [, searchBar]
  
  function searchForHotelsCB(){
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

  function updateSearchStringToInModel(val){
    props.model.setSearchDestination(val);
  }

  function navToHotels(){
    window.location.hash = "hotels"
  }

  function updateSearchStringFromInModel(val){
    props.model.setCurrentLocation(val);
  }

  function setStartDate(val){
    console.log("setStartDate val: " + val);
    console.log("setStartDate format: " + formatDateCB(val));
    props.model.setStartDate(formatDateCB(val));
  }

  function setEndDate(val){
    props.model.setEndDate(formatDateCB(val));
  }

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

  function doSearch(){
    props.model.doSearch();
  }

  return <StartSearchView updateSearchStringTo={updateSearchStringToInModel} 
  updateSearchStringFrom={updateSearchStringFromInModel} 
  onSearchClick={doSearch} searchEvent={searchForHotelsCB} 
  setLat={setSearchLatCB} setLong={setSearchLongCB}
  setCurrentLocation={updateSearchStringFromInModel}
  setSearchDestination={updateSearchStringToInModel}
  setStartDate={setStartDate}
  setEndDate={setEndDate}
  startDate={props.model.startDate}
  endDate={props.model.endDate}
  searchParams={props.model.searchParams}
  checkPreviousSearch={navToHotels}/>;
}