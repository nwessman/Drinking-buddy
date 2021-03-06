import FlightView from "../views/FlightView";
import React from "react";


export default function Flights(props){
  const [, setDeparFlights] = React.useState(props.model.flightsDepart);
  let from = String(props.model.locationParams.from).toUpperCase();
  let to = String(props.model.locationParams.to).toUpperCase();

  function goToSearch(){
    window.location.hash = "startsearch"
  }

  function saveFlight(flight){
    props.model.saveFlightChoice(flight)
  }

  function ObserverACB(){
    setDeparFlights(props.model.flightsDepart)
  }

  function isTakenDownACB(){
    props.model.removeObserver(ObserverACB);
  }

  function wasCreatedACB(){
    props.model.addObserver(ObserverACB);
    return isTakenDownACB;
  }

  React.useEffect(wasCreatedACB, []);

  return <FlightView
  flights={props.model.flightsDepart} 
  from = {from} 
  to = {to} 
  saveFlightChoice={saveFlight}
  doNewSearch={goToSearch}  
  
  />;
}