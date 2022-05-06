import ActivityView from "../views/ActivityView";
import React from "react";


export default function Activity(props){
  const [, setLat] = React.useState(props.model.locationToLat);
  const [, setLong] = React.useState(props.model.locationToLng);
   
    function activityObserverACB(){
        setLat(props.model.locationToLat);
        console.log("lat presenter: " + props.model.locationToLat);
        setLong(props.model.locationToLng);
        console.log("lng presenter: " + props.model.locationToLng);
        
      }
      function isTakenDownACB(){
        props.model.removeObserver(activityObserverACB);
      }
      
      function wasCreatedACB(){
        props.model.addObserver(activityObserverACB);
        return isTakenDownACB;
      }

      React.useEffect(wasCreatedACB,[]);



  return <ActivityView latitude = {props.model.locationToLat} longitude={props.model.locationToLng} />;
}