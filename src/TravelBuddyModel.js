import resolvePromise from "./resolvePromise.js";
import firebase from 'firebase/app';
import "firebase/database";
import citiesList from "./cityInfoDB.js"

import { getFlights, getHotels, getHotelsReview, getActivites } from "./geoSource.js";


class TravelBuddyModel {

  flightsDepart;
  flightsReturn;
  accommodationList;
  currentAccommodationID;
  locationFromIATA;
  locationToIATA;
  locationToLng;
  locationToLat;
  LocationTo;
  currentFlight;
  searchParams;
  searchResultsPromiseState;
  currentAccPromiseState;
  currentAccReviews;
  accPhotos;
  currentAccPhoto;
  startDate;
  endDate;
  photoIndex;
  observers;
  searchStringFrom;
  searchStringTo;
  activityList;
  activityQuerySelections;
  currentActivity;
 

  constructor(accArray = [], flightArray=[], currentAccommodation){
    this.accommodationList = [];
    this.flightsDepart = [];
    this.flightsReturn = {};
    this.observers = [];
    this.startDate = {};
    this.endDate = {};
    this.searchParams = {};
    this.searchResultsPromiseState = {};
    this.currentAccPromiseState = {};
    this.currentAccReviews= [];
    this.accPhotos = [];
    this.currentAccommodationID = currentAccommodation;
    this.accomondations = accArray; 

    this.flights = flightArray;

    this.currentAccPhoto = [];
    this.photoIndex = 0;
    this.searchStringFrom = "";
    this.searchStringTo = "";
    this.locationToLat = 59.334591; //default coordinates for map
    this.locationToLng = 18.063240; // default coordinates for map
    this.activityList = [];


  }
  setSearchLongQuery(long){this.searchParams.query.longitute=long}
  setSearchLatQuery(lat){this.searchParams.query.latitute=lat}

  addObserver(callback) {
      this.observers = [...this.observers, callback];
  }

  setSearchStringTo(val){
    this.searchStringTo = val;
  }

  setSearchStringFrom(val){
    this.searchStringFrom = val;
  }

  removeObserver(callback) {
      function removeCallbackCB(element) {
          if(element !== callback) return true;
          return false;
      }

      this.observers = this.observers.filter(removeCallbackCB);
  }

  notifyObservers(payload) {
    console.log(this.observers);
      this.observers.forEach(
          function invokeObserverCB(obs) { 
              try {
                  obs(payload);
              }catch(err) {
                  console.error(err);
              }
          }
      )
  }

  /**
   * Set current location.
   * @param {*} query 
   */
  setCurrentLocation(from){
    this.searchParams.from = from;
  }

  /**
   * Set destination of users choice.
   * @param {*} query 
   */
  setSearchDestination(to){
    this.searchParams.to = to;
  }




  doSearch(){

    // try because empty or wrong params in search input will crash this function 
    try {
      let cityFrom = this.searchParams.from.split(",")[0];
      let countryFrom = this.searchParams.from.split(",")[1];
      let cityTo = this.searchParams.to.split(",")[0];
      let countryTo = this.searchParams.to.split(",")[1];

      let fromObj = citiesList.find(o => o.city === cityFrom.trim() && o.country === countryFrom.trim());
      let toObj = citiesList.find(o => o.city === cityTo.trim() && o.country === countryTo.trim());
      
      this.setLat(toObj.lat);
      this.setLng(toObj.lng);

        // Accomodation
      if(this.startDate &&  this.endDate && this.locationToLat && this.locationToLng){
        // REQUIRES OBJECT {startDate, endDate, lat, lng}
        getHotels({startDate: this.startDate, endDate: this.endDate, lat: this.locationToLat, lng: this.locationToLng})
        .then(response => response.json())
        .then(response => { 
                this.setAccommodationList(response.result);
                firebase.database().ref("model/accommodationList").set(this.accommodationList);
                this.notifyObservers();
                window.location.hash = "hotels";
              
                }
          ).catch(err => console.error(err));
      
      }
        
      // Flights
      if(this.startDate && this.endDate && fromObj.AITA[0] && toObj.AITA[0]){
        getFlights({fromIATA: fromObj.AITA[0], toIATA: toObj.AITA[0], startDate: this.startDate, endDate: this.endDate})
        .then(results => results.json())
        .then(results => {
          this.setFlightList(results);

        })
      } else {console.log("Error in flight search")}
    } catch(e) {
      console.log("error: " + e);
    }

   
  }

