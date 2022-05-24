import firebase from 'firebase/app';
import "firebase/database";
import citiesList from "./cityInfoDB.js"
import {makeNewTrip, getAllUserTrips, deleteTripFromModel} from "./firebaseMethods.js"

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
  locationParams;
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
  userID;
  
  // Used for storing selected hotel and flight
  savedAccommodation;
  savedFlight;

  // Used for storing all saved trips
  userSavedTrips;

  constructor(accArray = [], flightArray=[], currentAccommodation){
    this.accommodationList = [];
    this.flightsDepart = [];
    this.flightsReturn = {};
    this.observers = [];
    this.startDate = {};
    this.endDate = {};
    this.searchParams = {};
    this.locationParams = {}
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

    this.savedAccommodation = "none";
    this.savedFlight = "none";
    this.userSavedTrips = []

    this.user = {photoURL: ""}
  }

  // FETCH AND SAVE ALL THE USERS SAVED TRIP FROM FIREBASE TO MODEL
  getSavedTrips(){
    getAllUserTrips(this.userID, this);
  }

  setUserSavedTrips(v){
    this.userSavedTrips = v;
    console.log(this.userSavedTrips)
    this.notifyObservers();
  }

  // USED FOR DELETING A SAVED TRIP
  deleteSavedTrip(key){
    deleteTripFromModel(this.userID, key).then(() => {this.getSavedTrips()})
  }

  // USED FOR SAVING A HOTEL OPTION TO MY TRIP
  saveHotelChoice(hotel){
    this.savedAccommodation = hotel;
    makeNewTrip(this).then(() => {this.getSavedTrips()})
  }

  // USED FOR SAVING A FLIGHT OPTION TO MY TRIP
  saveFlightChoice(flight){
    this.savedFlight = flight;
    makeNewTrip(this).then(this.getSavedTrips())
  }

  
  // THIS LOADS A SAVED TRIP INTO THE MODEL
  loadSomeTrip(someTrip){
    this.locationToLat = someTrip.lat;
    this.locationToLng = someTrip.lng;
    this.accommodationList = (someTrip.accommodationList) ? someTrip.accommodationList : [];
    this.flightsDepart = (someTrip.flightsDepart) ? someTrip.flightsDepart : [];
    this.savedAccommodation = someTrip.savedAccommodation;
    this.savedFlight = someTrip.savedFlight;
    this.locationParams.to = someTrip.to;
    this.locationParams.from = someTrip.from;
    this.startDate = someTrip.departDate;
    this.endDate = someTrip.returnDate;
    this.notifyObservers();
    window.location.hash = "hotels"
  }

  setSearchLongQuery(long){this.searchParams.query.longitute=long}
  setSearchLatQuery(lat){this.searchParams.query.latitute=lat}


  setCredential(c){this.credential = c;}
  setToken(t){this.token = t;}
  setUserID(u){this.userID = u;}
  setFullUser(u){this.user = u;}

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

  // SearchParams object is used for making a search, locationParams is used for the trip loaded into model.
  setCurrentLocation(from){
    this.searchParams.from = from;
    this.locationParams.from = from;
  }

  // SearchParams object is used for making a search, locationParams is used for the trip loaded into model.
  setSearchDestination(to){
    this.searchParams.to = to;
    this.locationParams.to = to;
  }


  loadUserModel(uid){
    //updateModelFromFirebase(uid);

   
    
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

      if(this.searchParams.startDate &&  this.searchParams.endDate && this.locationToLat && this.locationToLng){
        Promise.all([
          getHotels({startDate: this.searchParams.startDate, endDate: this.searchParams.endDate, lat: this.locationToLat, lng: this.locationToLng}),
          getFlights({fromIATA: fromObj.AITA[0], toIATA: toObj.AITA[0], startDate: this.searchParams.startDate, endDate: this.searchParams.endDate})
        ]).then(res => {
          console.log("promises resloved");
          console.log(res);
          Promise.all([res[0].json(), res[1].json()])
          .then(res => {
            console.log(res)
            this.setAccommodationList(res[0].result);
            this.setFlightList(res[1]);
            window.location.hash = "hotels";
            //makeNewTrip(this);
            
          })
        })
      }

        // Accomodation
      // if(this.startDate &&  this.endDate && this.locationToLat && this.locationToLng){
      //   // REQUIRES OBJECT {startDate, endDate, lat, lng}
      //   getHotels({startDate: this.startDate, endDate: this.endDate, lat: this.locationToLat, lng: this.locationToLng})
      //   .then(response => response.json())
      //   .then(response => { 
      //           this.setAccommodationList(response.result);
      //           window.location.hash = "hotels";
      //           }
      //     ).catch(err => console.error(err));
      
      // }
        
      // // Flights
      // if(this.startDate && this.endDate && fromObj.AITA[0] && toObj.AITA[0]){
      //   getFlights({fromIATA: fromObj.AITA[0], toIATA: toObj.AITA[0], startDate: this.startDate, endDate: this.endDate})
      //   .then(results => results.json())
      //   .then(results => {
      //     this.setFlightList(results);

      //   })
      // }

      // window.location.hash = "hotels";
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

  // SearchParams object is used for making a search, startDate is used for the trip loaded into model.
  setStartDate(date){
    this.searchParams.startDate = date;
    this.startDate = date;
  }

  // SearchParams object is used for making a search, startDate is used for the trip loaded into model.
  setEndDate(date){
    this.searchParams.endDate = date;
    this.endDate = date; 
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