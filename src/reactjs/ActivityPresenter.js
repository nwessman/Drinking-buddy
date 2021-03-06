import ActivityView from "../views/ActivityView";
import React from "react";



export default function Activity(props){
  const [, setLat] = React.useState(props.model.locationToLat);
  const [, setLong] = React.useState(props.model.locationToLng);
  const [, setActivityList] = React.useState(props.model.activityList);
  const [, setCurrentActiivty] = React.useState(props.model.currentActivity);

 
 

 
    function activityObserverACB(){
        setLat(props.model.locationToLat);  
        setLong(props.model.locationToLng);
        setActivityList(props.model.activityList);
        setCurrentActiivty(props.model.currentActivity);
        

      }
      function isTakenDownACB(){
        props.model.removeObserver(activityObserverACB);
      }
      
      function wasCreatedACB(){
        props.model.addObserver(activityObserverACB);
        return isTakenDownACB;
      }
     
      React.useEffect(wasCreatedACB,[]);

      function searchActivites(){
        props.model.viewActivities();
      }

      function saveQueryOptionsToModel(list){
        props.model.setActivityQuerySelections(list); // Save search options in the model
      }
      
      function saveCurrentActivityToModel(a){
        props.model.setCurrentActivity(a);
      }

      function saveTrip(activity){
        props.model.saveActivityChoice(activity);
      }

   
        
        
  
    
  return (<ActivityView
    
    searchActivites={searchActivites}
    setQueryOptions = {saveQueryOptionsToModel}
    dropDownOptions = {[
    { key: 'supermarket', text: 'Supermarkets', value: 'commercial.supermarket' },
    { key: 'bars', text: 'Bars', value: 'catering.bar' },
    { key: 'museums', text: 'Museums', value: 'entertainment.museum' },
    { key: 'nightclub', text: 'Nightclubs', value: 'adult.nightclub' },
    { key: 'shopping_malls', text: 'Shopping Malls', value: 'commercial.shopping_mall' },
    { key: 'restaurants', text: 'Restaurants', value: 'catering.restaurant' },
    { key: 'cinema', text: 'Cinemas', value: 'entertainment.cinema' },
    { key: 'theme_park', text: 'Theme parks', value: 'entertainment.theme_park' },
    { key: 'hospital', text: 'Hospitals', value: 'healthcare.hospital' }

  ]} activities={props.model.activityList} 
  latitude={props.model.locationToLat} 
  longitude={props.model.locationToLng} 
  saveCurrentActivity={saveCurrentActivityToModel}
  currentActivity={props.model.currentActivity}
  user={props.model.user}
  saveActivityChoice={saveTrip}/>);
}