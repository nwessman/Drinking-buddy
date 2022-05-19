

import firebase from 'firebase/app';
/**
 * This will run every time the app loads and fetch values from firebase.
 * 
 * Make sure to save data X to firebase if it needs to be cached in the 
 * model.setX(value) and add a line to fetch X to the model into the function.
 */
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
export {updateModelFromFirebase};

