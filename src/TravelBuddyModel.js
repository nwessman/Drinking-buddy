import resolvePromise from "./resolvePromise.js";
import {searchHotels} from "./geoSource.js"
import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig.js';
import "firebase/database";
import { getHotels } from "./geoSource.js";

class TravelBuddyModel {

  AccommodationList;
  currentAccommodation;
  locationToLng;
  locationToLat;
  LocationTo;



  currentFlight;

  searchParams;
  searchResultsPromiseState;

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
        this.locationToLat = value[1].child("lat");
        this.locationToLng = value[1].child("lng");
        console.log("startdate: " + this.startDate + "enddate: " +  this.endDate + "to lat: " + this.locationToLat + "to lng" + this.locationToLng);
        if(this.startDate &&  this.endDate && this.locationToLat && this.locationToLng){
          getHotels(this.startDate, this.endDate, this.locationToLat, this.locationToLng);
        }
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
    this.AccommodationList = l;
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