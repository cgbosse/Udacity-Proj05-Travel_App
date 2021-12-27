// Deleting trip from database
function deleteSaved(req, res){

    let delTripId  = req.body.tripId;
    
    // Create an empty response 
    let emptyTrip = {
        "00":{
            "note":{
                "transport":"",
                "hotel":"",
                "other":""   
            },
            "origCity":"None Selected",
            "origCountry":"None Selected",
            "destCity":"None Selected",
            "destCountry":"None Selected",
            "depDate":"None Selected",
            "destDays":"None Selected",
            "weather_cur":{
                "data":[
                    {
                        "weather":{
                            "description":"NA"
                        },
                        "temp":"NA"
                    }
                ]
            },
            "weather_for":{
                "data":[
                    {
                    },
                    {
                        "high_temp": "NA",
                        "weather":{
                            "description":"NA"
                        }
                    }                    
                ]
            },
            "images":{
                "hits":[
                    {
                     "largeImageURL":" "
                    }
                ]
            }
        }
    }; 

   // console.log(":::::: OBJECT KEYS :::::" + Object.keys(savedTrips).length);

    if (Object.keys(savedTrips).length > 1) {

        delete savedTrips[delTripId.toString()];

        console.log(":::::: Deleted Saved Trip ::::::::::");
        console.log(savedTrips[delTripId.toString()]);

        console.log("::::::::: OBJECT KEYS ::::::::::::::")
        let firstObjectId = Object.keys(savedTrips)[0];

        console.log(":::: RETURN THE FIRST OBJECT IN THE Data Base :::: ");
        console.log(savedTrips[firstObjectId.toString()]);

        let firstTrip = {};
        firstTrip = savedTrips;

        res.send(firstTrip) 
        } else {
            res.send(emptyTrip)
        }
};

module.exports = deleteSaved;
