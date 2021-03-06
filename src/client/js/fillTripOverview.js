
function fillTripOverview(dataJson) { 

    console.log("::::: Entering the fillTripOverview function ::::::::");
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
    
    // Update the individual Trip Overview Fields with the object's data properties
    // Title
    console.log("::::: Updating the Title ::::::::");

    console.log("days till departure: " + days)

    document.getElementById("tripId").innerText = id;

    document.getElementById("tripDest").innerHTML = "From " + tripData.origCity + " to " + tripData.destCity;
    document.getElementById("tripDate").innerHTML =tripData.depDate;
    document.getElementById("daysAway").innerHTML = "Days until departure: " + days; 

    // Image
    console.log("::::: Updating the image ::::::::");
    document.getElementById("tripImg").innerHTML = `<img class="img_fit" src="` + tripData.images.hits[0].largeImageURL + `" alt="` + tripData.destCity + `"> </img>`;

    // Weather
    console.log("::::: Updating the current weather ::::::::");

    //Current
    if (id == "00") {
        document.getElementById("wCurTemp").innerHTML = "NA";
        document.getElementById("wCurDesc").innerHTML = "NA";
    
    } else {
        document.getElementById("wCurTemp").innerHTML = tripData.weather_cur.data[0].temp + " Celsius";
        document.getElementById("wCurDesc").innerHTML = tripData.weather_cur.data[0].weather.description;
    }
    //Forecast
    console.log("::::: Updating the forecast weather ::::::::");

    if (tripData.depDate == "None Selected") {
        document.getElementById("wForTemp").innerHTML = "NA";
        document.getElementById("wForDesc").innerHTML = "NA";
    } else if (days < 15) {
        document.getElementById("wForTemp").innerHTML = tripData.weather_for.data[days-1].high_temp + " Celsius";
        document.getElementById("wForDesc").innerHTML = tripData.weather_for.data[days-1].weather.description;
    } else if (days > 15) {
        document.getElementById("wForTemp").innerHTML = "NA";
        document.getElementById("wForDesc").innerHTML = "NA";
    };
    
    // Notes
    console.log("::::: Updating the note fields ::::::::");
    document.getElementById("noteTransport").value = tripData.note.transport;
    document.getElementById("noteHotel").value = tripData.note.hotel;
    document.getElementById("noteOther").value = tripData.note.other;

    return dataJson

}

export { fillTripOverview }
