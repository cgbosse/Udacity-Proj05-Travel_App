function handleSubmitApi(event) {
  event.preventDefault()

  console.log(":::::::::: Formhandler event triggered :::::::::::::");

  let trip = {};

  let origCity = document.getElementsByName("orig_city")[0].value;
  let origCountry = document.getElementsByName("orig_country")[0].value; 
  let destCity = document.getElementsByName("dest_city")[0].value;
  let destCountry = document.getElementsByName("dest_country")[0].value;
  let depDate = document.getElementsByName("dep_date")[0].value;
  let destDays = document.getElementsByName("dest_days")[0].value; 
  
  console.log("::::::: TEST of Variables ::::::::");
  console.log(origCity);
  console.log(origCountry);
  console.log(destCity);
  console.log(destCountry);
  console.log(depDate);
  console.log(destDays);

  console.log("::::::: TEST of Trip Object Creation ::::::::");
  trip.origCity = origCity;
  trip.origCountry = origCountry;
  trip.destCity = destCity;
  trip.destCountry = destCountry;
  trip.depDate = depDate;
  trip.destDays = destDays;
  console.log(trip);
  //return trip
  
  // Temp setup without content checker
  //Calls the postData function to post the form text to the server
  Client.postData('http://localhost:8081/apiCalls', trip)
    .then (result => {
      console.log(":::::::::: SERVER RESPONSE :::::::::::");
      console.log(result);
      console.log(result.longitude); 
      //Client.serverApiResults(result);
      return "Finished"
    })
    .then (result => console.log(":::::::::Step 08 " + result + ":::::::::"));

  /*
  // check what text was put into the form field
  let formText = document.getElementById('textForApi').value
  
  if(Client.contentCheck(formText) == true) {
    return
  } else {
      
    let formTextJson = {formText};
      
    //Calls the postData function to post the form text to the server
    Client.postData('http://localhost:8081/textToAnalyze', formTextJson)
       .then (result => {
          Client.serverApiResults(result);
          return "Finished"
      })
      .then (result => console.log(":::::::::Step 08 " + result + ":::::::::"));     
  }
*/

}


export { handleSubmitApi }

