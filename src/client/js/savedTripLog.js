function savedTripLog() {
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
    
    let divTripHolder = '<div id="' + id + '" class="trip_saved container_flex">';
    let divTripId = '<div class="id_box">' + id + '</div>';
    let divTripDesc = '<div class="flex_item_1"><h2>' + 'From ' + tripData.origCity + ' to ' + tripData.destCity + '</h2></div>';
    let divTripDates = '<div class="flex_item_1"><h2>' + tripData.depDate + '</h2></div>';
    let divTripDays = '<div class="flex_item_1"><h2>Days until departure: "' + days +'</h2></div>';
    
    savedTripLogHtmlFrag.append(divTripHolder);
    savedTripLogHtmlFrag.appendChild(divTripId);
    savedTripLogHtmlFrag.appendChild(divTripDesc);
    savedTripLogHtmlFrag.appendChild(divTripDates);
    savedTripLogHtmlFrag.appendChild(divTripDays);

    document.getElementById("secSaved").append(savedTripLogHtmlFrag);
    




/*
    // Update the individual Trip Overview Fields with the object's data properties
    // Title
    console.log("::::: creating the trip log  and adding it to the saved trip Section ::::::::");

    document.getElementById("tripId").innerText = id;

    document.getElementById("tripDest").innerHTML = "From " + tripData.origCity + " to " + tripData.destCity;
    document.getElementById("tripDate").innerHTML =tripData.depDate;
    document.getElementById("daysAway").innerHTML = "Days until departure: " + days;



    // HTML code to generate the saved trips
      
                <div id="01" class="trip_saved container_flex">
                    <div class="id_box">
                        01
                    </div>
                    <div class="flex_item_1">
                        <h2>Trip to............... </h2>
                    </div>    
                    <div class="flex_item_1">
                        <h2>
                            27/07/2022 to 08/08/2022 
                        </h2>
                    </div>    
                    <div class="flex_item_1">
                        <h2>
                            Days away: 221
                        </h2>
                    </div>
                </div>
                <div class="newtrip"></div>
    */





    

}


export { savedTripLog }