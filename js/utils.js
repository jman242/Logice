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

export function transformEvent(event){
    var eventsArray = [];

    event.forEach(element => {
        //Accepting events from api/get-events
        var title = element.title;
        //date, start, and fin must be captured and reformatted to match modal
        var date = element.eventdate
        var start = element.start;
        var fin = element.fin;
        var categ = element.category; 
        var description = element.descrip;
        var eventid = element.eventid;
        //reformatting date, start, and fin
        var starts_at = `${date} ${start}`;
        var ends_at = `${date} ${fin}`;
        

        let eventObj = {
            id: eventid, title: title, date: date, starts_at: starts_at, ends_at: ends_at, category: categ, description: description
        };
        eventsArray.push(eventObj);
    });
    return eventsArray;
}

export function getDaysInMonth(month,year) {
  return new Date(year, month, 0).getDate();   //0 is last day of month
  };

export function calculateWeekDays(){
    var currentWeekDate = new Date(window.selectedDate); //window.selectedDate
    currentWeekDate.setUTCHours(10);
    var currMonth = currentWeekDate.getMonth() + 1; //offsetting month to correspond to normal calendar numbering Jan = 1, Feb = 2, etc.
    var currDay = currentWeekDate.getDate(); // gets day of the month (1-31)
    var currDayOfWeek = currentWeekDate.getDay(); //gets day of the week as number (0-6)
    var currYear = currentWeekDate.getFullYear();
    if(currentWeekDate.getTimezoneOffset() > 300){ // || currentWeekDate.getTimezoneOffset() < 300)
         currentWeekDate.setUTCHours(12);
         console.log(currentWeekDate);
         currMonth = currentWeekDate.getMonth() + 1; //offsetting month to correspond to normal calendar numbering Jan = 1, Feb = 2, etc.
         currDay = currentWeekDate.getDate(); // gets day of the month (1-31)
         currDayOfWeek = currentWeekDate.getDay(); //gets day of the week as number (0-6)
         currYear = currentWeekDate.getFullYear(); // returns year in YYYY form
    }
    var currentWeek = [];
    var offset = 0;
    if((currDay + 7 > getDaysInMonth(currMonth, currYear)) || (currDay - 7 < 1)){ // if week is at the beginning or at the end of a month //currDay - 7 < 1 ? offset = -1 : offset = 1;
        var lastMonthDay = 0;
        if(calcDayOfMonth(currDay, currDayOfWeek) == 0){
            var currMonthVar = currMonth - 1;
            lastMonthDay = getDaysInMonth(currMonthVar, currYear); 
        }else if(calcDayOfMonth(currDay, currDayOfWeek) > 0){
            lastMonthDay = currDay;
        }else if(calcDayOfMonth(currDay, currDayOfWeek) < 0){
            //console.log("WE ARE HERE", currDay);
            //lastMonthDay = currDay;
        }

        if(currDay == 7 && currDayOfWeek == 6){ //case when curr day is 7 and is still within the beginning week of month
            if(lastMonthDay > 0){
                offset = 0;
            }
            else{
                offset = -1;
            }
        }else if(currDay < 7 && lastMonthDay > currDay){ 
            offset = -1;
        }else if(calcDayOfMonth(currDay, currDayOfWeek) > 24 && currDayOfWeek < 6){
            offset = 1;
        } else if(lastMonthDay == 0){
            offset = -1;
        }
    }
    if(getDaysInMonth(currMonth, currYear) == 30){ // case of end of month with 30 days
        console.log(currDay);
        if(currDayOfWeek == 0){
            for(var i = 0; i < 7; i++){
                if(currDay <= 30){
                    if(currDay == 1){
                        currDay++;
                    }
                        currentWeek[i] = currDay;
                        currDay++;
                }
                else{
                    currDay = 1;
                    currentWeek[i] = currDay;
                }
            }
        }
        else{
            if(currDay < currDayOfWeek){
                let prevMonth = currentWeekDate.getMonth(); // getting month previous
                let lastMonthDate = getDaysInMonth(prevMonth, currentWeekDate.getFullYear());
                currDay = calcDayOfMonth(currDay, currDayOfWeek);
                currDay = lastMonthDate+currDay;
                for(var i = 0; i < 7; i++){
                    if(currDay <= lastMonthDate){
                    currentWeek[i] = currDay;
                    currDay++;
                }
                else{
                    if(currDay != 1){
                        currDay = 1;
                    }
                    currentWeek[i] = currDay;
                    currDay++;
                }
                }
            }
            else{
            currDay = calcDayOfMonth(currDay, currDayOfWeek);
            let currMonth = currentWeekDate.getMonth() + 1; // getting month previous
            let lastMonthDate = getDaysInMonth(currMonth, currentWeekDate.getFullYear());
            for(var i = 0; i < 7; i++){
                if(currDay > lastMonthDate){
                    currDay = 1;
                    currentWeek[i] = currDay;
                    currDay++;
                }
                else{
                    currentWeek[i] = currDay;
                    currDay++;
                }
            }
        }   
        }
    }
    else if(getDaysInMonth(currMonth, currYear) == 31){ // case of beginning of month with 31 days in prev month
        if(currDayOfWeek == 0){
            console.log("test");
                    for(var i = 0; i < 7; i++){
                        if(currDay <= 31){
                            if(currDay == 1){
                                currentWeek[i] = currDay;
                                currDay++;
                            }
                            else{
                                currDay = calcDayOfMonth(currDay, currDayOfWeek);
                                currentWeek[i] = currDay;
                                currDay++;
                            }    
                        }
                        else{
                            currDay = 1;
                            currentWeek[i] = currDay;
                            currDay++;
                        }
                    }
                }
                else{
                    let prevMonth = currMonth - 1;
                    let lastMonthDate = getDaysInMonth(prevMonth, currentWeekDate.getFullYear());
                    if(currDay < 7) // case of the beginning of next month
                    {
                        currDay = calcDayOfMonth(currDay, currDayOfWeek);
                        if(currDay < 0){
                            currDay = currDay + lastMonthDate; 
                        }
                        for(var i = 0; i < 7; i++){
                            if(currDay == 0){
                                currDay = lastMonthDate;
                                currentWeek[i] = currDay;
                                currDay = 1;
                            }
                            else{
                                if(currDay > lastMonthDate){
                                    currDay = 1;
                                    currentWeek[i] = currDay;
                                    currDay++;
                                }
                                else{
                                    currentWeek[i] = currDay;
                                    currDay++;
                                }
                            }
                        }
                    }
                    else{ // case of previous month //currday = 12
                        currDay = calcDayOfMonth(currDay, currDayOfWeek);
                        for(var i = 0; i < 7; i++){
                            if(currDay <= 31){
                                if(currDay == 1){
                                    console.log("TEST")
                                    currentWeek[i] = currDay;
                                    currDay++;
                                }else{
                                    currentWeek[i] = currDay;
                                    currDay++;
                                } 
                            }
                            else{
                               if(currDay > getDaysInMonth(currMonth, currYear)){
                                currDay = 1;
                                currentWeek[i] = currDay;
                                currDay++;
                               }
                               else{
                                currentWeek[i] = currDay;
                                currDay++;
                               } 
                            }
                        }
                    }
                }
            }
    else{
        let prevMonth = currMonth - 1;
        let currLastMonthDate = getDaysInMonth(currMonth, currentWeekDate.getFullYear());
        let prevLastMonthDate = getDaysInMonth(prevMonth, currentWeekDate.getFullYear());
        currDay = calcDayOfMonth(currDay, currDayOfWeek);
            for(var i = 0; i < 7; i++){
                if(currDay == currLastMonthDate){
                    currentWeek[i] = currDay;
                    currDay = 1;
                }else{
                    if(currDay > currLastMonthDate){
                        if( currDay <= prevLastMonthDate){
                            currentWeek[i] = currDay;
                            currDay++;
                        }
                        else if(currDay > prevLastMonthDate){
                            currDay = 1;
                            currentWeek[i] = currDay;
                            currDay++;
                        }else{
                            if(currDay > currLastMonthDate){
                                currDay = 1;
                                currentWeek[i] = currDay;
                                currDay++;
                        }
                    }
                    }
                    else{
                        if(currDayOfWeek == 0){
                            currentWeek[i] = currDay;
                            currDay++; 
                        } else{
                            if(currDay < 0){
                                currDay = currDay + prevLastMonthDate; 
                                currentWeek[i] = currDay;
                                currDay++;
                            }else{
                                currentWeek[i] = currDay;
                                currDay++;
                            }
                        }
                        
                    } 
                }
                }            
    }
        return {currentWeek, offset};
    }

function findUTCHours(currentDate){ //not currently being used
    return 2;
}

export function findCurrentMonth(){
    var today = new Date();
    var currentWeekDate = new Date(`${window.selectedDate} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`);
    console.log("TEST IS HERE",currentWeekDate);
    currentWeekDate.setUTCHours(10);
    var currMonth = currentWeekDate.getMonth(); //gets month number (0-11)
    var months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

    return months[currMonth];
}