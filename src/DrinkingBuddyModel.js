

class DrinkingBuddyModel {

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
  setCurrentLocation(){
    //TODO
  }

  /**
   * Set destination of users choice.
   * @param {*} query 
   */
  setSearchDestination(){
    //TODO
  }

  doSearch(params){
    //TODO 
  }

  setStartDate(){
    //TODO  
  }

  setEndDate(){
    //TODO  
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


export default DrinkingBuddyModel;