
// Updating the note fields
let updateSaved = function(req, res) {
    console.log("::::::::: Inside updateSaved :::::::");
    // Create an empty object
    let update = {};
    update = req.body;
    
    // Extract the Trip ID
    let updateTripId  = update.tripId;
    console.log("tripID: " + updateTripId);

    console.log("::::::: Updating Saved Trip Object ::::::::");
    console.log(savedTrips[updateTripId.toString()]);

    savedTrips[updateTripId.toString()].note.transport = update.noteTransport;
    console.log(savedTrips[updateTripId.toString()].note.transport);

    savedTrips[updateTripId.toString()].note.hotel = update.noteHotel;
    console.log(savedTrips[updateTripId.toString()].note.hotel);

    savedTrips[updateTripId.toString()].note.other = update.noteOther;
    console.log(savedTrips[updateTripId.toString()].note.other);

    console.log(":::::: Updated Saved Trip ::::::::::");

    let updatedTrip = {};
    updatedTrip = savedTrips;  

    res.send(updatedTrip);
};

module.exports = updateSaved;
