let daysTillTrip = function(depDate) {
    console.log("::::: Entering daysTillTrip :::::")
    var today = new Date();
    var difference = today.getTime() - depDate.getTime();

    var days = Math.ceil(difference / (1000 * 3600 * 24));
    console.log(days + ' days till departure');
    return days
};

export { daysTillTrip }



