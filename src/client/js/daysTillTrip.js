function daysTillTrip(depDate) {
    console.log("::::: Entering daysTillTrip :::::")
    console.log(depDate);

    // Obtain today's date:
    // Create a new date instance dynamically with JS
    

    if (depDate == "None Selected") {
        return 0
    } else {
        let date = new Date(depDate);
        let now = new Date();      
        var difference = (date.getTime() - now.getTime());
        var days = Math.ceil(difference / (1000 * 3600 * 24));
        console.log(days + ' days till departure');
        console.log("::::: days : " + days);
        return days
    }

};

export { daysTillTrip }



