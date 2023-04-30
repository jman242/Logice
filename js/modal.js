var modal = document.getElementById("modal-wrapper");
var modalSubmit = document.getElementById("form_id");
var modal2 = document.getElementById("modal-wrapper2");
var createEvent = document.getElementById("create-event");

window.bus.subscribe("event:loaded", (payload) => {
    var openEvent = document.querySelectorAll("[data-id]");
    openEvent.forEach(event =>{
            event.addEventListener("click", () => {
                console.log(event);
                modal2.setAttribute("aria-hidden", false);
            })
        })
        var close = document.querySelectorAll("[data-close]");
        close.forEach(close_button =>{
            close_button.addEventListener("click", (e) =>{
                console.log(e);
                e.preventDefault();
                e.target.closest("[data-modal]").setAttribute("aria-hidden", true); 
            })
        })
})


createEvent.addEventListener("click", () =>{
    document.getElementById("date").value = window.selectedDate;
    console.log(document.getElementById("date").value);
    modal.setAttribute("aria-hidden", false);
})




modalSubmit.addEventListener("submit", async (e) =>{ //including error handling
    e.preventDefault(); // prevents refresh of page

    var title = document.getElementById("title").value;
    var date = document.getElementById("date").value;
    var starts_val = document.getElementById("starts_at").value;
    var starts_at = `${date} ${starts_val}`;
    var ends_val = document.getElementById("ends_at").value;
    var ends_at = `${date} ${ends_val}`;
    var description = document.getElementById("description").value;
    
    if(new Date(starts_at) > new Date(ends_at)){ //handling ends_at time greater than starts_at time
        document.getElementById("starts_at").value = "";
        document.getElementById("ends_at").value = "";
        e.target.reportValidity(); //triggers invalid entry response
        return;
    }
    var body = {
        title, description, starts_at, ends_at 
    }
    
    
    // var response = await fetch("/api/new-event?user-id=lfh323", {
    //     method: "POST", // Types: GET POST PUT DELETE
    //     body: JSON.stringify(body) //requires json object, stringify converts parameters to json format
    // }) //api
    // var data = await response.json()
    //console.log(data);
    modal.setAttribute("aria-hidden", true); // Hiding modal after submitting form
})
