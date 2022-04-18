const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
        'X-RapidAPI-Key': '8cd206c2b8msh3bae550fb6078aep1e7d7cjsn46093ea835aa'
    }
};
function getHotels(params){
    // REQUIRES OBJECT {startDate, endDate, lat, lng}
    return fetch('https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates?order_by=popularity&adults_number=1&units=metric&room_number=1&checkout_date='+ params.endDate + '&filter_by_currency=SEK&locale=en-gb&checkin_date=' + params.startDate+ '&latitude=' + params.lat + '&longitude=' + params.lng, options)
}
function getHotelsReview(params){
    return fetch('https://booking-com.p.rapidapi.com/v1/hotels/reviews?sort_type=SORT_MOST_RELEVANT&locale=en-gb&hotel_id='+params, options)
}
export {getHotels, getHotelsReview};
