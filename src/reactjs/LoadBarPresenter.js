import React from "react";
import LoadBarView from "../views/LoadBarView";

export default function LoadBar(props){
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
 
  React.useEffect(wasCreatedACB,[]);

  if(props.model.loading){
    return <LoadBarView />;

  }
  else{
    return null;
  }

}