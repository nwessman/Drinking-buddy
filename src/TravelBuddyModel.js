import firebase from 'firebase/app';
import "firebase/database";
import citiesList from "./cityInfoDB.js"
import {updateModelFromFirebase} from "./firebaseMethods.js"

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
  // Login user data
  credential;
  token;
  user;
  /**
   * userSavedTrips är en lista av sparade resor. En resa skapas när en användare sparar
   */
  userSavedTrips;

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
    this.userName = "";


  }
  setSearchLongQuery(long){this.searchParams.query.longitute=long}
  setSearchLatQuery(lat){this.searchParams.query.latitute=lat}


  setCredential(c){this.credential = c;}
  setToken(t){this.token = t;}
  setUser(u){this.user = u;}

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


  loadUserModel(uid){
    updateModelFromFirebase(uid);

   
    
    window.location.hash="startsearch"
  }


  doSearch(){

    if(!this.searchParams.from || !this.searchParams.to  || !this.startDate  || !this.endDate ){
        return;
      }
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
      }

      window.location.hash = "hotels";
    } catch(e) {
    }

   
  }

  setLat(lat){
    this.locationToLat = lat;
    //firebase.database().ref(this.user.uid + "/model/locationToLat").set( this.locationToLat);
   

  }
  setLng(lng){
    this.locationToLng = lng;
    //firebase.database().ref("model/locationToLng").set(this.locationToLng);
  }

  setStartDate(date){
    this.startDate = date;
  }

  setAccommodationList(l){
    this.accommodationList = l;
    this.notifyObservers();
    //firebase.database().ref("model/accommodationList").set(this.accommodationList);
  }

  
  setFlightList(l){
    this.flightsDepart=l;
    this.notifyObservers();
    //firebase.database().ref("model/flightsDepart").set(this.flightsDepart);
  }


  setActivityList(l){
    this.activityList = l;
    this.notifyObservers();
    //if(this.activityList !== undefined)
    //firebase.database().ref("model/activityList").set(this.activityList);
  }
 

  setEndDate(date){
    this.endDate = date; 
  }

  /**
   * Accomondation currently checked by user.
   */
  setCurrentAccomodationID(id){
    this.currentAccommodationID=id;
    this.notifyObservers();
    //firebase.database().ref("model/currentAccommodationID").set(this.currentAccommodationID);
    
  }
  setAccomodationReviews(list){
    this.currentAccReviews=list;
    //firebase.database().ref("model/currentAccReviews").set(this.currentAccReviews);
    
  }
  setAccomodationPhotos(list){
    this.accPhotos=list;
    //firebase.database().ref("model/accPhotos").set(this.accPhotos);
    
  }
 

  setCurrentAccPhoto(index){
    if(this.photoIndex !== index || index === 0){
      this.photoIndex = index;
      this.currentAccPhoto = this.accPhotos[index];
       this.notifyObservers();
    }
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
      );
     
    } else { window.location.hash="#details_acc"; }
  }

  viewActivities(){

    if(this.locationToLat !== undefined && this.locationToLng !== undefined && this.activityList !== undefined)
    getActivites({activities: this.activityQuerySelections, lat: this.locationToLat, long: this.locationToLng})
    .then(response => response.json())
    .then(response => {
      this.setActivityList(response.features);
      this.notifyObservers();
     }
    );
    
  }



  setActivityQuerySelections(val){
    this.activityQuerySelections = val;
    //firebase.database().ref("model/activityQuerySelections").set(this.activityQuerySelections);
  }

  /**
   * Acitivity currently checked by user.
   */
  setCurrentActivity(a){
    this.currentActivity = a;
    this.notifyObservers();
  }
  
  
  loadUserModel(user){
    
    window.location.hash="startsearch"
  }


}


export default TravelBuddyModel;