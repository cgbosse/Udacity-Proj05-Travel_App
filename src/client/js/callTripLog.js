async function callTripLog(id) {
    event.preventDefault()
    
    // Create an object to store clicked logs id
    let logId = {};

    // Obtain the tripId and send it to the server
    logId.tripId = id;
    console.log(logId);

    // Posting del to the server
    console.log(":::::::::Step 01 :::::::::");
    console.log(":::::::Inside logId posting app data::::::: ");
    
    const response = await fetch('http://localhost:5555/savedTrips', {
          method: 'POST', 
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
          // Body data type must match "Content-Type" header        
          body: JSON.stringify(logId),
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

export { callTripLog }