import firebase from 'firebase/app';
import 'firebase/auth';        // for authentication

function createTripName(model){
    return model.locationParams.from + '*' +  model.locationParams.to + '*' + String(model.startDate) + '*' + String(model.endDate);
}

/** 
 * makeNewTrip creates a new trip under userID/trips/
*/
function makeNewTrip(model){
    let name = createTripName(model);
    return firebase.database().ref(model.userID + "/trips/" + name).set({
        from: model.locationParams.from,
        to: model.locationParams.to,
        departDate: model.startDate,
        returnDate: model.endDate,
        lat: model.locationToLat,
        lng: model.locationToLng,
        tripName: name,
        accommodationList: model.accommodationList,
        flightsDepart: model.flightsDepart,
        savedAccommodation: model.savedAccommodation,
        savedFlight: model.savedFlight,
        savedActivity: model.savedActivity,
    });
}

function deleteTripFromModel(userid, key){
    return firebase.database().ref(userid + "/trips/" + key).set(null);
}

/**
 * Get a object containing all trips for a user
 * @param userID - send userID
 */
function getAllUserTrips(userID, model){
    firebase.database().ref(userID + '/trips/').on("value", (snapshot => {
            if (snapshot.exists()){
                var res = [];
                snapshot.forEach( snap => {res = [...res, snap.val()]} )
                model.setUserSavedTrips(res);
            } else {
                model.setUserSavedTrips([]);
            }
        }))
}

export {makeNewTrip, getAllUserTrips, deleteTripFromModel};

