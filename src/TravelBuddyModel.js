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

  loading;

  navBarRender;


  // Login user data
  credential;
  token;
  user;
  userID;



  

  // Used for storing selected hotel and flight
  savedAccommodation;
  savedFlight;
  savedActivity;

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
    this.currentAccReviews= [];
    this.accPhotos = [];
    this.currentAccommodationID = currentAccommodation;
    this.accomondations = accArray; 
    this.loading = false;

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
    this.savedActivity = "None";
    this.userSavedTrips = [];
    this.navBarRender = 0;

    this.user = {}
  }
  setState(state){
    this.loading = state;

  }


  // FETCH AND SAVE ALL THE USERS SAVED TRIP FROM FIREBASE TO MODEL

  getSavedTrips(){
    getAllUserTrips(this.userID, this);
  }

  setUserSavedTrips(v){
    this.userSavedTrips = v;
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

  // USED FOR SAVING AN ACTIVITY OPTION TO MY TRIP
  saveActivityChoice(activity){
    if (this.savedActivity === "None"){
      this.savedActivity = [activity];
    } else {
      if(!this.savedActivity.includes(activity)){
        this.savedActivity = [...this.savedActivity, activity];
      }
    }
    if(this.accommodationList){
      makeNewTrip(this).then(this.getSavedTrips())
    }
  }

  setNavBarRender(b){
    this.navBarRender = b
    this.notifyObservers();
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
    window.location.hash="startsearch"
  }

 

  doSearch(){
   
  
    if(!this.searchParams.from || !this.searchParams.to  || !this.searchParams.startDate  || !this.searchParams.endDate ){
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
      this.loading = true;
      this.notifyObservers();
      if(this.searchParams.startDate &&  this.searchParams.endDate && this.locationToLat && this.locationToLng){
      Promise.all([
       
          getHotels({startDate: this.searchParams.startDate, endDate: this.searchParams.endDate, lat: this.locationToLat, lng: this.locationToLng}),
          getFlights({fromIATA: fromObj.AITA[0], toIATA: toObj.AITA[0], startDate: this.searchParams.startDate, endDate: this.searchParams.endDate})
        ]).then(res => {
          Promise.all([res[0].json(), res[1].json()])
          .then(res => {
            this.setAccommodationList(res[0].result);
            this.setFlightList(res[1]);
            this.savedAccommodation = "none";
            this.savedFlight = "none";
            this.savedActivity = "None";
            this.setNavBarRender(2);
            window.location.hash = "hotels";
            this.loading = false;
            this.notifyObservers();
            
          })
        })
      }


    } catch(e) {
    }

   
  }

  setLat(lat){
    this.locationToLat = lat;
  }

  setLng(lng){
    this.locationToLng = lng;
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
  }

  setFlightList(l){
    this.flightsDepart=l;
    this.notifyObservers();
  }

  setActivityList(l){
    this.activityList = l;
    this.notifyObservers();
  }
 

  /**
   * Accomondation currently checked by user.
   */
  setCurrentAccomodationID(id){
    this.currentAccommodationID=id;
    this.notifyObservers();    
  }

  setAccomodationReviews(list){
    this.currentAccReviews=list;    
  }

  setAccomodationPhotos(list){
    this.accPhotos=list;    
  }
 

  setCurrentAccPhoto(index){
    if(this.photoIndex !== index || index === 0){
      this.photoIndex = index;
      this.currentAccPhoto = this.accPhotos[index];
       this.notifyObservers();
    }
  }
  viewDetailsOfAccomodation(id){
    this.loading = true;
    this.notifyObservers();
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
            this.loading = false;
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
  }

  /**
   * Acitivity currently checked by user.
   */
  setCurrentActivity(a){
    this.currentActivity = a;
    this.notifyObservers();
  }


}


export default TravelBuddyModel;