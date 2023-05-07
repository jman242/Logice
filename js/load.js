import { calculateWeekDays } from "./utils.js"; // imported function for code consolidation
import { findCurrentMonth } from "./utils.js"; // imported function for code consolidation
import { transformEvent } from "./utils.js";
document.addEventListener("DOMContentLoaded", async () => { 
        var response = await fetch("/api/get-events"); // mock api call--> var response = await fetch("mock.json");

        var {currentWeek, offset} = calculateWeekDays(); //grabbing current week days of the month and storing them into an array
        var currentMonth = findCurrentMonth();
        //console.log(currentMonth);

        var data = await response.json();
        window.bus.publish("event:change", {
            dateRef:{
                month: currentMonth, week: currentWeek, offset: offset
            },
            events: transformEvent(data.event) //call function transformEvent(data.events) -> returns structure simliar to mock.json same as calendar.js
    });
    
    window.bus.publish("event:loaded", {
        
    })
})

