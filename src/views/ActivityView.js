import React from "react";
import "../App.css";
import Navigation from "../reactjs/NavigationPresenter";

function ActivityView(props){

    return (
        <div className = "background_image">
            <Navigation></Navigation>
            Det här är aktiviteter.
        </div>
        );
}
export default ActivityView;