import React from "react";
import DetailsAccView from "../views/DetailsAccView";
import {getHotelsReview} from "../geoSource"
export default
function DetailsAcc(props){
    const [currenAccReviews, setCurrentAccReviews] = React.useState();
    function detailsObserverACB(){
        console.log("uppdaterar acc_reviews");
        setCurrentAccReviews(props.model.viewDetailsOfAccomodation);
        
      }
      function isTakenDownACB(){
        props.model.removeObserver(detailsObserverACB);
      }
      
      function wasCreatedACB(){
        props.model.addObserver(detailsObserverACB);
        return isTakenDownACB;
      }
      React.useEffect(wasCreatedACB,[props.model.viewDetailsOfAccomodation]);

    return(
        <DetailsAccView
        accomodationDetails={props.model.viewDetailsOfAccomodation}/>
        
    );
}