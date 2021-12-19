
// --------------------------------PIXABAY-------------------------------------

let pixabayAPI= async function(comboJSON) { 
    
    // Import node-fetch for fetch to work in nodejs
    const fetch = require('node-fetch');

    console.log(":::::::: Step 06  ::::::::");

    // Assembling the Pixabay URL
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

module.exports = pixabayAPI;
