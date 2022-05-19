

import firebase from 'firebase/app';
/**
 * This will run every time the app loads and fetch values from firebase.
 * 
 * Make sure to save data X to firebase if it needs to be cached in the 
 * model.setX(value) and add a line to fetch X to the model into the function.
 */

// userid/trips

// userid/trips/stockholmmadrid202002423/
// userid/trips/parisberlin2022040502512

// UserId/Trip/stockholmmadrid202002423/Model
// UserId/Trip/stockholmmadrid202002423/Flights
// UserID/Trip/stockholmmadrid202002423/Hotels
// UserId/trip/stockholmmadrid202002423/Activities

function createTripName(model){
    return model.searchParams.from + model.searchParams.to + String(model.startDate) + String(model.endDate);
}   

/** 
 * makeNewTrip creates a new trip under userID/trips/
*/
function makeNewTrip(userID, model){
   
    let firebaseModel = {
        accommodationList: model.accommodationList,
        flightsDepart: model.flightsDepart,   
    }
    firebase.database().ref(userID + "/trips/" + createTripName(model)).set(firebaseModel)
}


/**
 * Get a object containing trips- used for myTripsView
 */
// function loadAllUserTrips(userID){
//     firebase.database().ref(userID + "/trips").on("value", (snapshot => 
//         {
//             if (snapshot.exists()){
//                 let returnValue = snapshot.val().map(item => {
//                     console.log()
//                 })
//                 return snapshot.val();
//                 //Key + from to dateFrom DateTo 
//             }
//             else{
//                 return {};
//             }
//         }))
// }



function updateModelFromFirebase(uid){
    // firebase.database().ref(uid +"/model/accommodationList").on("value", (snapshot => {if(snapshot.exists()) model.setAccommodationList(snapshot.val())}));
    // firebase.database().ref(uid +"/model/currentAccommodationID").on("value", (snapshot => {if(snapshot.exists()) model.setCurrentAccomodationID(snapshot.val())}));
    // firebase.database().ref(uid +"/model/currentAccReviews").on("value", (snapshot => {if(snapshot.exists()) model.setAccomodationReviews(snapshot.val())}));
    // firebase.database().ref(uid +"/model/accPhotos").on("value", (snapshot => {if(snapshot.exists()) model.setAccomodationPhotos(snapshot.val())}));
    // firebase.database().ref(uid +"/model/locationToLat").on("value", (snapshot => {if(snapshot.exists()) model.setLat(snapshot.val())}));
    // firebase.database().ref(uid +"/model/locationToLng").on("value", (snapshot => {if(snapshot.exists()) model.setLng(snapshot.val())}));
    // firebase.database().ref(uid +"/model/activityList").on("value", (snapshot => {if(snapshot.exists()) model.setActivityList(snapshot.val())}));
    // firebase.database().ref(uid +"/model/activityQuerySelections").on("value", (snapshot => {if(snapshot.exists()) model.setActivityQuerySelections(snapshot.val())}));
    // firebase.database().ref(uid +"/model/flightsDepart").on("value", (snapshot => {if(snapshot.exists()) model.setFlightList(snapshot.val())}));
}
export {updateModelFromFirebase, makeNewTrip};

