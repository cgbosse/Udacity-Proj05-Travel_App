// ------------ Clean field entries ------------ 
const clearResults = function(){
    document.getElementById('agreement').innerHTML = ' --------------------- ';
    document.getElementById('subjectivity').innerHTML = ' --------------------- ';
    document.getElementById('confidence').innerHTML = ' --------------------- ';
    document.getElementById('irony').innerHTML = ' --------------------- ';
  };

  export { clearResults }