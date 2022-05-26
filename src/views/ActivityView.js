import React from "react";
import "../App.css";
import { IoIosSearch} from "react-icons/io";
import Navigation from "../reactjs/NavigationPresenter";
import { Dropdown, Button, Icon } from 'semantic-ui-react'
import {
    useMap,
    MapContainer,
    TileLayer,
    Popup,
    Marker,
   
  } from 'react-leaflet'




function ActivityView(props){
    function getCategory(categoryArray){
        let category = categoryArray.find(e => 
            (e === 'commercial.supermarket' || 
             e === 'catering.bar' ||
             e === 'entertainment.museum' ||
             e === 'adult.nightclub' ||
             e ==='commercial.shopping_mall'  ||
             e ==='catering.restaurant'  ||
             e === 'entertainment.cinema' ||
             e === 'entertainment.theme_park'  ||
             e === 'healthcare.hospital')
        );
        switch (category) {
            case 'commercial.supermarket':
                    return ["https://thumbs.dreamstime.com/b/shoppingvagn-i-en-supermarket-40320116.jpg", "Supermarket"] 
    
            case 'catering.bar':
                    return ["https://static.thatsup.co/content/img/place/b/a/bar-nombre-0.jpg", "Bar"]
        
            case 'entertainment.museum':
                    return ["https://cdn.britannica.com/51/194651-050-747F0C18/Interior-National-Gallery-of-Art-Washington-DC.jpg","Museum"]
    
            case 'adult.nightclub':
                    return ["https://media.timeout.com/images/105520557/750/562/image.jpg", "Night Club"]
    
            case 'commercial.shopping_mall':
                    return ["https://visitskane.com/sites/default/files/images/list-items/2016-11/Melodifestival_Malmo_2013_foto_Fredrik_Johansson.jpg", "Shopping Mall"] 
    
            case 'catering.restaurant':
                    return ["https://static.thatsup.co/content/img/article/15/jul/b%C3%A4sta-restaurangerna-i-city.jpg", "Restaurant" ]
    
            case 'entertainment.cinema':
                    return ["https://www.europa-cinemas.org/storage/1416/prix-europa-cinemas-2018.jpeg", "Cinema"]
    
            case 'entertainment.theme_park':
                    return ["https://www.snl.com/articles/409719194.jpg", "Theme Park"]
    
            case 'healthcare.hospital':
                    return ["https://cdn.systematic.com/media/g0sj1tbg/hospital-building-001-global.jpg?cropAlias=hero_large&width=992&height=483&quality=80&mode=crop&null", "Hospital"] 
            
            default:
                return ["https://pngset.com/images/maps-icon-point-of-interest-heart-plectrum-paper-sweets-transparent-png-1545765.png", ""]
        }
    }
    const position = [props.latitude,props.longitude];


    const [map, setMap] = React.useState(null);
    // We know that it wasn't acceptable to have hooks in the view for this project but
    //This hook was added because a very common react-leaflet bug when the map is renderd at first time
    React.useEffect(() => {
       if (map) {
          setInterval(function () {
             map.invalidateSize();
          }, 400);
       }
    }, [map]);
   
    function UpdatePosition(){
        const map = useMap();
        map.setView(position,map.getZoom());  
        
        return null;
      }

    
    function getPoints(features){
        function saveCurrentActivity(){
            props.saveCurrentActivity(features);
        }
        
        return (
        <Marker key={features.properties.place_id} position={[features.properties.lat, features.properties.lon]} >
            <Popup key={features.properties.place_id} closeButton={false} onClick={saveCurrentActivity}>
            <div  key={features.properties.place_id}className="popup">
                <h2>{features.properties.name}</h2>
                <h3>{getCategory(features.properties.categories)[1]}</h3>
                <img src={getCategory(features.properties.categories)[0]} width="150" height="150" alt="ERROR 404"/><br/>
                <span className="popupText">{features.properties.address_line2}</span><br/>
                <Popup hideOnScroll = "true" content = "Hotel is now added." on = "click" trigger = {<Button data-tooltip= 'Add to "My Trips"' onClick={() => {props.saveActivityChoice(features.properties);}}><Icon name='plus'/></Button>}/>
              </div>
            </Popup>
        </Marker>
        );
    }
    
    function onActivitesChange(err, data){
        return props.setQueryOptions(data.value);
    }
    function onClickActivity(){
        return props.searchActivites();
    }
   

    try
    {
        
        return (
            <div className="background_image">
                <Navigation></Navigation> 
               {window.resizeBy(200,200)}
                <div className="searchActivity">
                    <Dropdown placeholder='Choose Activity' fluid multiple selection options={props.dropDownOptions} className="dropdown" style={{ width: "40rem"}} onChange={onActivitesChange} />
                </div>
                <div className="searchActivity">
                    <button className="searchAButton" onClick={onClickActivity}><IoIosSearch size="35px"/></button>
                </div>
               
                <MapContainer id="map" className="leafletMap" center={position} zoom={14} scrollWheelZoom={true} whenCreated={setMap}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {props.activities.map(getPoints)}
                    <UpdatePosition/> 
                </MapContainer>
            </div>
                
           
            );

    }
   catch(error){
        return (

            <div className = "background_image">
                <Navigation></Navigation>
                Null || undefined position
                </div>
                );

    }
    
}

export default ActivityView;