function formCheck() {
    console.log("::: Running formCheck :::");

    let textFormFieldIds = ["orig_city","orig_country","dest_city","dest_country"];
    let dateFormFieldIds = ["dep_date"];
    let numberFormFieldIds = ["dest_days"];

    // Text fields check
    for (let id of textFormFieldIds) {
        
        let val = document.getElementsByName(id)[0].value
        
        if(val.length < 2) {
            alert("The text fields have not been filled out correctly.");
            return false
        }
    }
    
    console.log("::: Text fields check complete :::");
    
    // Date fields check
    for (let id of dateFormFieldIds) {

        let d = document.getElementsByName(id)[0].value;
        console.log(d);

        if( d == "") {
            alert("The date field has not been filled out correctly. Date must be today or in the future.");
            return false
        } else {
            d = new Date(d);
            let now = new Date()
            let today = new Date((1+ now.getMonth())+'/'+ now.getDate()+'/'+ now.getFullYear());
            console.log(d);
            console.log(today);

            if(d < today) {
                alert("The date field has not been filled out correctly. Date must be today or in the future.");
                return false
            }
        }
    }

    console.log("::: Date field check complete :::");
    // Number fields check

    for (let id of numberFormFieldIds) {
        
        let n = document.getElementsByName(id)[0].value;
        console.log(n);

        if( n == "") {
            alert("The days field has not been filled out correctly. Days must be greater than 0.");
            return false
        } else {
            n = Number(n);

            if( n < 1){
                alert("The days field has not been filled out correctly. Days must be greater than 0.");
                return false
            }
        }
    }
    console.log("::: Number field check complete :::");
}

export { formCheck }