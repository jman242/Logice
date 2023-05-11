export function calculateEventHeight(starts_at, ends_at){ // exporting function for code consolidation
    let diffMs = Math.abs(starts_at - ends_at); //getting the absolute value of miliseconds between start and end time
    return Math.floor((diffMs/1000)/60); // dividing absolute value time difference by 1000 to get miliseconds and then by 60 for seconds in a a minute, then rounding down to floor and returning val
}

function calcDayOfMonth(monthDay, weekDay){ //this function returns the difference between the monthDay and weekDay. Value returned is added to currentDayOfMonth in order find the first day of week.
    while(weekDay != 0){
        monthDay--;
        weekDay--;
    }
    return monthDay;
}

export function transformEvent(event){ //transforms event into an object for the display of event to the weekview
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
        
        //Event obj including all relevant event variables
        let eventObj = {
            id: eventid, title: title, date: date, starts_at: starts_at, ends_at: ends_at, category: categ, description: description
        };
        eventsArray.push(eventObj);
    });
    return eventsArray;
}

export function getDaysInMonth(month,year) { //returns the days in month based on month and year that is passed in
  return new Date(year, month, 0).getDate();   //0 is last day of month
  };

export function calculateWeekDays(){
    var currentWeekDate = new Date(window.selectedDate); //window.selectedDate
    currentWeekDate.setUTCHours(10); //correcting for daylight savings
    var currMonth = currentWeekDate.getMonth() + 1; //offsetting month to correspond to normal calendar numbering Jan = 1, Feb = 2, etc.
    var currDay = currentWeekDate.getDate(); // gets day of the month (1-31)
    var currDayOfWeek = currentWeekDate.getDay(); //gets day of the week as number (0-6)
    var currYear = currentWeekDate.getFullYear();
    if(currentWeekDate.getTimezoneOffset() > 300){ 
         currentWeekDate.setUTCHours(12);
         currMonth = currentWeekDate.getMonth() + 1; //offsetting month to correspond to normal calendar numbering Jan = 1, Feb = 2, etc.
         currDay = currentWeekDate.getDate(); // gets day of the month (1-31)
         currDayOfWeek = currentWeekDate.getDay(); //gets day of the week as number (0-6)
         currYear = currentWeekDate.getFullYear(); // returns year in YYYY form
    }
    var currentWeek = [];
    var offset = 0;
    if((currDay + 7 > getDaysInMonth(currMonth, currYear)) || (currDay - 7 < 1)){ // if week is at the beginning or at the end of a month. These sets of if statments are calculating the correct month for the offet variable
        var lastMonthDay = 0;
        if(calcDayOfMonth(currDay, currDayOfWeek) == 0){ //case that first day of week is the end of last months highest day of month
            var currMonthVar = currMonth - 1;
            lastMonthDay = getDaysInMonth(currMonthVar, currYear); 
        }else if(calcDayOfMonth(currDay, currDayOfWeek) > 0){  // beginning of week case. 
            lastMonthDay = currDay;
        }else if(calcDayOfMonth(currDay, currDayOfWeek) < 0){ //not used
        }

        if(currDay == 7 && currDayOfWeek == 6){ //case when curr day is 7 and is still within the beginning week of month
            if(lastMonthDay > 0){ //month should not be offset
                offset = 0;
            }
            else{ //week includes prev month days and requires month to be offset
                offset = -1;
            }
        }else if(currDay < 7 && lastMonthDay > currDay){ //if currDay is less than 7 and lastMonthDay is greater than currDay set offset = -1
            offset = -1;
        }else if(calcDayOfMonth(currDay, currDayOfWeek) > 24 && currDayOfWeek < 6){ //week includes next month days and requires month to be offset
            offset = 1;
        } else if(lastMonthDay == 0){ //week includes prev month days and requires month to be offset
            offset = -1;
        }
    }
    if(getDaysInMonth(currMonth, currYear) == 30){ // case of end of month with 30 days
        if(currDayOfWeek == 0){ //if currDayOfWeek is 0 it is sunday 
            for(var i = 0; i < 7; i++){ //so create a loop to got through each day in the array starting from the beginning
                if(currDay <= 30){
                    if(currDay == 1){ //if currday is 1 increase it so it does not duplicate
                        currDay++;
                    }
                        currentWeek[i] = currDay;
                        currDay++;
                }
                else{ //new month situation set currDay to 1 and continue looping
                    currDay = 1;
                    currentWeek[i] = currDay;
                }
            }
        }
        else{ //currDayOfWeek is not 0
            if(currDay < currDayOfWeek){ //currDay is less than currDayOfWeek, this is a case when it a day of month with a value of 1-6
                let prevMonth = currentWeekDate.getMonth(); // getting month previous
                let lastMonthDate = getDaysInMonth(prevMonth, currentWeekDate.getFullYear()); //grabbing last month date through getDaysInMonth Function
                currDay = calcDayOfMonth(currDay, currDayOfWeek); //calling calcDayOfMonth to get difference between currDay and currDayOfWeek
                currDay = lastMonthDate+currDay; //getting first day of week value. 
                for(var i = 0; i < 7; i++){// proceed with creating the array based on the currDay 
                    if(currDay <= lastMonthDate){ //while currDay is less than the LastMonthDate continue creating the week array
                    currentWeek[i] = currDay;
                    currDay++;
                }
                else{ //case when currDay is greater than lastMonthDate
                    if(currDay != 1){
                        currDay = 1;
                    }
                    currentWeek[i] = currDay;
                    currDay++;
                }
                }
            }
            else{ //If we are here currDay is greater than 6 and is not in the first week of a month
            currDay = calcDayOfMonth(currDay, currDayOfWeek); //we need to grab the difference of the currDay and currDayOfWeek
            let currMonth = currentWeekDate.getMonth() + 1; // getting month previous
            let lastMonthDate = getDaysInMonth(currMonth, currentWeekDate.getFullYear());
            for(var i = 0; i < 7; i++){ //creating the week array using a for loop
                if(currDay > lastMonthDate){ //checking to make sure we are still within the current month. If currDay is greater than lastMonthDate then CurrDay needs to be set to 1 indicating a new month
                    currDay = 1;
                    currentWeek[i] = currDay;
                    currDay++;
                }
                else{ // if we are here, continue adding currDay in the week array
                    currentWeek[i] = currDay;
                    currDay++;
                }
            }
        }   
        }
    }
    else if(getDaysInMonth(currMonth, currYear) == 31){ // case of beginning of month with 31 days in prev month
        if(currDayOfWeek == 0){ //if currDayOfWeek is 0 it is sunday 
                    for(var i = 0; i < 7; i++){ //create the week array
                        if(currDay <= 31){ //check to ensure that currDay does not exceed 31 days
                            if(currDay == 1){ //if currDay = 1 then we need to put it in the array and increment it. This is the case that 1 is the beginning of the week.
                                currentWeek[i] = currDay;
                                currDay++;
                            }
                            else{ // currDay is not the first day of the week so continue the loop based on the difference of currDay and currDayOfWeek
                                currDay = calcDayOfMonth(currDay, currDayOfWeek);
                                currentWeek[i] = currDay;
                                currDay++;
                            }    
                        }
                        else{ //if currDay = 1 then we need to put it in the array and increment it. This is the case that 1 is the beginning of the week.
                            currDay = 1;
                            currentWeek[i] = currDay;
                            currDay++;
                        }
                    }
                }
                else{ //month is either 30 days or less
                    let prevMonth = currMonth - 1;
                    let lastMonthDate = getDaysInMonth(prevMonth, currentWeekDate.getFullYear());
                    if(currDay < 7) // case of the beginning of next month. currDay is a value between 1-6.
                    {
                        currDay = calcDayOfMonth(currDay, currDayOfWeek); //finding difference between currDay and currDayOfWeek
                        if(currDay < 0){ // is currDay is negative then it is the beginning week of a month
                            currDay = currDay + lastMonthDate; //this adds the negative value to last month's total days and gets the correct day of month for the beginning of week.
                        }
                        for(var i = 0; i < 7; i++){ //starting loop to create the week array
                            if(currDay == 0){ //if currDay is 0 then the lastMonthDate is the first day of the week.
                                currDay = lastMonthDate; 
                                currentWeek[i] = currDay;
                                currDay = 1; // Setting currDay to 1 because there will be no value greater than the lastMonthDate and needs to be reset for the current month's first days.
                            }
                            else{ //case that the current week includes prev months days
                                if(currDay > lastMonthDate){ //this is checking if currDay is greater than the highest date of the previous month. If this is true, we need to reset CurrDay to 1 to account for the new month first days.
                                    currDay = 1;
                                    currentWeek[i] = currDay;
                                    currDay++;
                                }
                                else{ // if currDay is not greater than lastMonthDate then that means we are not to the current months first days and need to continue adding the days and incrementing currDay.
                                    currentWeek[i] = currDay;
                                    currDay++;
                                }
                            }
                        }
                    }
                    else{ // currDay a day of month greater or equal to 7
                        currDay = calcDayOfMonth(currDay, currDayOfWeek);
                        for(var i = 0; i < 7; i++){
                            if(currDay <= 31){ // if currDay is within the current month
                                if(currDay == 1){ //if currDay is 1 then set currentWeek[i] to currDay and increment currDay.
                                    currentWeek[i] = currDay;
                                    currDay++;
                                }else{// any other situation just set currentWeek[i] to currDay and increment currDay
                                    currentWeek[i] = currDay;
                                    currDay++;
                                } 
                            }
                            else{ //case currDay is greater than 31, need to reset to 1 and continue loop for week array
                               if(currDay > getDaysInMonth(currMonth, currYear)){
                                currDay = 1;
                                currentWeek[i] = currDay;
                                currDay++;
                               }
                               else{ // continue filling week array
                                currentWeek[i] = currDay;
                                currDay++;
                               } 
                            }
                        }
                    }
                }
            }
    else{ //if we are here, the month is February.
        let prevMonth = currMonth - 1;
        let currLastMonthDate = getDaysInMonth(currMonth, currentWeekDate.getFullYear());
        let prevLastMonthDate = getDaysInMonth(prevMonth, currentWeekDate.getFullYear());
        currDay = calcDayOfMonth(currDay, currDayOfWeek);
            for(var i = 0; i < 7; i++){ //begin loop for the creation of the week array
                if(currDay == currLastMonthDate){ // if the currDay is the last day of the previous month place it in the array and then set CurrDay to 1 because we are now in the current month of Feb. 
                    currentWeek[i] = currDay;
                    currDay = 1;
                }else{ // currDay is not the last day of the prev month
                    if(currDay > currLastMonthDate){ // case that currDay is 32
                        if( currDay <= prevLastMonthDate){ // check is currDay is less than the highest day of month in prev month. This means that it is the first week of Feb and it includes prev month days
                            currentWeek[i] = currDay;
                            currDay++;
                        }
                        else if(currDay > prevLastMonthDate){ // when currDay is 31 or more we need to reset currDay to 1 and continue loop.
                            currDay = 1;
                            currentWeek[i] = currDay;
                            currDay++;
                        }else{ //
                            if(currDay > currLastMonthDate){ //this is the case it is the last week in Feb and currDate is 28 or greater.
                                currDay = 1;
                                currentWeek[i] = currDay;
                                currDay++;
                        }
                    }
                    }
                    else{ // case currDay is less than the currLastMonthDate
                        if(currDayOfWeek == 0){ // if the day of the week is sunday start adding days of the month to the week array
                            currentWeek[i] = currDay;
                            currDay++; 
                        } else{ // if day of week is not sunday
                            if(currDay < 0){ // if currDay is negative or 0 find the correct beginning of the week day of month
                                currDay = currDay + prevLastMonthDate; 
                                currentWeek[i] = currDay;
                                currDay++;
                            }else{ // if currDay is positive then it is the beginning week of a month
                                currentWeek[i] = currDay;
                                currDay++;
                            }
                        }
                        
                    } 
                }
                }            
    }
        return {currentWeek, offset}; //return the correct week array as well as the offset variable.
    }

function findUTCHours(currentDate){ //not currently being used
    return 2;
}

export function findCurrentMonth(){ //exists to get the correct month based on todays date
    var today = new Date();
    var currentWeekDate = new Date(`${window.selectedDate} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`);
    currentWeekDate.setUTCHours(10); //Day light savings offset
    var currMonth = currentWeekDate.getMonth(); //gets month number (0-11)
    var months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

    return months[currMonth];
}