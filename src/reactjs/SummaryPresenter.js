import SummaryView from "../views/SummaryView";
import React from "react";

export default function Summary(props) {
    return(
        <SummaryView hotels = {props.model.summaryHotels}></SummaryView>
    )
}