//......... STAGE 02 - API SETUP - STEP 2 ...........
const dotenv = require('dotenv');
    dotenv.config();

//......... STAGE 02 - API SETUP - STEP 2 ...........
// You could call it aylienapi, or anything else
// var mcloud = {};
/*
var textapi = new mcloud({
    //application_id: "your-api-id",
    application_key: process.env.API_KEY
    });
*/
var mcloudApi = {
    application_key: process.env.API_KEY
};
//.............

// ... meaningCloud API set up - form-data - NPM package ... 
var FormData = require('form-data');
const fetch = require('node-fetch');
//..................


var path = require('path')

/* ------------ Setting up the server ----------------*/
//require express to run server and routes
const express = require('express');
const app = express();
// Initialize the main project folder
app.use(express.static('dist'));

//*Middleware */
//CB - Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Created variable from the future API Call response
//let mcloudAPIResponse = require('./mcloudAPI.js')

console.log(__dirname);

const mockAPIResponse = require('./mockAPI.js');

// ---------------------- ROUTES ----------------------

app.get('/', function (req, res) {
    //L2 Step 16
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
    console.log(`Your API key is ${process.env.API_KEY}`);    
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
    console.log("Sending Response from Server /test")
})

app.get('/testApi', function (req, res) {
    res.send(mockAPIResponse)
    console.log("Sending Response from Server /testApi")
})

app.get('/textToAnalyze', function (req, res) {
    res.send(apiResponseJson);
    console.log("Sending Response from Server from textToAnalyze")    
});

app.get('/apiResponseJson', function (req, res) {
    res.send(apiResponseJson);
    console.log("Sending Response from Server /apiResponseJson with the meaningCloud response object.")    
});


// CB -- Create log of data for sending call to the API
// ---------- POST method route ---------- 
//---- App variable for data returned by the website app.

let textToAnalyze = "";
apiResponseJson = {};

app.post('/textToAnalyze', formData);

function formData (req, res) {
    console.log(":::::::::Step 02 :::::::::");
    console.log(":::::::Starting formData::::::::");
    console.log("Received Request Body: " + req.body);
    //Received object assigning to the 
    textToAnalyze = req.body.formText;
    console.log("Formdata: " + textToAnalyze);
    sentiment(textToAnalyze)
        .then(result => res.send(result))
        
};

 // ---------------- Function for Sentiment Analysis --------------
 let sentiment = async function(text2) {

    // Part of Boiler Template MeaningCloud
    console.log(":::::::::Step 03 :::::::::");
    console.log("::::Inside sentiment()::::::: " + text2);

    const formdata = new FormData();
    formdata.append("key", mcloudApi.application_key);
    formdata.append("txt", text2);
    formdata.append("lang", "en");  // 2-letter code, like en es fr ...

    console.log(formdata);

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions);
   
    try {
        apiResponseJson = await response.json();
        console.log(":::::::::Step 04 :::::::::");
        console.log(":::::::::::::::: apiResponseJson RESPONSE Json ::::::::::::::::");
        console.log(apiResponseJson);
        return apiResponseJson
    }
    catch(error) {
        console.log('error', error);
    }
};



//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ---------------------- Proj 05 ROUTES ----------------------
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// Route to test the apicalls route
app.get('/apiCalls', function (req, res) {
    res.send(geonameJson);
    console.log("Sending Response from Server with the apiCalls - geonameJson")    
});

app.get('/combinedApiResponseJSON', function (req, res) {
    res.send(combinedApiResponseJSON);
    console.log("Sending Response from Server with the combinedApiResponseJSON object.")    
});

// PROJ 05---------- POST method route ---------- 
app.post('/apiCalls', apiCalls);

// Proj 05 Code
// :::::::::::::::::: API CALL FUNCTIONS :::::::::::::::::::::::

// Setup empty JS objects to act storage variables for the original JSON responses
let geonameJson = {};
let weatherbitJson = {};
let pixabayJson = {};

// Setup empty object to store the information bits posted and passed back to the client side
combinedApiResponseJSON = {};

// --------------------------------GEONAME-------------------------------------

let geonameURL ='http://api.geonames.org/searchJSON?q=';

let geonameAPI= async function(city) { 

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
    
    // 2. Extract the temperature from the obtained json object
    try {
        let apiData = await res.json();
        
        geonameJson = apiData;
        
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

// --------------------------------WEATHERBIT-------------------------------------

// ----------- Current Weather --------------

let weatherbitAPIcur= async function(comboJSON) { 
    
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

//-------------- Weather Forecast 16 Days --------------

let weatherbitAPIfor= async function(comboJSON) { 
    
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



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (1+ d.getMonth())+'.'+ d.getDate()+'.'+ d.getFullYear();


// --------------------------------PIXABAY-------------------------------------












//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// --------------------------------APIC CALLS Sequence function caller-------------------------------------
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function apiCalls (req, res) {

    console.log(":::::::: Step 02  ::::::::");
    console.log(":::::::: apiCalls ::::::::");
    console.log("Received Request Body: " + req.body);
    
    //Received object assigning to the 
    combinedApiResponseJSON = req.body;

    // Assigning variables for each of the data elements required for the various API calls
    let destCityFD = combinedApiResponseJSON.destCity;
    let depDateFD = combinedApiResponseJSON.depDate;
    let destDaysFD = combinedApiResponseJSON.destDays;
    console.log("combinedApiResponseJSON: " + destCityFD);
    
    console.log(":::::::: Empty geoname URL :::::::::::");
    console.log(geonameURL);

    // API call Functions sequence
    geonameAPI(destCityFD)
        .then(result => weatherbitAPIcur(result))
        .then(result => weatherbitAPIfor(result))
        .then(result => res.send(result))
       
};


