import resolvePromise from "./resolvePromise.js";
import {searchHotels} from "./geoSource.js"


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

  doSearch(params){
    resolvePromise(searchHotels(params), this.searchResultsPromiseState);
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