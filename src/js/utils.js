export function calculateEventHeight(starts_at, ends_at){ // exporting function for code consolidation
    let diffMs = Math.abs(starts_at - ends_at); //getting the absolute value of miliseconds between start and end time
    return Math.floor((diffMs/1000)/60); // dividing absolute value time difference by 1000 to get miliseconds and then by 60 for seconds in a a minute, then rounding down to floor and returning val
}

function calcDayOfMonth(monthDay, weekDay){
    while(weekDay != 0){
        monthDay--;
        weekDay--;
    }
    return monthDay;
}

export function calculateWeekDays(){
    var currentWeekDate = new Date();
    var currDay = currentWeekDate.getDate(); // gets day of the month (1-31)
    var currDayOfWeek = currentWeekDate.getDay(); //gets day of the week as number (0-6)
    var currentWeek = [];

    if(currDayOfWeek == 0){
        for(var i = 0; i < 7; i++){
            currentWeek[i] = currDay;
            currDay++;
        }
    }
    else{
         currDay = calcDayOfMonth(currDay, currDayOfWeek);

         for(var i = 0; i < 7; i++){
            currentWeek[i] = currDay;
            currDay++;
        }
    }
    return currentWeek;
}

export function findCurrentMonth(){
    var currentWeekDate = new Date();
    var currMonth = currentWeekDate.getMonth(); //gets month number (0-11)
    var months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

    return months[currMonth];
}