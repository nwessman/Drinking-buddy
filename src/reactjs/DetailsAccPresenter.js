import React from "react";
import DetailsAccView from "../views/DetailsAccView";

export default
function DetailsAcc(props){
    const [, setCurrentAccReviews] = React.useState(props.model.currentAccReviews);
    const [, setCurrentAccPhoto] = React.useState(props.model.currentAccPhoto)
    function detailsObserverACB(){
        setCurrentAccReviews(props.model.currentAccReviews);
        setCurrentAccPhoto(props.model.currentAccPhoto);
        
      }
      function isTakenDownACB(){
        props.model.removeObserver(detailsObserverACB);
      }
      
      function wasCreatedACB(){
        props.model.addObserver(detailsObserverACB);
        return isTakenDownACB;
      }

      React.useEffect(wasCreatedACB,[]);

      function onClickChangePic(index){
        props.model.setCurrentAccPhoto(index);

      }

    return(
        <DetailsAccView
        accomodationReviews={props.model.currentAccReviews} accomodationPhoto={props.model.currentAccPhoto} allAccPhotos={props.model.accPhotos} photoIndex={props.model.photoIndex} onClickChange={onClickChangePic}/>
        
    );
}