function savedTripLog(dataJson) {
    //creates a new saved trip log in the saved trips section
    console.log("::::: Entering the savedTripLog function ::::::::");
    
    // Establish Trip ID object property
    let ids = Object.keys(dataJson);
    console.log(dataJson);
    
    let id = ids[0].toString();
    console.log(id);

    // Access the data object
    let tripData = {};
    tripData = dataJson[id.toString()];

    console.log(tripData);
    console.log(id);

    console.log(tripData.depDate);

    // calling the daysTillDeparture function
    console.log(":::::calling the daysTillDeparture function ::::::::");

    let days = Client.daysTillTrip(tripData.depDate);    
    
    //Create a blank document fragment to append all new lines and then append this fragment as a saved trip
    let savedTripLogHtmlFrag = document.createDocumentFragment();
    
    // let divTripHolder = '<div id="' + id + '" class="trip_saved container_flex">';
    let divTripHolder = document.createElement('div');
    divTripHolder.id = id;
    divTripHolder.className = "trip_saved container_flex";
    
    // let divTripId = '<div class="id_box">' + id + '</div>';
    let divTripId = document.createElement('div');
    divTripId.className = "id_box";
    divTripId.innerHTML = "<h2>" + id + "</h2>";

    // let divTripDesc = '<div class="flex_item_1"><h2>' + 'From ' + tripData.origCity + ' to ' + tripData.destCity + '</h2></div>';
    let divTripDesc = document.createElement('div');
    divTripDesc.className = "flex_item_1";
    divTripDesc.innerHTML = "<h2>" + "From " + tripData.origCity + " to " + tripData.destCity + "</h2>";	
    
    //let divTripDates = '<div class="flex_item_1"><h2>' + tripData.depDate + '</h2></div>';
    let divTripDates = document.createElement('div');
    divTripDates.className = "flex_item_1";
    divTripDates.innerHTML = "<h2>" + tripData.depDate + "</h2>";	
    
    //let divTripDays = '<div class="flex_item_1"><h2>Days until departure: "' + days +'</h2></div>';
    let divTripDays = document.createElement('div');
    divTripDays.className = "flex_item_1";
    divTripDays.innerHTML = "<h2> Days until departure: " + days + "</h2>";

    console.log(divTripHolder);
    console.log(divTripId);
    console.log(divTripDesc);
    console.log(divTripDays);
    
    // Appending to divTripHolder	
    divTripHolder.appendChild(divTripId);
    divTripHolder.appendChild(divTripDesc);
    divTripHolder.appendChild(divTripDates);
    divTripHolder.appendChild(divTripDays);
    
    // Adding the divTripHolder to the document fragment
    savedTripLogHtmlFrag.appendChild(divTripHolder);
    
    // Adding the fragment to the DOM
    document.getElementById("secSaved").appendChild(savedTripLogHtmlFrag);
    
}


export { savedTripLog }