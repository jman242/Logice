var modal = document.getElementById("modal-wrapper");
var modalDismiss = document.getElementById("close-btn");
var modalSubmit = document.getElementById("form_id");

window.bus.subscribe("day:change", (payload) => {
    if (payload.key != undefined){ //check to see if user clicked day of the month in calendar view
        document.getElementById("date").value = payload.key;
        modal.setAttribute("aria-hidden", false);
    }
})

modalDismiss.addEventListener("click", (e) =>{
    console.log(e);
    e.preventDefault();
    modal.setAttribute("aria-hidden", true);
})

modalSubmit.addEventListener("submit", async (e) =>{
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
    
    
    var response = await fetch("/api/new-event?user-id=lfh323", {
        method: "POST", // Types: GET POST PUT DELETE
        body: JSON.stringify(body) //requires json object, stringify converts parameters to json format
    }) //api
    var data = await response.json()
    console.log(data);
    modal.setAttribute("aria-hidden", true); // Hiding modal after submitting form
})
