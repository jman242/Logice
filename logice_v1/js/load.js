document.addEventListener("DOMContentLoaded", async () => { 
    var response = await fetch("http://127.0.0.1:8888"); //api call 
    var currentWeekDate = new Date();
    var currMonth = currentWeekDate.getMonth() + 1; //gets month as number (0-11)
    var currDay = currentWeekDate.getDate(); //gets day of the month as number (1-31)
    var currDayOfWeek = currentWeekDate.getDay(); //gets day of the week as number (0-6)
    var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    console.log(currDay);
    console.log(currMonth);
    console.log(currDayOfWeek);



    var data = await response.json();
    window.bus.publish("event:change", {
        dateRef:{
            //month: currMonth, week: currDay 
            month: "April", week: [9, 10, 11, 12, 13, 14, 15] //hard coding week and month for week view
        },
        events: data.events
    });
})

