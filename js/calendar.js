import { calculateEventHeight } from "./utils.js"; // imported function for code consolidation
import { calculateWeekDays } from "./utils.js";
import { findCurrentMonth } from "./utils.js"; // imported function for code consolidation

const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date"); //month view date (Month and Year)
//const currentDate2 = document.querySelector(".current-date2"); //week view date (Month and Year)
const prevNextIcon = document.querySelectorAll(".icons span"); //Icons for changing months
const curDayIcon = document.querySelectorAll(".wrapper ul"); //creating days icons
const hoursTag = document.querySelector(".hours"); //creating hours for week view

//creating new date and getting current year, month, and day
let date = new Date(); // date api
let currYear = date.getFullYear(); //returns year in YYYY format
let currMonth = date.getMonth(); //returns month in value 0-11
let currDay = date.getDate(); //returns day in value of 1-31

//storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const renderCalendar = (events) => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(); //getting first day of month
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); //getting last date of month
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); //getting last day of month
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); //getting last date of previous month
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) { //creating li of previous month last days
        const date = lastDateofLastMonth - i + 1;
        liTag += `<li data-day class="inactive" data-date-key="${currYear}-${String(currMonth).padStart(2,"0")}-${String(date).padStart(2,"0")}">${date}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) { //creating li of all days of current month
        //adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        if(isToday) window.selectedDate = `${currYear}-${String(currMonth + 1).padStart(2,"0")}-${String(i).padStart(2,"0")}`;
        liTag += `<li data-day class="${isToday}" data-date-key="${currYear}-${String(currMonth + 1).padStart(2,"0")}-${String(i).padStart(2,"0")}">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) { //creating li of next month first days
        const date = i - lastDayofMonth + 1;
        liTag += `<li data-day class="inactive" data-date-key="${currYear}-${String(currMonth + 2).padStart(2,"0")}-${String(date).padStart(2,"0")}">${date}</li>`
    }
    //var {currentWeek, startOffset, endOffset} = calculateWeekDays();
    currentDate.innerText = `${months[currMonth]} ${currYear}`; //passing current month and year as currentDate text (Month View)
    //currentDate2.innerText = `${months[currMonth - startOffset]} ${currentWeek[0]} - ${months[currMonth + endOffset]} ${currentWeek[6]}, ${currYear}`; //passing current month and year as currentDate2 text (Week View)
    daysTag.innerHTML = liTag;
    var dateSelectors = document.querySelectorAll("[data-day]");

    dateSelectors.forEach(day => {
        day.addEventListener("click", async (e) =>{
            if(document.querySelector(".active") != null){ //case of next or prev month selected
                //console.log("TEST");
                document.querySelector(".active").classList.remove("active"); //removes active from day
            }
            e.target.classList.add("active");
            window.selectedDate = e.target.getAttribute("data-date-key");
            var response = await fetch("mock.json"); // mock api call--> var response = await fetch("mock.json");

            var {currentWeek, startOffset, endOffset} = calculateWeekDays(); //grabbing current week days of the month and storing them into an array
            var currentMonth = findCurrentMonth(); // Error When this line and below is implemented.
             //console.log(currentMonth);
            console.log(currentWeek);
    
            var data = await response.json();

            window.bus.publish("event:change", {
                dateRef:{
                    month: currentMonth, week: currentWeek
                },
                events: data.events
        });
        })
    })
}
renderCalendar();

const renderTimeblocks = (dateRef, events) => {
    for(let i = 0; i < 7; i++ ) { // Loop for each day in a week and create timeblocks
        const currentDay = document.querySelector(`[data-day="${i}"] [data-day-label]`);
        const timeGrid = document.querySelector(`[data-day="${i}"] [data-time-block]`);
        currentDay.innerHTML = `<span>${dateRef.week[i]}</span><span>${days[i]}</span>`
        for(let k = 0; k < 24; k++) { // Loop for each hour in a day
            const spanElement = document.createElement("span");
            spanElement.setAttribute("data-event-target", `${dateRef.month}:${dateRef.week[i]}:${k}`);
            spanElement.classList.add("hours");
            if(i == 0){
                spanElement.innerHTML = `<span>${k}</span>`;
                timeGrid.appendChild(spanElement);
            }
            else{
                spanElement.innerHTML = `<span></span>`;
                timeGrid.appendChild(spanElement);
           }
        }
    }

    // events.forEach((event)=>{
    //     var elements = document.querySelectorAll("[data-id]");
    //     console.log(elements);
    //     for(let i = 0; i < elements.length; i++){
    //         //console.log("test");
    //         elements[i].remove();
    //     }
    // })

    events.forEach((event) =>{ // Attach events into timeblocks
        let eventDate = new Date(event.starts_at); // date api
        let month = eventDate.getDay();
        let day = eventDate.getDate();
        let hour = eventDate.getHours(); 
        let minutes = eventDate.getMinutes();
        let eventEndDate = new Date(event.ends_at)
        let endHour = eventEndDate.getHours(); 
        let endMinutes = eventEndDate.getMinutes();
        //console.log();
        //console.log(day);
        for(let j = 0; j < 12; j++){ //looping through months array to find correct month
            if(months[j] == dateRef.month){
                month = months[j]; //setting the month value to the correct month
                break;
            }
        }
        //if(// event.starts_at month matches dateRef.month){
            //console.log(month);
            //console.log(document.getElementById("event"));
            //event.getElementById("data-id").remove();

        if(month == dateRef.month){
            for(let i = 0; i < 7; i++){ //adding loop to iterate through week array
                // if(// event.starts_at day is present in dateRef.week array){
                if(day == dateRef.week[i]){
                    //build data-event-target key
                    //console.log(dateRef.week[i]);
                    
                    var eventTargetKey = `${month}:${day}:${hour}`;
                    //console.log(eventTargetKey);
                    const eventTimeBlock = document.querySelector(`[data-event-target="${eventTargetKey}"]`); //attempting to grab Month:Day:Hour from html
                    const spanElement = document.createElement("span");
                    spanElement.innerHTML = `<span data-id = "event">${event.title}</span><span>${hour}:${minutes ? minutes : "00"} to ${endHour}:${endMinutes ? endMinutes : "00"}</span>` // ? if else statement ternary
                    spanElement.style.backgroundColor="rgba(2, 4, 110, 0.571)"
                    spanElement.style.height= `${calculateEventHeight(eventDate, eventEndDate)}px`; //calculating height based on difference 
                    spanElement.style.marginTop= `${minutes}px`;
                    spanElement.style.marginLeft="20px";
                    eventTimeBlock.appendChild(spanElement);
                    //console.log(document.querySelectorAll("[data-id]"));
                }
            }
        }
    })
}

prevNextIcon.forEach(icon => { //getting prev and next icons
    icon.addEventListener("click", () => { //adding click event on both icons
        //if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11) { //if current month is less than 0 or greater than 11
            //creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); //updating current year with new date year
            currMonth = date.getMonth(); //updating current month with new date month
        } else {
            date = new Date(); //pass the current date as date value
        }
        renderCalendar(); //calling renderCalendar function
    });
});

curDayIcon.forEach(icon => { //getting current day icon
    icon.addEventListener("click", (e) => { //adding click event on current day icon
        window.selectedDate = e.target.dataset.dateKey;
    })
});

window.bus.subscribe("event:change", (payload) => {
    console.log(payload);
    renderTimeblocks(payload.dateRef, payload.events); 
})

