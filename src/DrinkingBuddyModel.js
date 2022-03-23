

class DrinkingBuddyModel {

  promille;
  startTime;
  endTime;
  drinkTypes;
  priceClass;
  searchParams; // = {type: online/your store, query: "input"}
  store;
  preferences;
  observers;

  constructor(promille = 1, startTime = 18, endTime = 24, drinkTypes =  [], priceClass = "standard", store = "", preferences = []){
    this.observers = [];
    this.promille = promille;
    this.startTime = startTime;
    this.endTime = endTime;
    this.drinkTypes = drinkTypes;
    this.priceClass = priceClass;
    this.store = store;
    this.preferences = preferences;

    this.searchParams = {type: "online"};
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
   * Set the type of the search, in this case "Online" or "Store".
   * @param {*} type 
   */
  setSearchType(type){
    this.searchParams.type = type; 
  }

  /**
   * Set the free text query of search.
   * @param {*} query 
   */
  setSearchQuery(query){
    this.searchParams.query = query;
  }

  doSearch(params){
    //Todo 
  }

  addToPreferences(drink){
    //todo 
  }

  removeFromPrefences(drink){
    //todo
  }

  addDrinkTypeToFilter(type){
    //todo
  }

  removeDrinkTypeFromFilter(type){
   //todo 
  }

  changePriceClass(priceClass){
    //todo
  }

  changePromille(promille){
    //todo
  }

  changeStartTime(startTime){
    //todo
  }

  changeEndTime(endtime){
    //todo
  }

}


export default DrinkingBuddyModel;