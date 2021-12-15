//......... STAGE 02 - API SETUP - STEP 2 ...........
const dotenv = require('dotenv');
    dotenv.config();

/*    
var mcloudApi = {
    application_key: process.env.API_KEY
};
*/


// form-data & fetch - NPM package ... 
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
})

/*
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
    console.log("Sending Response from Server /test")
})

app.get('/testApi', function (req, res) {
    res.send(mockAPIResponse)
    console.log("Sending Response from Server /testApi")
})
*/

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ---------------------- Proj 05 ROUTES ----------------------
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// Route to test the apicalls route
app.get('/combinedApiResponseJSON', function (req, res) {
    res.send(combinedApiResponseJSON);
    console.log("Sending Response from Server with the combinedApiResponseJSON object.")    
});

// PROJ 05---------- POST method route ---------- 
app.post('/apiCalls', apiCalls);

// Proj 05 Code
// :::::::::::::::::: API CALL FUNCTIONS :::::::::::::::::::::::
/*
// Setup empty JS objects to act storage variables for the original JSON responses
let geonameJson = {};
let weatherbitCurJson = {};
let weatherbitForJson = {};
let pixabayJson = {};
*/
// Setup empty object to store the information bits posted and passed back to the client side
combinedApiResponseJSON = {};

// --------------------------------GEONAME-------------------------------------
// Import function from another js file in the same folder
let geonameAPI = require('./geonameAPI.js');

// --------------------------------WEATHERBIT-------------------------------------
// Import functions from another js file in the same folder
// ----------- Current Weather --------------
let weatherbitAPIcur = require('./weatherbitAPIcur.js');

//-------------- Weather Forecast 16 Days --------------
let weatherbitAPIfor = require('./weatherbitAPIfor.js');

// --------------------------------PIXABAY-------------------------------------
// Import function from another js file in the same folder
let pixabayAPI = require('./pixabayAPI.js');

/*
let pixabayAPI= async function(comboJSON) { 
    
    console.log(":::::::: Step 06  ::::::::");

    // Assembling the Weatherbit URL using the longitude and latitude
    console.log(":::::::: Step 06.1  ::::::::");
    let destCity = comboJSON.destCity;
    let destCountry = comboJSON.destCountry;
            
    let pbBaseURL = "https://pixabay.com/api/?key="  
    let pixabayURL = pbBaseURL + process.env.PIXABAY_API_KEY + "&q=" + destCity + "+" + destCountry + "&image_type=photo" + "&orientation=horizontal" + "&category=travel" + "&min_width=600" + "&min_height=600" + "&order=popular" + "&per_page=3";

    console.log(":::::::: Step 06.2  ::::::::");
    console.log(pixabayURL);

    const res = await fetch(pixabayURL);
        
    console.log(' ::::::: pixabayAPI image query - Response object: ' + res);
    
    try {
        let apiData = await res.json();

        combinedApiResponseJSON.images = apiData;

        console.log("One possible pixabay image is: " + combinedApiResponseJSON.images.hits[0].largeImageURL);
        console.log(":::: combinedApiResponseJSON with pixabay data: " + combinedApiResponseJSON);

        return combinedApiResponseJSON

    }  catch(error) {
    // appropriately handle the error
    console.log("error", error);
    }
};
*/

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
 
    // API call Functions sequence
    console.log(":::::::: Starting API Call sequence ::::::::")
 
    geonameAPI(destCityFD)
        .then(result => weatherbitAPIcur(result))
        .then(result => weatherbitAPIfor(result))
        .then(result => pixabayAPI(result))
        .then(result => res.send(result))
               
};


// ------------------------- Code without purpose -----------------
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (1+ d.getMonth())+'.'+ d.getDate()+'.'+ d.getFullYear();

