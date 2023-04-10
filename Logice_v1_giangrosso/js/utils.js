export function calculateEventHeight(starts_at, ends_at){ // exporting function for code consolidation
    let diffMs = Math.abs(starts_at - ends_at); //getting the absolute value of miliseconds between start and end time
    return Math.floor((diffMs/1000)/60); // dividing absolute value time difference by 1000 to get miliseconds and then by 60 for seconds in a a minute, then rounding down to floor and returning val
}