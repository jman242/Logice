document.addEventListener("DOMContentLoaded", async () => { 
    var response = await fetch("http://127.0.0.1:5555/Logice/Logice_v1_giangrosso/mock.json"); //api call 
    var data = await response.json();
    window.bus.publish("event:change", {data});
})

