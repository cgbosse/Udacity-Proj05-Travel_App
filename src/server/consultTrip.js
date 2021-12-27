// Consulting a specific trip from when you click a link on the saved trip log on the client side

let consultTrip = function (req, res) {
    console.log("::::::::: Inside consultTrip :::::::");
    // Create an empty object
    let tripLogId = {};
    tripLogId = req.body;
    
    // Extract the Trip ID
    let consultTripId  = tripLogId.tripId;
    console.log("tripID: " + consultTripId);

    // New object to store the single trip to send back to the client side
    let consult = {};
    consult[consultTripId.toString()] = savedTrips[consultTripId.toString()];

    console.log(":::: consult object: ");
    console.log(consult);
    
    res.send(consult);
};

module.exports = consultTrip;

