import React from "react";
import "../App.css";

export default function DetailsAccView(props){
    function renderReviews(hotel){
        return (
        <div key={hotel.review_hash}>
            <div >Review title: {hotel.hotel_id}</div>
            <div>Review pros: {hotel.pros}</div>
            <div>Average score: {hotel.average_score}</div>
       </div>
       );

    }
   try{
       return(
            <div key="reviews">{props.accomodationDetails.map(renderReviews)}</div>);
    }catch(error){
           return <div>NO hotels reviews {console.log(error)}</div>
       }

}