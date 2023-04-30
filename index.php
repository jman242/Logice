<!DOCTYPE html>
<html lang ="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>Logice</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://kit.fontawesome.com/e9fdb44b0e.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
</head>
<nav class="topline">
  <div class="container">
      <i class="fa-regular fa-l"></i>
      <h1>Logice</h1>
  <div class="topnav">
      <a href="/">Home</a>
      <a href="/notes">Notes</a>
      <!--<a href="#settings">Settings</a>-->
      <a href="/login">Logout</a>
  </div>
</nav>
    <body>
      <div class="wrapper">
          <header>
            <p class="current-date"></p>
            <button id = "create-event" class="button">Create Event</button>
            <div class="icons">
              <span id="prev" class="material-symbols-rounded">chevron_left</span>
              <span id="next" class="material-symbols-rounded">chevron_right</span>
            </div>
          </header>
          <div class="calendar">
            <ul class="weeks">
              <li>SUN</li>
              <li>MON</li>
              <li>TUE</li>
              <li>WED</li>
              <li>THU</li>
              <li>FRI</li>
              <li>SAT</li>
            </ul>
            <ul class="days"></ul>
          </div>
      </div>
      <div class="week-view">
        <header>
          <div class="week-icons">
              <span></span>
              <p>Week View</p>
              <!--<p class = "current-week"></p> -->
              <span></span>
          </div>
        </header>
        <div class="week-grid">
          <div class="row">
            <div class="day-cell" data-day="0">
              <div data-day-label></div>
              <div data-time-block></div>
            </div>
            <div class="day-cell" data-day="1">
              <div data-day-label></div>
              <div data-time-block></div>
            </div>
            <div class="day-cell" data-day="2">
              <div data-day-label></div>
              <div data-time-block></div>
            </div>
            <div class="day-cell" data-day="3">
              <div data-day-label></div>
              <div data-time-block></div>
            </div>
            <div class="day-cell" data-day="4">
              <div data-day-label></div>
              <div data-time-block></div>
            </div>
            <div class="day-cell" data-day="5">
              <div data-day-label></div>
              <div data-time-block></div>
            </div>
            <div class="day-cell" data-day="6">
              <div data-day-label></div>
              <div data-time-block></div>
            </div>
          </div>
      </div>
      <footer></footer>
      <div data-modal id="modal-wrapper" aria-hidden="true">
        <form id="form_id">
          <h2>&nbsp;Create Event</h2><br>
          <label for="title">&nbsp; Event Title: </label>
          <input type="text" id="title" name="title" placeholder="Enter your event title" required><br><br>
          <label for="date">&nbsp; Choose a date: &nbsp; &nbsp;</label>
          <input type="date" id="date" required>
          <label for="time">&nbsp; Starts at: </label>
          <input type="time" id="starts_at" required>
          <label for="time">&nbsp; Ends at: </label>
          <input type="time" id="ends_at" required><br><br>
          <p><label for="description">&nbsp; Description: </label></p>
          <textarea id="description" name="description" placeholder="Enter your description" rows="4" cols="30" required></textarea><br><br>
          <button id="submit-btn">Submit</button>
          <button data-close onclick = "reset()">Close</button> <!--resetting modal form input fields upon closing modal -->
        </form>
      </div>
      <div data-modal id="modal-wrapper2" aria-hidden="true">
        <form id="event_id">
          <h2>&nbsp;Event Details</h2><br>
          <label for="title">&nbsp; Event Title: </label>
          <label for="date">&nbsp; Event date: &nbsp; &nbsp;</label>
          <label for="time">&nbsp; Starts at: </label>
          <label for="time">&nbsp; Ends at: </label>
          <p><label for="description">&nbsp; Description: </label></p>
          <button id="delete-btn">Delete Event</button>
          <button data-close>Close</button> 
        </form>
      </div>
      <script src="./js/index.js" defer type="module"></script>
  </body>
</html>
