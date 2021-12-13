function handleSubmitApi(event) {
  event.preventDefault()

  // check what text was put into the form field
  let formText = document.getElementById('textForApi').value
  
  if(Client.contentCheck(formText) == true) {
    return
  } else {
      
    let formTextJson = {formText};
      
    //Calls the postData function to post the form text to the server
    Client.postData('http://localhost:8081/textToAnalyze', formTextJson)
      //.then (result => Client.getServerData(result))
      .then (result => {
          Client.serverApiResults(result);
          return "Finished"
      })
      .then (result => console.log(":::::::::Step 08 " + result + ":::::::::"));     
  }

}


export { handleSubmitApi }
