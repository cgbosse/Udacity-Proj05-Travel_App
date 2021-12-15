
//-------------- Weather Forecast 16 Days --------------

let weatherbitAPIfor= async function(comboJSON) { 
    
    // Import node-fetch for fetch to work in nodejs
    const fetch = require('node-fetch');

    console.log(":::::::: Step 05  ::::::::");

    // Assembling the Weatherbit URL using the longitude and latitude
    console.log(":::::::: Step 05.1  ::::::::");
    let lat = comboJSON.latitude;
    let lng = comboJSON.longitude;
    
    let wbBaseURL = "https://api.weatherbit.io/v2.0/forecast/daily?"  
    let weatherbitURLfor = wbBaseURL + "lat=" + lat +"&lon=" + lng + "&key=" + process.env.WEATHERBIT_API_KEY;

    console.log(":::::::: Step 05.2  ::::::::");
    console.log(weatherbitURLfor);

    const res = await fetch(weatherbitURLfor);
        
    console.log(' ::::::: weatherbitAPI Forecast - Response object: ' + res);
    
    try {
        let apiData = await res.json();

        combinedApiResponseJSON.weather_for = apiData;

        console.log("The future weather is: " + combinedApiResponseJSON.weather_for.data[1].valid_date);
        console.log(":::: combinedApiResponseJSON with current Weather data: " + combinedApiResponseJSON);

        return combinedApiResponseJSON

    }  catch(error) {
    // appropriately handle the error
    console.log("error", error);
    }
};

module.exports = weatherbitAPIfor;

