// Async postData function to send the text and country to the server for him to call the A = 
async function postData( url = '', data = {}){
    console.log(":::::::::Step 01 :::::::::");
    console.log(":::::::Inside postData() posting app data::::::: ");
    console.log(data);
    
    const response = await fetch(url, {
          method: 'POST', 
          credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
          // Body data type must match "Content-Type" header        
          body: JSON.stringify(data), 
    });
      try {
        console.log(":::::::::Step 05 :::::::::");  
        const newData = await response.json();
        console.log('::::::Posting New Data::::::::: ' + newData);
        console.log(newData);
        return newData;
      } 
      catch(error) {
        console.log("error", error);
      }
  };

  export { postData }
