/*curDayIcon.forEach(icon => { //getting current day icon
    icon.addEventListener("click", (e) => { //adding click event on day icon
        window.bus.publish("day:change", { key:e.target.dataset.dateKey });
    })
});*/

var modal = document.getElementById("modal-wrapper");
var modalDismiss = document.getElementById("btn");


window.bus.subscribe("day:change", (payload) => {
    console.log(payload.key);
    modal.setAttribute("aria-hidden", false);
})

modalDismiss.addEventListener("click", (e) =>{
    console.log(e);
    e.preventDefault();
    modal.setAttribute("aria-hidden", true);
})