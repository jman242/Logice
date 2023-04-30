import { calculateWeekDays } from "./utils.js"; // imported function for code consolidation
import { findCurrentMonth } from "./utils.js"; // imported function for code consolidation
document.addEventListener("DOMContentLoaded", async () => { 
        var response = await fetch("mock.json"); // mock api call--> var response = await fetch("mock.json");

        var {currentWeek, startOffset, endOffset} = calculateWeekDays(); //grabbing current week days of the month and storing them into an array
        var currentMonth = findCurrentMonth();
        //console.log(currentMonth);

        var data = await response.json();
        window.bus.publish("event:change", {
            dateRef:{
                month: currentMonth, week: currentWeek
            },
            events: data.events
    });
    
    window.bus.publish("event:loaded", {
        
    })
})

