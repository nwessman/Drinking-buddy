import { API_KEY} from "./apiConfig";

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
	.then(response => console.log(response))
	.catch(err => console.error(err));
}


//     /*vi vill kunna söka med urlSearchParams genom att ange coordinaterna*/
//     const endpoint="https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?order_by=popularity&adults_number=1&units=metric&room_number=1&checkout_date=2022-10-01&filter_by_currency=SEK&locale=en-gb&checkin_date=2022-09-30&latitude=65.9667&longitude=-18.5333";
//     return fetch(endpoint+ new URLSearchParams(params),//BASE_URL+endpoint+ new URLSearchParams(params) + API_KEY, 
//     {  // object literal
//        "method": "GET", 
//        "headers": {  
// 		'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
// 		'X-RapidAPI-Key': API_KEY
// 	}            // HTTP method
//     }/* end of second fetch parameter, object */
//     )
//     .then(treatHTTPResponseACB).then(transformACB);
// }
export {getHotels};