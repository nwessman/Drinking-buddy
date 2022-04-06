import { API_KEY} from "./apiConfig";


// function getLocationDetails(params){

//     function treatHTTPResponseACB(response){
//         if(!response.ok) throw "API problem";     // or response.status!==200 
//         return response.json(); 
// }


    
//     const endpoint="places?";
    
//     return fetch(BASE_URL+endpoint+params+API_KEY, {  // object literal
//        "method": "GET",              // HTTP method
//     }/* end of second fetch parameter, object */
//     )
//     .then(treatHTTPResponseACB);
// }

function searchHotels(params){
    function transformACB(data){
        // debugger;
        return data.results;
        // console.log("response contains: " + response);
    }
    function treatHTTPResponseACB(response){ 
        if(!response.ok) throw "API problem";     // or response.status!==200 
        //console.log(response.json());
        return response.json(); 
}
    /*vi vill kunna söka med urlSearchParams genom att ange coordinaterna*/
    const endpoint="https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?order_by=popularity&adults_number=1&units=metric&room_number=1&checkout_date=2022-10-01&filter_by_currency=SEK&locale=en-gb&checkin_date=2022-09-30&latitude=65.9667&longitude=-18.5333";
    return fetch(endpoint+ new URLSearchParams(params),//BASE_URL+endpoint+ new URLSearchParams(params) + API_KEY, 
    {  // object literal
       "method": "GET", 
       "headers": {  
		'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
		'X-RapidAPI-Key': API_KEY
	}            // HTTP method
    }/* end of second fetch parameter, object */
    )
    .then(treatHTTPResponseACB).then(transformACB);
}
export {searchHotels}