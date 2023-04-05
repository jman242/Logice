var modal = document.getElementById("modal-wrapper");
var modalDismiss = document.getElementById("close-btn");

window.bus.subscribe("day:change", (payload) => {
    console.log(payload.key);
    modal.setAttribute("aria-hidden", false);
})

modalDismiss.addEventListener("click", (e) =>{
    console.log(e);
    e.preventDefault();
    modal.setAttribute("aria-hidden", true);
})
 
