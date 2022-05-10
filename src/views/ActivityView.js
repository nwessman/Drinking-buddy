import React from "react";
import "../App.css";
import { IoIosSearch} from "react-icons/io";
import Navigation from "../reactjs/NavigationPresenter";
import { Dropdown } from 'semantic-ui-react'

import {
    useMap,
    MapContainer,
    TileLayer,
    Popup,
    Marker,
  } from 'react-leaflet'




function ActivityView(props){
    const position = [props.latitude,props.longitude];
    function UpdatePosition(){
        const map = useMap();
        map.setView(position,map.getZoom());
        map.closePopup();

        return null;
      }
      function UpdatePopUp(){
          const marker = useMap();
          marker.bindPopUp()
      }

      console.log("List of activities:");
      console.log(props.activities);
    
    function getPoints(features){
        function saveCurrentActivity(){
            console.log(features)
            props.saveCurrentActivity(features);
        }
        
        return (
        <><Marker key={features.properties.place_id} position={[features.properties.lat, features.properties.lon]} >
            <Popup key={features.properties.place_id} closeButton={false} onClick={saveCurrentActivity}>
              <h3>{features.properties.address_line1}</h3>
              {console.log('../images/' + features.properties.categories[1] + '.jpg')}
              <br />{features.properties.address_line2}
              <img src={'catering.bar.jpg'} alt="ERROR 404"/>
            </Popup>
        </Marker>
        </>);
    }
    
    function renderActivity() {
        try {
            return (
                <div>
                    <h2>{props.selectedActivity.properties.address_line1}</h2>
                    <span>{props.selectedActivity.properties.address_line2}</span>
                </div>
            );
        } catch (error) {
            return <div></div>

        }
    }
    function onActivitesChange(err, data){
        console.log(data.value);
        return props.setQueryOptions(data.value);
    }
    function onClickActivity(){
        return props.searchActivites();
    }

    try
    {
        return (

            <div className = "background_image">
                <Navigation></Navigation>
                <div className="activity">
                <MapContainer className="leafletMap" center={position} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {props.activities.map(getPoints)}
                    <UpdatePosition/>
                </MapContainer>
                <div className="searchActivity">
                <Dropdown placeholder='Choose Activity' fluid multiple selection options={props.dropDownOptions} className="dropdown" style={{width:"30rem"}} onChange={onActivitesChange}/>
                </div>
                <div className="searchActivity">
                <button className="searchAButton" onClick={onClickActivity}><IoIosSearch size="35px"/></button>
                </div>
                </div>
                
            </div>
            );

    }
   catch(error){
       console.log(error)
        return (

            <div className = "background_image">
                <Navigation></Navigation>
                Null || undefined position
                </div>
                );

    }
    
}
export default ActivityView;