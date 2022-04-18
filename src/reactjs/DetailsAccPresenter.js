import React from "react";
import DetailsAccView from "../views/DetailsAccView";
import {getHotelsReview} from "../geoSource"
export default
function DetailsAcc(props){
    const [currentAccReviews, setCurrentAccReviews] = React.useState(props.model.currentAccReviews);
    function detailsObserverACB(){
        console.log("uppdaterar acc_reviews");
        setCurrentAccReviews(props.model.currentAccReviews);
        
      }
      function isTakenDownACB(){
        props.model.removeObserver(detailsObserverACB);
      }
      
      function wasCreatedACB(){
        props.model.addObserver(detailsObserverACB);
        return isTakenDownACB;
      }
      React.useEffect(wasCreatedACB,[]);

    return(
        <DetailsAccView
        accomodationDetails={props.model.currentAccReviews}/>
        
    );
}