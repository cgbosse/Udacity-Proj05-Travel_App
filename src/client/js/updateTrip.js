async function updateTrip(event) {
    event.preventDefault()
    
    // Create an object to store the data to be posted and updated on the saved trip
    let update = {};

    // Obtain the different note fields and store them in an object to be posted to the server and update the
    update.tripId = document.getElementById("tripId").innerText; 
    update.noteTransport = document.getElementById("noteTransport").value;
    update.noteHotel = document.getElementById("noteHotel").value;
    update.noteOther = document.getElementById("noteOther").value;

    console.log(update);

    // Posting update to the server
        console.log(":::::::::Step 01 :::::::::");
        console.log(":::::::Inside Update posting app data::::::: ");
        
        const response = await fetch('http://localhost:5555/update', {
              method: 'POST', 
              credentials: 'same-origin',
              headers: {
                  'Content-Type': 'application/json',
              },
              // Body data type must match "Content-Type" header        
              body: JSON.stringify(update), 
        });
          try {
            console.log(":::::::::Step 03 :::::::::");  
            const newData = await response.json();
            console.log('::::::Posting Update Data::::::::: ' + newData);
            console.log(newData);
            return newData;
          } 
          catch(error) {
            console.log("error", error);
          }
          alert("Trip Updated")
}

export { updateTrip }