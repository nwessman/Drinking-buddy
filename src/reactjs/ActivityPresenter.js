import ActivityView from "../views/ActivityView";
import React from "react";


export default function Activity(props){
  const [, setPosition] = React.useState(props.model.position);

  function activityObserverACB(){
   setPosition(props.model.position)
    
    
  }
  function isTakenDownACB(){
    props.model.removeObserver(activityObserverACB);
  }
  
  function wasCreatedACB(){
    props.model.addObserver(activityObserverACB);
    return isTakenDownACB;
  }

  React.useEffect(wasCreatedACB,[]);

  return <ActivityView position={props.model.position}/>;
}