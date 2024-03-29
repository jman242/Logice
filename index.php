<?php

session_start();
if (isset($_SESSION['last_activity']) && time() - $_SESSION['last_activity'] > 900) { // checking if last activity is greater than 15 minutes then proceeds to log the user out
  // last request was more than 15 minutes ago
  session_unset(); // unset $_SESSION variable for the run-time
  session_destroy(); // destroy session data in storage
  header("Location: login/index.php"); // redirect to login page
}
$_SESSION['last_activity'] = time(); // update last activity time stamp

if (isset($_SESSION['userid']) && isset($_SESSION['username'])) { // checking if userid and username is not null
$dbconn = pg_connect("host=logice.cw3uk8qntram.us-east-2.rds.amazonaws.com port=5432 dbname=postgres user=postgres password=Logice1!");
$sql = "SELECT * FROM EVENT WHERE userid = ".$_SESSION['userid'];
$rs = pg_query($sql);

$event = array();
while($row = pg_fetch_assoc($rs)) {
$event[] = $row;
}
$event = json_encode($event); //returns events in database and transforms them to json
?> 

<!DOCTYPE html>
<html lang ="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>Logice - Calendar</title>
    <link rel="icon" type="image/x-icon" href="favicon.png">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://kit.fontawesome.com/e9fdb44b0e.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
    <script> var event = <?php echo $event; ?>; console.log(event);</script>
</head>
<nav class="topline">
  <div class="container">
      <img class="headerImage" src="logoHeader.png" alt="Logice - Welcome:" height="53px" width="439px" />
      <h1 class="headerh1"><?php echo $_SESSION['username']; ?></h1>
  <div class="topnav">
      <a href="index.php">Home</a>
      <a href="/notes">Notes</a>
      <a href="search.php">Search Event </a>
      <!--<a href="#settings">Settings</a>-->
      <a href="login/logout.php">Logout</a>
  </div>
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
              <!--<p class = "current-week"></p> //removed-->
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
        <form id="form_id" method="post" action="event.php">
          <h2>&nbsp;Create Event</h2><br>
          <label for="title">&nbsp; Event Title: </label>
          <input type="text" id="title" name="title" placeholder="Enter your event title" required><br><br>
          <label for="date">&nbsp; Choose a date: &nbsp; &nbsp;</label>
          <input type="date" id="date" name="date" required>
          <label for="time">&nbsp; Starts at: </label>
          <input type="time" id="starts_at" name="f_time" required>
          <label for="time">&nbsp; Ends at: </label>
          <input type="time" id="ends_at" name="t_time" required><br><br>
          <label for="categ">&nbsp; Category: </label>
          <select name="categ" id="categ">
            <option value="Meeting">Meeting</option>
            <option value="Play">Play</option>
            <option value="Shopping">Shopping</option>
            <option value="Medical">Medical</option>
            <option value="Date">Date</option>
          </select>
          <p><label for="description">&nbsp; Description: </label></p>
          <textarea id="description" name="description" placeholder="Enter your description" rows="4" cols="30" required></textarea><br><br>
          <button id="submit-btn">Submit</button>
          <button data-close onclick = "reset()">Close</button> <!--resetting modal form input fields upon closing modal -->
        </form>
      </div>
      <div data-modal id="modal-wrapper2" aria-hidden="true">
	    <form id="View" method="POST" action="delevent.php">
          <h2>&nbsp;Event Details</h2><br>
          <p hidden><input type="hidden" id="event_id" name="eid"/></p>
          <p>&nbsp; Event Title: <span id="event_title"></span></p>
          <p>&nbsp; Event Date: &nbsp; &nbsp;<span id="event_date"></span></p>
          <p>&nbsp; Starts at: <span id="event_starts_at"></span></p>
          <p>&nbsp; Ends at: <span id="event_ends_at"></span></p>
          <p>&nbsp; Category: <span id="event_category"></span></p>
          <p>&nbsp; Description: <span id="event_description"></span></p>
          <button id="delete-btn">Delete Event</button>
          <button data-close>Close</button> 
      </div>
	</form>
      <script src="./js/index.js" defer type="module"></script>
  </body>
</html>
<?php
}else{

      header("Location: ../login/index.php");

      exit();
 }

?>
