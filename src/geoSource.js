import { BASE_URL, API_KEY} from "./apiConfig";


function getLocationDetails(params){

    function treatHTTPResponseACB(response){
        if(!response.ok) throw "API problem";     // or response.status!==200 
        return response.json(); 
}


    
    const endpoint="places?";
    
    return fetch(BASE_URL+endpoint+params+API_KEY, {  // object literal
       "method": "GET",              // HTTP method
    }/* end of second fetch parameter, object */
    )
    .then(treatHTTPResponseACB);
}

function searchActivites(params){
    function transformACB(data){
        // debugger;
        return data.results;
        // console.log("response contains: " + response);
    }
    function treatHTTPResponseACB(response){ 
        if(!response.ok) throw "API problem";     // or response.status!==200 
        return response.json(); 
}
    
    const endpoint="places?";
    return fetch(BASE_URL+endpoint+ new URLSearchParams(params) + API_KEY, {  // object literal
       "method": "GET",              // HTTP method
    }/* end of second fetch parameter, object */
    )
    .then(treatHTTPResponseACB).then(transformACB);
}
export {searchActivites, getLocationDetails}