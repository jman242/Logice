<?php
session_start();
//Checks session details from login
if (isset($_SESSION['userid']) && isset($_SESSION['username'])) {
//establishes connection
$dbconn = pg_connect("host=logice.cw3uk8qntram.us-east-2.rds.amazonaws.com port=5432 dbname=postgres user=postgres password=Logice1!");

if (!$dbconn) {
        die('Could not connect: ');
}


//Creates sql strin and inserts into db using pg_query
$sql = "SELECT * FROM event WHERE userid = '{$_SESSION['userid']}'";
$rs = pg_query($sql);


if(!$rs){
  echo(pg_last_error($dbconn));
} else {
  $events = json_encode(pg_fetch_all($rs));
  echo $events;
}
}
else{
  echo("Could not retrieve session id");
}
?>
