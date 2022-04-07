import TravelBuddyModel from "./TravelBuddyModel";
function getHotels(params){
    // REQUIRES OBJECT {startDate, endDate, lat, lng}
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
            'X-RapidAPI-Key': '8cd206c2b8msh3bae550fb6078aep1e7d7cjsn46093ea835aa'
        }
    };

    return fetch('https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?order_by=popularity&adults_number=1&units=metric&room_number=1&checkout_date='+ params.endDate + '&filter_by_currency=SEK&locale=en-gb&checkin_date=' + params.startDate+ '&latitude=' + params.lat + '&longitude=' + params.lng, options)
	.then(response => response.json())
    .then(response => {
        console.log(response);
        TravelBuddyModel.setAccommodationList(response.results);
        TravelBuddyModel.notifyObservers();
        window.location.hash = "hotels";
        }
    ).catch(err => console.error(err));
}
export {getHotels};
