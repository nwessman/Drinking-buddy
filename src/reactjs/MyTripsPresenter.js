import MyTripsView from "../views/MyTripsView.js";
import React from "react";


export default function MyTrips(props){
  const [, setTrips] = React.useState(props.model.userSavedTrips);

  function loadTripIntoModel(tripName){
      props.model.loadSomeTrip(tripName);
  }
  function goToSearch(){
    window.location.hash = "startsearch"
  }

  function deleteTrip(key){
    props.model.deleteSavedTrip(key);
  }

  function ObserverACB(){
    setTrips(props.model.userSavedTrips)
  }

  function isTakenDownACB(){
    props.model.removeObserver(ObserverACB);
  }

  function wasCreatedACB(){
    props.model.addObserver(ObserverACB);
    return isTakenDownACB;
  }

  React.useEffect(wasCreatedACB, []);

  return <MyTripsView 
  savedTrips={props.model.userSavedTrips} 
  selectTrip={loadTripIntoModel}
  deleteTrip={deleteTrip}
  doNewSearch={goToSearch} 
  
  />;
  
}