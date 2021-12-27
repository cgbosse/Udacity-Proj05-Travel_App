
async function weatherbitAPIcur(comboJSON) { 
    
    // Import node-fetch for fetch to work in nodejs
    const fetch = require('node-fetch');

    console.log(":::::::: Step 04  ::::::::");

    // Assembling the Weatherbit URL using the longitude and latitude
    console.log(":::::::: Step 04.1  ::::::::");
    let lat = comboJSON.latitude;
    let lng = comboJSON.longitude;
    
    let wbBaseURL = "https://api.weatherbit.io/v2.0/current?"  
    let weatherbitURLcur = wbBaseURL + "lat=" + lat +"&lon=" + lng + "&key=" + process.env.WEATHERBIT_API_KEY;

    console.log(":::::::: Step 04.2  ::::::::");
    console.log(weatherbitURLcur);

    const res = await fetch(weatherbitURLcur);
        
    console.log(' ::::::: weatherbitAPI - Response object: ' + res);
    
    try {
        let apiData = await res.json();
        
        combinedApiResponseJSON.weather_cur = apiData;

        console.log("The current weather is: " + combinedApiResponseJSON.weather_cur.data[0].weather.description);
        console.log(":::: combinedApiResponseJSON with current Weather data: " + combinedApiResponseJSON);

        return combinedApiResponseJSON

    }  catch(error) {
    // appropriately handle the error
    console.log("error", error);
    }
};

module.exports = weatherbitAPIcur
