async function geonameAPI(city) { 
    
    // Import node-fetch for fetch to work in nodejs
    const fetch = require('node-fetch');


    let geonameURL ='http://api.geonames.org/searchJSON?q=';
    // geoname API function variables
    console.log(":::::::: Step 03.1  ::::::::");
    let formDestCity = city;
    let jsonRows = '&maxRows=1';
    let userName = '&username=' + process.env.GEONAME_API_KEY;
    geonameURL = geonameURL+formDestCity+jsonRows+userName;

    console.log(":::::::: Step 03.2  ::::::::");
    console.log(geonameURL);
    
    const res = await fetch(geonameURL);
        
    console.log(' ::::::: geonameAPI - Response object: ' + res);
    
    try {
        let apiData = await res.json();
        
        // create variables to extract the necessary data from the API response
        let longitude = apiData.geonames[0].lng;
        let latitude = apiData.geonames[0].lat;

        // adding these two information bits to the combined response Json
        combinedApiResponseJSON.longitude = longitude;
        combinedApiResponseJSON.latitude = latitude;
        
        console.log("::: geoname response longitude:" + longitude);
        console.log("::: geoname response latitude:" + latitude);
        console.log(":::: combinedApiResponseJSON with longitude and latitude: " + combinedApiResponseJSON );
        
        return combinedApiResponseJSON
    }  catch(error) {
    // appropriately handle the error
    console.log("error", error);
    }
};

module.exports = geonameAPI;