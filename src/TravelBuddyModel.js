import firebaseConfig from "./firebaseConfig.js";
import firebase from "firebase/app";
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

    this.accomondations = accArray; 
    this.flights = flightArray;
    this.activities = activityArray;
  }

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
    //TODO 
    firebase.initializeApp(firebaseConfig);
    
    let fromOkey = true;
    let toOkey = true;

    firebase.database().ref("Airports").orderByChild('Cities').equalTo(this.searchParams.from).on("value", function(snapshot) {
      console.log("snap: " + JSON.stringify(snapshot));
      snapshot.forEach(function(data) {
          console.log("child.Cities: " + data.val().Cities);
      });
    });

    /*
    firebase.database().ref("Airports").orderByChild('AITA').equalTo('WKB').on("value", function(snapshot) {
      snapshot.forEach(function(data) {
          console.log("child.Cities: " + data.val().Cities);
      });
  });*/
    /*
    firebase.database().ref("Airports/8258").get().then((snapshot) => {
      if(snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    })
    */
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