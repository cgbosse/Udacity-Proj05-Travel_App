async function delTrip(event) {
    event.preventDefault()
    
    // Create an object to store the data to be posted and deld on the saved trip
    let del = {};

    // Obtain the different note fields and store them in an object to be posted to the server and delete the
    del.tripId = document.getElementById("tripId").innerText; 
    console.log(del);

    //Remove Trip Log
    document.getElementById(document.getElementById("tripId").innerText).remove();

    // Posting del to the server
    console.log(":::::::::Step 01 :::::::::");
    console.log(":::::::Inside deleteTrip posting app data::::::: ");
    
    const response = await fetch('http://localhost:5555/delete', {
          method: 'POST', 
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
          // Body data type must match "Content-Type" header        
          body: JSON.stringify(del), 
    });
    try {
      console.log(":::::::::Step 03 :::::::::");  
      const newData = await response.json();
      console.log('::::::Posting del Data::::::::: ' + newData);
      console.log(newData);
     
      console.log(':::::: Updating Trip Overview Data with First database object ::::::::: ' + newData);
      
      Client.fillTripOverview(newData);
      return newData;
    } 
    catch(error) {
      console.log("error", error);
    };
    
        

}

export { delTrip }