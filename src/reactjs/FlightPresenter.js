import FlightView from "../views/FlightView";
import React from "react";


export default function Flights(props){
  const [, setDeparFlights] = React.useState(props.model.flightsDepart);

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
  flights={props.model.flightsDepart}/>;
}