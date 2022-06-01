import StartSearchView from "../views/StartSearchView";
import React from "react";


export default function Search(props){
  const [des, setDestination] = React.useState(false);
  const [loc, setLocation] = React.useState(false);
  const [start, setStart] = React.useState(false);
  const [end, setEnd] = React.useState(false);
  const [,setLoading] = React.useState(props.model.loading);

  function ObserverACB(){
    setLoading(props.model.loading);  

  }
  function isTakenDownACB(){
    props.model.removeObserver(ObserverACB);
  }
  
  function wasCreatedACB(){
    props.model.addObserver(ObserverACB);
    return isTakenDownACB;
  }
 


  function setSearchLatCB(val){
    props.model.setSearchLatQuery(val);
 
  }

  function setSearchLongCB(val){
    props.model.setSearchLongQuery(val);
  }

  function updateSearchStringToInModel(val){
    props.model.setSearchDestination(val);
    setDestination(true);
  }

  function navToHotels(){
    props.model.setNavBarRender(true);
    window.location.hash = "mytrips"
  }

  function updateSearchStringFromInModel(val){
    props.model.setCurrentLocation(val);
    setLocation(true)
  }

  function setStartDate(val){
    props.model.setStartDate(formatDateCB(val));
    setStart(true)
  }

  function setEndDate(val){
    props.model.setEndDate(formatDateCB(val));
    setEnd(true)
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

  React.useEffect(wasCreatedACB, [loc, des, start, end]);



  function doSearch(){
    props.model.doSearch();
  }

  let params = {loc: loc, des: des, start: start, end: end}

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
  params = {params}
  loading = {props.model.loading}
  />;
}