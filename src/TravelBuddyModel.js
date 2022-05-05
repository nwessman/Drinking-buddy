import resolvePromise from "./resolvePromise.js";
import firebase from 'firebase/app';
import "firebase/database";
import { getFlights, getHotels, getHotelsReview } from "./geoSource.js";

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

  constructor(accArray = [], flightArray=[], activityArray = [], currentAccommodation){
    this.accommodationList = [];
    this.flightsDepart = {};
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
    this.activities = activityArray;
    this.currentAccPhoto = [];
    this.photoIndex = 0;

  }
  setSearchLongQuery(long){this.searchParams.query.longitute=long}
  setSearchLatQuery(lat){this.searchParams.query.latitute=lat}

  addObserver(callback) {
      this.observers = [...this.observers, callback];
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

    let fromOkey = true;
    let toOkey = true;

    // try because empty or wrong params in search input will crash this function 
    try {
      let from = this.searchParams.from.toLowerCase();
      let to = this.searchParams.to.toLowerCase();

      let fromSnapshot;
      let toSnapshot;


  


      // Get info about From location
      const promiseClusterFuck = new Promise((resolve, reject) => {
        firebase.database().ref("Cities").child(from).get().then((snapshot) => {
          if(snapshot.exists()) {
            console.log("snap 1" + snapshot.val());
            fromSnapshot = snapshot.val();
            resolve(fromSnapshot);
          } else {
            console.log("No data available");
            fromOkey = false;
            reject(null);
          }
        }).catch((error) => {
          console.error(error);
          fromOkey = false;
          reject(null);
        })
      }).then((value) => {
        // Get info about To location 
        console.log("getFrom value "+value);
        const result = []
        result[0] = value;
        return new Promise((resolve, reject) => {
        firebase.database().ref("Cities").child(to).get().then((snapshot) => {
          if(snapshot.exists()) {
            console.log("snap 2: " + snapshot.val());
            toSnapshot = snapshot.val();
            result[1] = toSnapshot;
            resolve(result);
          } else {
            console.log("No data available");
            toOkey = false;
            reject(null);
          }
        }).catch((error) => {
          console.error(error);
          toOkey = false;
          reject(null);
        })});
      }).then((value) => {
        this.locationToLat = value[1].lat;
        this.locationToLng = value[1].lng;
        console.log("startdate: " + this.startDate + "enddate: " +  this.endDate + "to lat: " + this.locationToLat + "to lng" + this.locationToLng);
        if(this.startDate &&  this.endDate && this.locationToLat && this.locationToLng){
          // REQUIRES OBJECT {startDate, endDate, lat, lng}
          getHotels({startDate: this.startDate, endDate: this.endDate, lat: this.locationToLat, lng: this.locationToLng})
          .then(response => response.json())
          .then(response => { // Response is query.json, response.result contains hotels.
                  console.log(response);
                  this.setAccommodationList(response.result);
                  firebase.database().ref("model/accommodationList").set(this.accommodationList);
                  this.notifyObservers();
                  window.location.hash = "hotels";
                  }
            ).catch(err => console.error(err));
        }
        
        console.log("get flights");
        console.log("Before: startDate: " + JSON.stringify(this.startDate) + " endDate: " +  JSON.stringify(this.endDate) + " airport[0]: " + JSON.stringify(value[0].airport[0]) + " aiport[1]: "+ JSON.stringify(value[1].airport[0]));
        if(this.startDate && this.endDate && value[0].airport[0] && value[1].airport[0]){
          getFlights({fromIATA: value[0].airport[0], toIATA: value[1].airport[0], startDate: this.startDate, endDate: this.endDate})
          .then(results => results.json()).then(results => {
            console.log("Cluster fuck results: " + JSON.stringify(results));
          })
        } else {console.log("startDate: " + JSON.stringify(this.startDate) + " endDate: " +  JSON.stringify(this.endDate) + " airport[0]: " + JSON.stringify(value[0].airport[0]) + " aiport[1]: "+ JSON.stringify(value[1].airport[0]))}

      });


      const theModel = this;
      function notifyACB(){
        theModel.notifyObservers();
      }
      resolvePromise(promiseClusterFuck, this.searchResultsPromiseState, notifyACB);

    } catch(error) {
      console.log("Error in doSearch: " + error);
      fromOkey = false;
      toOkey = false;
      // FIX: Reroute back to search (or dont reroute until results are given from this function)
    }
  }

  setStartDate(date){
    this.startDate = date;
  }

  setAccommodationList(l){
    this.accommodationList = l;
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

  setPhotoIndex(index){
    this.photoIndex = index;
      firebase.database().ref("model/photoIndex").set(this.photoIndex);
  }

  setCurrentAccPhoto(){
    //if(this.photoIndex !== index || index === 0){
      this.currentAccPhoto = this.accPhotos[0];
      firebase.database().ref("model/currentAccPhoto").set(this.currentAccPhoto);
      this.notifyObservers();
      // console.log("index:" + this.photoIndex);
      // console.log(this.currentAccPhoto);
    //}
    //else console.log("fel foto index: "+this.photoIndex);
    

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
            this.setPhotoIndex(0)
            this.setCurrentAccPhoto();
          //   console.log(this.currentAccReviews);
          //  console.log("photos array:");
          //   console.log(this.accPhotos);
          //  console.log("current photo:");
          // console.log(this.currentAccPhoto);
            this.notifyObservers();
            window.location.hash="#details_acc";
        }
      ).catch(error => console.log(error));
     
     // resolvePromise(getHotelsReview(id), this.currentAccPromiseState, notifyACB);
    } else { window.location.hash="#details_acc"; }
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
  setCurrentActivity(){
    //TODO
  }

  /**
   * Add activity to list.
   */
  addToActivities(){
  //TODO
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
