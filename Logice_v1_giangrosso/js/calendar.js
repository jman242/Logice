const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date"); //month view date (Month and Year)
const currentDate2 = document.querySelector(".current-date2"); //week view date (Month and Year)
const prevNextIcon = document.querySelectorAll(".icons span");
const curDayIcon = document.querySelectorAll(".wrapper ul"); //creating days icons
const hoursTag = document.querySelector(".hours"); //creating hours for week view

//creating new date and getting current year, month, and day
let date = new Date(); 
let currYear = date.getFullYear();
let currMonth = date.getMonth(); 
let currDay = date.getDay(); 

//storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(); //getting first day of month
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); //getting last date of month
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); //getting last day of month
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); //getting last date of previous month
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) { //creating li of previous month last days
        const date = lastDateofLastMonth - i + 1;
        liTag += `<li class="inactive" data-date-key="${`${months[currMonth - 1]}:${date}`}">${date}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) { //creating li of all days of current month
        //adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}" data-date-key="${`${months[currMonth]}:${i}`}">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) { //creating li of next month first days
        const date = i - lastDayofMonth + 1;
        liTag += `<li class="inactive" data-date-key="${`${months[currMonth + 1]}:${date}`}">${date}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; //passing current mon and yr as currentDate text (Month View)
    currentDate2.innerText = `${months[currMonth]} ${currYear}`; //passing current mon and yr as currentDate2 text (Week View)
    daysTag.innerHTML = liTag;
}
renderCalendar();

const renderTimeblocks = () => {
    for(let i = 0; i < 7; i++ ) { // Loop for each day in a week
        const currentDay = document.querySelector(`[data-day="${i}"] [data-time-block]`);
        for(let k = 0; k < 24; k++) { // Loop for each hour in a day
            //const currentBlock = `<span class="hours">${k}:00</span>`
            //currentDay.append(currentBlock);
            const spanElement = document.createElement("span");
            spanElement.classList.add("hours");
            spanElement.innerText = `${k}:00`;
            currentDay.appendChild(spanElement);
        }
    }
}
renderTimeblocks();

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
        window.bus.publish("day:change", { key:e.target.dataset.dateKey });
        //Event will need to be added in this function to call a day view
    })
});

