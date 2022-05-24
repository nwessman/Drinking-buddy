import StartSearchView from "../views/StartSearchView";
import React from "react";


export default function Search(props){

  const [, setUser] = React.useState(props.model.userName);

  
  function ObserverACB(){
    setUser(props.model.userName);
  }
  function isTakenDownACB(){
    props.model.removeObserver(ObserverACB);
  }
  
  function wasCreatedACB(){
    props.model.addObserver(ObserverACB);
    return isTakenDownACB;
  }
  
  React.useEffect(wasCreatedACB, []);
  

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
      props.model.setStartDate(null);
      props.model.setEndDate(null);
    }
  }

  function doSearch(){
    props.model.doSearch();
  }

  

  return <StartSearchView updateSearchStringTo={updateSearchStringToInModel} 
  updateSearchStringFrom={updateSearchStringFromInModel} 
  onSearchClick={doSearch} 
  setLat={setSearchLatCB} setLong={setSearchLongCB}
  setCurrentLocation={updateSearchStringFromInModel}
  setSearchDestination={updateSearchStringToInModel}
  setStartDate={setStartDate}
  setEndDate={setEndDate}
  startDate={props.model.startDate}
  endDate={props.model.endDate}
  searchParams={props.model.searchParams}
  checkPreviousSearch={navToHotels}
  user = {props.model.userName}/>;

}