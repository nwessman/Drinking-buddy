import React from "react";
import "../App.css";
import * as FaIcons from "react-icons/fa"
import { Button } from "semantic-ui-react";


export default function DetailsAccView(props){
   
    function renderReviews(review){
        return (
            <div key={review.review_hash} className = "detContainer">

            <div key={review.review_hash} className = "reviews">
                <div className="ui comments">
            <div className="comment">
                <div className="avatar">
                <img alt = "" src={review.author.avatar}/>
                </div>
                <div className="content">
                <div className="author">{review.author.name}</div>
                <div className="metadata">
                    <div className="date">{review.date}</div>
                    <div className="rating">
                    <i className="star icon"></i>
                    {Math.round(review.average_score)}
                    </div>
                </div>
                <div className="text">
                    <div>Pros: {review.pros}</div>
                </div>
                <div className="text">
                    <div>Cons: {review.cons}</div>
                </div>
                </div>
                
            </div>
            </div>
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
        
        <div className="flightHeader"><h1>{props.accomodationReviews.map((r) => r.hotelier_name)[0]}</h1></div>
        <div className="detBox">
        <div className="detailsAcc_elements">
        <Button className="backButton" onClick={function goBack(){window.location.hash="hotels";}}>Go back   </Button>
            <div className="imageWrapper">
                
                <FaIcons.FaAngleLeft size="50px" onClick={onClickPrevCB} className="leftArrow" />  
                <img className="images" src={props.accomodationPhoto} alt="hotel" height="200"/>
                <FaIcons.FaAngleRight size="50px" onClick={onClickNextCB} className="rightArrow"/>  
            </div>
            <h2 className="boxHeader">Reviews</h2>
            <div key="reviews" >{props.accomodationReviews.map(renderReviews)}</div>
        </div>
       </div>
    </div>
       );
    }catch(error){
           return <div>No hotel reviews </div>
       }

}