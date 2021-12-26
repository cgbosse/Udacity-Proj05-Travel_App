// ------------ Clean field entries ------------ 
function clearForm(event){
    event.preventDefault()
    
    document.getElementsByName("orig_city")[0].value = "";
    document.getElementsByName("orig_country")[0].value = ""; 
    document.getElementsByName("dest_city")[0].value = "";
    document.getElementsByName("dest_country")[0].value = "";
    document.getElementsByName("dep_date")[0].value = "";
    document.getElementsByName("dest_days")[0].value = ""; 
  
  };

  export { clearForm }