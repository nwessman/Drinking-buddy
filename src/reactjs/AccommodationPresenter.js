import AccommodationView from "../views/AccommodationView";
import React from "react";


export default function Accommodations(props){
  
  function ObserverACB(){
    setHotelsList(props.model.accommodationList)
  }
  function isTakenDownACB(){
    props.model.removeObserver(ObserverACB);
  }
  
  function wasCreatedACB(){
    props.model.addObserver(ObserverACB);
    return isTakenDownACB;
  }
  
  const [HotelsList, setHotelsList] = React.useState(props.model.accommodationList);
  React.useEffect(wasCreatedACB, []);
  
  return <AccommodationView hotels={props.model.accommodationList}
  />;
}