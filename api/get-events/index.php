<?php
session_start();
ini_set('display_errors', 1); error_reporting(-1);
//Checks session details from login
if (isset($_SESSION['userid']) && isset($_SESSION['username'])) {
//establishes connection
$dbconn = pg_connect("host=logice.cw3uk8qntram.us-east-2.rds.amazonaws.com port=5432 dbname=postgres user=postgres password=Logice1!");

if (!$dbconn) {
        die('Could not connect: ');
}

//$sql = pg_query("SELECT * FROM event WHERE userid = ".$_SESSION['userid']);
$sql = "SELECT * FROM event WHERE userid=".$_SESSION['userid']."";
$rs = pg_query($dbconn, $sql);


// //$sql = "SELECT * FROM event WHERE userid=".$_SESSION['userid']."";
// $array = array();
// while($row = pg_fetch_row($rs)){
//   $array[] = $row;
// }


//troubleshooting
if(!$rs){
  echo(pg_last_error($dbconn));
} else {
  echo(json_encode($rs));
}
}
else{
  echo("Could not retrieve session id");
}
?>