  setLat(lat){
    this.locationToLat = lat;
    console.log("Position lat:" +this.locationToLat);
    firebase.database().ref("model/locationToLat").set( this.locationToLat);
   

  }
  setLng(lng){
    this.locationToLng = lng;
    console.log("Position long" +  this.locationToLng);
    firebase.database().ref("model/locationToLng").set(this.locationToLng);

  }

  setStartDate(date){
    this.startDate = date;
  }

  setAccommodationList(l){
    this.accommodationList = l;
    firebase.database().ref("model/accommodationList").set(this.accommodationList);
  }

  
  setFlightList(l){
    this.flightsDepart=l;
    firebase.database().ref("model/flightsDepart").set(this.flightsDepart);
  }


  setActivityList(l){
    this.activityList = l;
    if(this.activityList !== undefined)
    firebase.database().ref("model/activityList").set(this.activityList);
  }
 

  setEndDate(date){
    this.endDate = date; 
  }

  /**
   * Accomondation currently checked by user.
   */
  setCurrentAccomodationID(id){
    this.currentAccommodationID=id;
    firebase.database().ref("model/currentAccommodationID").set(this.currentAccommodationID);
    
  }
  setAccomodationReviews(list){
    this.currentAccReviews=list;
    firebase.database().ref("model/currentAccReviews").set(this.currentAccReviews);
    
  }
  setAccomodationPhotos(list){
    this.accPhotos=list;
    firebase.database().ref("model/accPhotos").set(this.accPhotos);
    
  }
 

  setCurrentAccPhoto(index){
    if(this.photoIndex !== index || index === 0){
      this.photoIndex = index;
      this.currentAccPhoto = this.accPhotos[index];
       this.notifyObservers();
    }
    else console.log("fel foto index: "+this.photoIndex);

    

  }
  viewDetailsOfAccomodation(id){
    if(id !== this.currentAccommodationID){
    let arr = [];
      Promise.all(getHotelsReview(id)).then(function(responses){
        return  Promise.all(responses.map(response => {return response.json()}))
      }
       
      ).then(responses => {
            this.setCurrentAccomodationID(id);
            this.setAccomodationReviews(responses[0].result);
            arr = responses[1].map(({url_max}) => url_max); 
            this.setAccomodationPhotos(arr);
            this.setCurrentAccPhoto(0);

            this.notifyObservers();
            window.location.hash="#details_acc";
        }
      ).catch(error => console.log(error));
     
    } else { window.location.hash="#details_acc"; }
  }

  viewActivities(){
    console.log("searching activies");
    console.log(this.activityQuerySelections)

    if(this.locationToLat !== undefined && this.locationToLng !== undefined && this.activityList !== undefined)
    getActivites({activities: this.activityQuerySelections, lat: this.locationToLat, long: this.locationToLng})
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.setActivityList(response.features);
      this.notifyObservers();
     }
    )
    .catch(err => console.error(err));
    
  }



  setActivityQuerySelections(val){
    this.activityQuerySelections = val;
    firebase.database().ref("model/activityQuerySelections").set(this.activityQuerySelections);
  }


  /**
   * Add accomondation to list.
   */
  addToAccommodation(){
    //TODO 
  }

  /**
   * Remove accommodation from list.
   */
  removeFromAccommodation(){
    //TODO
  }

  /**
   * Acitivity currently checked by user.
   */
  setCurrentActivity(a){
    this.currentActivity = a;
    this.notifyObservers();
  }

  /**
   * Saves the current selection of desired activites to search for in the target location.
   */
  addToActivities(){
    
  }

  /**
   * Remove activity from list.
   */
  removeFromActivities(){
    //TODO
  }

  /**
   * Flight currently checked by user.
   */
  setCurrentFlight(){
    //TODO
  }

}


export default TravelBuddyModel;