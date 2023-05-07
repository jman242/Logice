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
  //0 is last day of month
  return new Date(year, month, 0).getDate();
  };

export function calculateWeekDays(){
    var currentWeekDate = new Date(window.selectedDate); //window.selectedDate
    currentWeekDate.setUTCHours(10);
    //console.log(currentWeekDate.getTimezoneOffset());
    var currMonth = currentWeekDate.getMonth() + 1; //offsetting month to correspond to normal calendar numbering Jan = 1, Feb = 2, etc.
    var currDay = currentWeekDate.getDate(); // gets day of the month (1-31)
    var currDayOfWeek = currentWeekDate.getDay(); //gets day of the week as number (0-6)
    var currYear = currentWeekDate.getFullYear();
    //console.log(currentWeekDate);
    //console.log(currYear);
    if(currentWeekDate.getTimezoneOffset() > 300){ // || currentWeekDate.getTimezoneOffset() < 300)
         //console.log("tast")
         currentWeekDate.setUTCHours(12);
         console.log(currentWeekDate);
         currMonth = currentWeekDate.getMonth() + 1; //offsetting month to correspond to normal calendar numbering Jan = 1, Feb = 2, etc.
         currDay = currentWeekDate.getDate(); // gets day of the month (1-31)
         currDayOfWeek = currentWeekDate.getDay(); //gets day of the week as number (0-6)
         currYear = currentWeekDate.getFullYear(); // returns year in YYYY form
    }
    //console.log(currDay);
    //console.log(currDayOfWeek);
    //console.log(currMonth);
    var currentWeek = [];
    var offset = 0;
    //var day = currDay;
    //console.log("CURRENT MONTH: ", currMonth);
    //console.log("CURRENT DAY: ", calcDayOfMonth(currDay, currDayOfWeek));
    if((currDay + 7 > getDaysInMonth(currMonth, currYear)) || (currDay - 7 < 1)){ // if week is at the beginning or at the end of a month //currDay - 7 < 1 ? offset = -1 : offset = 1;
        var lastMonthDay = 0;
        //console.log();
        if(calcDayOfMonth(currDay, currDayOfWeek) == 0){
            var currMonthVar = currMonth - 1;
            lastMonthDay = getDaysInMonth(currMonthVar, currYear); 
            //console.log("WE ARE HERE");
        }else if(calcDayOfMonth(currDay, currDayOfWeek) > 0){
            //console.log();
            //console.log("WE ARE HERE");
            lastMonthDay = currDay;
        }else if(calcDayOfMonth(currDay, currDayOfWeek) < 0){
            //console.log("WE ARE HERE", currDay);
            //lastMonthDay = currDay;
        }

        if(currDay == 7 && currDayOfWeek == 6){ //case when curr day is 7 and is still within the beginning week of month
            if(lastMonthDay > 0){
                offset = 0;
                //console.log("MIDDLE OF MONTH!!!");
            }
            else{
                offset = -1;
                console.log("BEGINNING OF MONTH!!!");
            }
        }else if(currDay < 7 && lastMonthDay > currDay){ 
            offset = -1;
            console.log("BEGINNING OF MONTH!!!");

        }else if(calcDayOfMonth(currDay, currDayOfWeek) > 24 && currDayOfWeek < 6){
            offset = 1;
            //console.log("END OF MONTH!!!");

        } else if(lastMonthDay == 0){
            offset = -1;
        }
    }

    //console.log(currDay); // 11?
    if(getDaysInMonth(currMonth, currYear) == 30){ // case of end of month with 30 days
        console.log(currDay); // 11?
        //console.log("test1");
        if(currDayOfWeek == 0){
            for(var i = 0; i < 7; i++){
                //console.log("test");
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
                //console.log("test1");
                let prevMonth = currentWeekDate.getMonth(); // getting month previous
                let lastMonthDate = getDaysInMonth(prevMonth, currentWeekDate.getFullYear());
                //console.log(lastMonthDate);
                currDay = calcDayOfMonth(currDay, currDayOfWeek);
                //console.log(currDay);
                currDay = lastMonthDate+currDay;
                //console.log(currDay);
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
            //console.log(currDay);
            //console.log(currDayOfWeek);
            currDay = calcDayOfMonth(currDay, currDayOfWeek);
            let currMonth = currentWeekDate.getMonth() + 1; // getting month previous
            let lastMonthDate = getDaysInMonth(currMonth, currentWeekDate.getFullYear());
            //console.log(currMonth);
            //console.log(lastMonthDate);
            //console.log(currDay);
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
        //console.log(currDay); // 11?
        //console.log(currDayOfWeek)
        if(currDayOfWeek == 0){
            console.log("test");
                    for(var i = 0; i < 7; i++){
                        //console.log("test");
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
                    //console.log(getDaysInMonth(currMonth, currYear));
                    let prevMonth = currMonth - 1;
                    let lastMonthDate = getDaysInMonth(prevMonth, currentWeekDate.getFullYear());
                    //console.log(lastMonthDate); 
                    //console.log(currDay);
                    //console.log(currentWeekDate.getDay());
                    //currDay = calcDayOfMonth(currDay, currDayOfWeek);
                    //console.log(currDay);
                    //console.log(currMonth); // 3
                    //console.log("test");
                    if(currDay < 7) // case of the beginning of next month
                    {
                        //console.log("test1");
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
                                    //console.log("test");
                                    currDay = 1;
                                    currentWeek[i] = currDay;
                                    currDay++;
                                }
                                else{
                                    //console.log(currDay);
                                    currentWeek[i] = currDay;
                                    currDay++;
                                }
                            }
                        }
                        //endOffset = 1;
                    }
                    else{ // case of previous month //currday = 12
                        currDay = calcDayOfMonth(currDay, currDayOfWeek);
                        //console.log(currDay);
                        //console.log("test");
                        for(var i = 0; i < 7; i++){
                            if(currDay <= 31){
                                //console.log("test1");
                                if(currDay == 1){
                                    console.log("TEST")
                                    currentWeek[i] = currDay;
                                    currDay++;
                                }else{
                                    //console.log("TEST")
                                    currentWeek[i] = currDay;
                                    //console.log(currentWeek[i]);
                                    currDay++;
                                } 
                            }
                            else{
                               if(currDay > getDaysInMonth(currMonth, currYear)){
                               //console.log("TEST")
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
        //console.log(currDay);
        let prevMonth = currMonth - 1;
        let currLastMonthDate = getDaysInMonth(currMonth, currentWeekDate.getFullYear());
        let prevLastMonthDate = getDaysInMonth(prevMonth, currentWeekDate.getFullYear());
        //console.log(currDay);
        currDay = calcDayOfMonth(currDay, currDayOfWeek);
        //console.log(currLastMonthDate); 
        //console.log(getDaysInMonth(currMonth,currYear));
            for(var i = 0; i < 7; i++){
                //currDay = calcDayOfMonth(currDay, currDayOfWeek);
                //console.log(currDay);
                if(currDay == currLastMonthDate){
                    //console.log("test1");
                    currentWeek[i] = currDay;
                    currDay = 1;
                }else{
                    //console.log("test1");
                    if(currDay > currLastMonthDate){
                        //console.log("test1");
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
                        //console.log("test1");
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

function findUTCHours(currentDate){
    return 2;
}

export function findCurrentMonth(){
    var today = new Date();
    var currentWeekDate = new Date(`${window.selectedDate} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`);
    console.log("TEST IS HERE",currentWeekDate);
    currentWeekDate.setUTCHours(10);
    //console.log(currentWeekDate.getUTCHours())
    //currentWeekDate.setUTCHours(10);
    //console.log(currentWeekDate);
    var currMonth = currentWeekDate.getMonth(); //gets month number (0-11)
    //console.log(currMonth);
    var months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

    return months[currMonth];
}