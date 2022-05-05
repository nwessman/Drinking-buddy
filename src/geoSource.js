const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
        //Too many requests: 8cd206c2b8msh3bae550fb6078aep1e7d7cjsn46093ea835aa
        'X-RapidAPI-Key': '8e4d3d840dmsh3141333837e184cp12fa23jsn69c699a52e20'
    }
};
function getHotels(params){
    // REQUIRES OBJECT {startDate, endDate, lat, lng}
    return fetch('https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?order_by=popularity&adults_number=1&units=metric&room_number=1&checkout_date='+ params.endDate + '&filter_by_currency=SEK&locale=en-gb&checkin_date=' + params.startDate+ '&latitude=' + params.lat + '&longitude=' + params.lng, options)
}
function getHotelsReview(params){
    return [fetch('https://booking-com.p.rapidapi.com/v1/hotels/reviews?sort_type=SORT_MOST_RELEVANT&locale=en-gb&hotel_id='+params, options),fetch('https://booking-com.p.rapidapi.com/v1/hotels/photos?locale=en-gb&hotel_id='+params,options)]
 
}

function getActivites(){
    return fetch("https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=circle:18.0710935,59.3251172,5000&bias=proximity:18.0710935,59.3251172&limit=20&apiKey=fb2c7d7c2d3d4ef2b898bb7d0ae99881","GET")
}

export {getHotels, getHotelsReview, getActivites};
