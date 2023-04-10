document.addEventListener("DOMContentLoaded", async () => { 
    var response = await fetch("http://127.0.0.1:5555/Logice/Logice_v1_giangrosso/mock.json"); //api call 
    var data = await response.json();
    window.bus.publish("event:change", {
        dateRef:{
            month: "April", week: [9, 10, 11, 12, 13, 14, 15] //hard coding week and month for week view
        },
        events: data.events
    });
})

