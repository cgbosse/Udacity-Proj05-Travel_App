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


// CB -- Create log of data for sending call to the API
//---- App variable for data returned by the website app.

let textToAnalyze = "";
apiResponseJson = {};

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

// ---------------------- ROUTES ----------------------
// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
    console.log(`Your API key is ${process.env.API_KEY}`);    
})

// ---------- Generic method route ---------- 
app.get('/*', function (req, res) {
    //L2 Step 16
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
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

// ---------- POST method route ---------- 
app.post('/textToAnalyze', formData);


