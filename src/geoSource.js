const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
        //Too many requests: 8cd206c2b8msh3bae550fb6078aep1e7d7cjsn46093ea835aa, 8e4d3d840dmsh3141333837e184cp12fa23jsn69c699a52e20
        'X-RapidAPI-Key': '25b952d641msh54451862a88882bp180f0ajsn92f79bb28ad5'
    }
};
/**
 * REQUIRES OBJECT {startDate, endDate, lat, lng}
 */
function getHotels(params){
    
    return fetch('https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?order_by=popularity&adults_number=1&units=metric&room_number=1&checkout_date='+ params.endDate + '&filter_by_currency=SEK&locale=en-gb&checkin_date=' + params.startDate+ '&latitude=' + params.lat + '&longitude=' + params.lng, options)
}
function getHotelsReview(params){
    return [fetch('https://booking-com.p.rapidapi.com/v1/hotels/reviews?sort_type=SORT_MOST_RELEVANT&locale=en-gb&hotel_id='+params, options),fetch('https://booking-com.p.rapidapi.com/v1/hotels/photos?locale=en-gb&hotel_id='+params,options)]
 
}


const options1 = {
	method: 'GET',
	headers: {
		'X-Access-Token': '502e1cf38e197f15ef267a738e7c424c',
		'X-RapidAPI-Host': 'travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com',
		'X-RapidAPI-Key': '25b952d641msh54451862a88882bp180f0ajsn92f79bb28ad5'
	}
};
/**
 *  REQUIRES OBJECT {fromIATA: "123", toIATA: "123", startDate: "2000-01-01", endData: "2000-01-02"}
 */
function getFlights(params){
    return fetch('https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v2/prices/nearest-places-matrix?origin='+params.fromIATA+'&destination='+params.toIATA+'&flexibility=0&currency=SEK&depart_date='+params.startDate+'&show_to_affiliates=true', options1)
}

function getActivites(params){
    console.log('https://api.geoapify.com/v2/places?categories='+params.activities.join()+'&filter=circle:'+params.long+','+params.lat+','+'5000&bias=proximity:'+params.long+','+params.lat+'&lang=en&limit=20&apiKey=fb2c7d7c2d3d4ef2b898bb7d0ae99881')
  
    const reqOption ={method:'GET',};
    return fetch('https://api.geoapify.com/v2/places?categories='+params.activities.join()+'&filter=circle:'+params.long+','+params.lat+','+'5000&bias=proximity:'+params.long+','+params.lat+'&lang=en&limit=20&apiKey=fb2c7d7c2d3d4ef2b898bb7d0ae99881',reqOption)
    //https://api.geoapify.com/v2/places?categories=commercial,commercial.bag,activity&filter=circle:18.0710935,59.3251172,50000&bias=proximity:18.0710935,59.3251172&lang=en&limit=30&apiKey=fb2c7d7c2d3d4ef2b898bb7d0ae99881
}

export {getHotels, getHotelsReview, getActivites, getFlights};

