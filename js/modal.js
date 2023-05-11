//These variables are being used to grab elements classified by each different id name.
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

window.bus.subscribe("event:loaded", (payload) => { //function to check for user interaction to the week view
    var openEvent = document.querySelectorAll("[data-id]");
    openEvent.forEach(event =>{ //For each loop to go through each event displayed on the week view
            var data = JSON.parse(event.getAttribute("data-json")) //transforming data-json to html so it can be grabbed and displayed
            event.addEventListener("click", () => { //each time the user clicks on an event in the week view, insert respective event detail into the modal
                var startDate = new Date(data.starts_at);
                document.getElementById('event_id').value = data.id;
                title.innerHTML = data.title;
                description.textContent = data.description;
                event_category.textContent = data.category;
                date.textContent = startDate.toLocaleString().split(',')[0];
                starts_at.textContent = `${startDate.getHours()}:${String(startDate.getMinutes()).padStart(2,"0")}`;
                var endDate = new Date(data.ends_at);
                ends_at.textContent = `${endDate.getHours()}:${String(endDate.getMinutes()).padStart(2,"0")}`;
                modal2.setAttribute("aria-hidden", false);
            })
        })
})

var close = document.querySelectorAll("[data-close]"); //grabbing close button id "[data-close]" to apply appropriate close functionality
close.forEach(close_button =>{ //close button functionality for both modals
    close_button.addEventListener("click", (e) =>{
        e.preventDefault();
        e.target.closest("[data-modal]").setAttribute("aria-hidden", true); 
    })
})


createEvent.addEventListener("click", () =>{ // create event button click functionality to populate the date within the create event modal
    document.getElementById("date").value = window.selectedDate;
    modal.setAttribute("aria-hidden", false);
})


