var modal = document.getElementById("modal-wrapper");
var modalSubmit = document.getElementById("form_id");
var modal2 = document.getElementById("modal-wrapper2");
var createEvent = document.getElementById("create-event");
var title = document.getElementById("event_title");
var date = document.getElementById("event_date");
var starts_at = document.getElementById("event_starts_at");
var ends_at = document.getElementById("event_ends_at");
var description = document.getElementById("event_description");
var event_id = document.getElementById("event_id");
var event_category = document.getElementById("event_category");
var event_starts_at = "";

window.bus.subscribe("event:loaded", (payload) => {
    //console.log("TEST");
    var openEvent = document.querySelectorAll("[data-id]");
    openEvent.forEach(event =>{
            var data = JSON.parse(event.getAttribute("data-json"))
            event.addEventListener("click", () => {
                var startDate = new Date(data.starts_at);
                console.log("START DATE: ", startDate);
                console.log("TEST! event_id issue");
                event_id.innerHTML = data.id;
                console.log("TEST! title issue");
                title.innerHTML = data.title;
                console.log("TEST! description issue");
                description.textContent = data.description;
                event_category.textContent = data.category;
                date.textContent = startDate.toLocaleString().split(',')[0];
                event_starts_at.textContent = `${startDate.getHours()}:${String(startDate.getMinutes()).padStart(2,"0")}`
                var endDate = new Date(data.ends_at);
                ends_at.textContent = `${endDate.getHours()}:${endDate.getMinutes()}`;
                console.log("Why are we here?");
                modal2.setAttribute("aria-hidden", false);
            })
        })
})

var close = document.querySelectorAll("[data-close]");
close.forEach(close_button =>{
    close_button.addEventListener("click", (e) =>{
        e.preventDefault();
        e.target.closest("[data-modal]").setAttribute("aria-hidden", true); 
    })
})


createEvent.addEventListener("click", () =>{
    document.getElementById("date").value = window.selectedDate;
    //console.log(document.getElementById("date").value);
    modal.setAttribute("aria-hidden", false);
})

// modalSubmit.addEventListener("submit", async (e) =>{ //including error handling
//     //e.preventDefault(); // prevents refresh of page

//     var title = document.getElementById("title").value;
//     var date = document.getElementById("date").value;
//     var starts_val = document.getElementById("starts_at").value;
//     var starts_at = new Date(`${date} ${starts_val}`);
//     var ends_val = document.getElementById("ends_at").value;
//     var ends_at = `${date} ${ends_val}`;
//     var description = document.getElementById("description").value;
//     var categ = document.getElementById("categ").value;


//     if(new Date(starts_at) > new Date(ends_at)){ //handling ends_at time greater than starts_at time
//         document.getElementById("starts_at").value = "";
//         document.getElementById("ends_at").value = "";
//         e.target.reportValidity(); //triggers invalid entry response
//         return;
//     }
//     var body = {
//         title, description, starts_at, date, ends_at, categ
//     }
    
//     console.log(body);
//     var response = await fetch("logice.cw3uk8qntram.us-east-2.rds.amazonaws.com", {
//         method: "POST", // Types: GET POST PUT DELETE
//         body: JSON.stringify(body) //requires json object, stringify converts parameters to json format
//     }) //api
//     var data = await response.json();
//     console.log(data);
//     modal.setAttribute("aria-hidden", true); // Hiding modal after submitting form
// })
