import AccommodationView from "../views/AccommodationView";
import React from "react";


export default function Accommodations(props){
  const [, setHotelsList] = React.useState(props.model.accommodationList);
  const [AccPopUp, setAccPopUp] = React.useState(false);
  const [, setUser] = React.useState(props.model.user)

  let to = String(props.model.locationParams.to).toUpperCase();
  
  function saveTrip(hotel){
    props.model.saveHotelChoice(hotel)
  }

  function ObserverACB(){
    setHotelsList(props.model.accommodationList)
    setUser(props.model.user)
  }
  function isTakenDownACB(){
    props.model.removeObserver(ObserverACB);
  }
  
  function wasCreatedACB(){
    props.model.addObserver(ObserverACB);
    return isTakenDownACB;
  }
  function clickCB(id){
    props.model.viewDetailsOfAccomodation(id);
    setAccPopUp(!AccPopUp);

  }
  
 
  React.useEffect(wasCreatedACB, []);
  
  return <AccommodationView hotels={props.model.accommodationList} 
  chosenAccomodation={clickCB} to={to} 
  saveHotelChoice={saveTrip}
  user={props.model.user}
  />;
}