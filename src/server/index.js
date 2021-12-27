//......... STAGE 02 - API SETUP - STEP 2 ...........
const dotenv = require('dotenv');
    dotenv.config();

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

// ---------------------- ROUTES ----------------------

app.get('/', function (req, res) {
    //L2 Step 16
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(5555, function () {
    console.log('Example app listening on port 5555!');    
})


// Proj 05 Code
// :::::::::::::::::: API CALL FUNCTIONS :::::::::::::::::::::::

// Setup empty JS object to act storage variable for all the savedTrips
savedTrips = {};
// Setup of Trip ID variable for call storage
let tripId = 0;

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

const { Console } = require('console');

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Functions to work on the SavedTrips object
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// --------------------------------updateSaved-------------------------------------
// Import function from another js file in the same folder
let updateSaved = require('./updateSaved.js');

// --------------------------------deleteSaved-------------------------------------
// Import function from another js file in the same folder
let deleteSaved = require('./deleteSaved.js');

// --------------------------------consultTrip-------------------------------------
// Import function from another js file in the same folder
let consultTrip = require('./consultTrip.js');



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
    
    console.log(combinedApiResponseJSON.depDate);
    
    let destDaysFD = combinedApiResponseJSON.destDays;
    console.log("combinedApiResponseJSON: " + destCityFD);
 
    // API call Functions sequence
    console.log(":::::::: Starting API Call sequence ::::::::")
 
    geonameAPI(destCityFD)
        .then(result => weatherbitAPIcur(result))
        .then(result => weatherbitAPIfor(result))
        .then(result => pixabayAPI(result))
        .then(result => tripDatabase(result))
        .then(result => res.send(result))
               
};

// Function to create the newTrip object with its TripId
function tripDatabase(apiJson) {
    
    console.log(":::::: ENTERING tripDatabase ::::::::")
    console.log(combinedApiResponseJSON.depDate);

    //Creating Note property object and field properties for future storage of information.s
    apiJson.note = {};
    apiJson.note.transport = "";
    apiJson.note.hotel = "";
    apiJson.note.other = "";

    // Assigns a tripId and adds it to the server database (This is the step that I would like to create on the client side)
    tripId = (tripId + 1); 
    savedTrips[tripId.toString()] = apiJson;
    let newTrip = {};
    newTrip[tripId.toString()] = apiJson;

    console.log(newTrip);
    return newTrip
};

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// ---------------------- Proj 05 ROUTES ----------------------
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// Route to test the apicalls route
app.get('/combinedApiResponseJSON', function (req, res) {
    res.send(combinedApiResponseJSON);
    console.log("Sending Response from Server with the combinedApiResponseJSON object.")    
});

// Route to test the savedTrips variable
app.get('/savedTrips', function (req, res) {
    res.send(savedTrips);
    console.log("Sending Response from Server with the saveTrips object.")    
});



// ---------- POST method routes ---------- 
// Route to generate a new saved trip calling all the apis
app.post('/apiCalls', apiCalls);

// Route to consult/update or delete the savedTrips object 
app.post('/savedTrips', consultTrip);

// Route to consult/update or delete the savedTrips object 
app.post('/update', updateSaved);

// Route to consult/update or delete the savedTrips object 
app.post('/delete', deleteSaved);




