

class DrinkingBuddyModel {

  currentAccommodation;
  currentFlight;

  searchParams;

  startDate;
  endDate;
  
  observers;

  constructor(){
    this.observers = [];
    this.startDate = startDate;
    this.endDate = endDate;
    this.searchParams = {};
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
   * 
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
   * 
   */
  addToActivities(){
  //TODO
  }

  /**
   * 
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