<?php
session_start();
//Checks session details from login
if (isset($_SESSION['userid']) && isset($_SESSION['username'])) {
//establishes connection
$dbconn = pg_connect("host=logice.cw3uk8qntram.us-east-2.rds.amazonaws.com port=5432 dbname=postgres user=postgres password=Logice1!");

if (!$dbconn) {
        die('Could not connect: ');
}

//stores POST variables into php variables
$title = $_POST['title'];
$date = date("m-d-y", strtotime($_POST['date']));
$from = date("H:m:s",strtotime($_POST['f_time'])); // Capital H = 24 hour time
$to = date("H:m:s", strtotime($_POST['t_time'])); // Capital H = 24 hour time
$desc = $_POST['description'];
$cat = $_POST['categ'];

//Creates sql strin and inserts into db using pg_query
$sql = "INSERT INTO Event (userid, title, eventdate, start, fin, categ, descrip) VALUES (".$_SESSION['userid'].", '$title', '$date', '$from', '$to', '$cat', '$desc')";
$rs = pg_query($dbconn, $sql);

//troubleshooting
if(!$rs){
  echo pg_last_error($dbconn);
} else {
  header("Location: index.php";
}
}
?>
