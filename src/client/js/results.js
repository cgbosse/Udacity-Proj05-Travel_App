
const serverApiResults = async function(res){
  //Extracting the information from the stored API data obtained from the server
  //and filling out the results boxes
  console.log(":::::::::Step 07 :::::::::");
  console.log('::::Creating result log entries HTML::::');
  
  document.getElementById('agreement').innerHTML = res.agreement;
  document.getElementById('subjectivity').innerHTML = res.subjectivity;
  document.getElementById('confidence').innerHTML = res.confidence;
  document.getElementById('irony').innerHTML = res.irony
}

export {serverApiResults}
