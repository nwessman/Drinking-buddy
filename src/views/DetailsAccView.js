import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";
import * as FaIcons from "react-icons/fa"


export default function DetailsAccView(props){
   
    function renderReviews(review){
        return (
        <div key={review.review_hash} className="reviews">
            <div className="reviewer">{review.author.name}<span> wrote in {review.date}</span></div>
            <div className="reviewContent">
            <div>{review.title}</div>
            <div>Purpose of stay: {review.travel_purpose}</div>
            <div>Pros: {review.pros}</div>
            <div>Cons: {review.cons}</div>
            <div>Score: {review.average_score.toFixed(2)}</div>
            </div>

       </div>
       );

    }

    function onClickNextCB(){
        let nextIndex = (props.photoIndex + 1) % props.allAccPhotos.length;
        props.onClickChange(nextIndex);
    }
    function onClickPrevCB(){
        let currIndex = props.photoIndex - 1;
        if(currIndex < 0 ){props.onClickChange(props.allAccPhotos.length - 1);}
        else   props.onClickChange(currIndex);
    }
 
   try{
       return(
        <div className = "background_image">
        <Navigation></Navigation> 
        <button className="button"onClick={function goBack(){window.location.hash="hotels";}}>Go back   </button>
        <div className="box">
        <div className="detailsAcc_elements">
     
            <h1 className="accomodationTitle" alt="Accomodation, no name">{props.accomodationReviews.map((r) => r.hotelier_name)[0]}</h1>
            <div className="imageWrapper">
                
                <FaIcons.FaAngleLeft size="50px" onClick={onClickPrevCB} className="leftArrow" />  
                <img className="images" src={props.accomodationPhoto} alt="hotel" height="200"/>
                <FaIcons.FaAngleRight size="50px" onClick={onClickNextCB} className="rightArrow"/>  
            </div>
            <h2 className="accomodationTitle">Reviews</h2>
            <div key="reviews" >{props.accomodationReviews.map(renderReviews)}</div>
        </div>
       </div>
    </div>
       );
    }catch(error){
           return <div>NO hotels reviews </div>
       }

}