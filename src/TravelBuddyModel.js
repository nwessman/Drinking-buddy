import resolvePromise from "./resolvePromise.js";
//import {searchHotels} from "./geoSource.js"
import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig.js';
import "firebase/database";

class TravelBuddyModel {

  currentAccommodation;
  currentFlight;

  searchParams;

  startDate;
  endDate;
  
  observers;

  constructor(accArray = [], flightArray=[], activityArray = []){
    this.observers = [];
    this.startDate = {};
    this.endDate = {};
    this.searchParams = {};
    this.searchResultsPromiseState = {};

    this.accomondations = accArray; 
    this.flights = flightArray;
    this.activities = activityArray;
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
      console.log("from: " + this.searchParams.from);
      console.log("to: " + this.searchParams.to);

      let from = this.searchParams.from.toLowerCase();
      let to = this.searchParams.to.toLowerCase();

      // Get info about From location
      firebase.database().ref("Cities").child(from).get().then((snapshot) => {
        if(snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
          fromOkey = false;
        }
      }).catch((error) => {
        console.error(error);
        fromOkey = false;
      })

      // Get info about To location
      firebase.database().ref("Cities").child(to).get().then((snapshot) => {
        if(snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
          toOkey = false;
        }
      }).catch((error) => {
        console.error(error);
        toOkey = false;
      })
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

  setEndDate(date){
    this.endDate = date; 
  }

  /**
   * Accomondation currently checked by user.
   */
  setCurrentAccommodation(id){
    //TODO
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