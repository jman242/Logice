<?php
session_start();
//Checks session details from login
if (isset($_SESSION['userid']) && isset($_SESSION['username'])) { // checking if userid and username is not null
//establishes connection
	$dbconn = pg_connect("host=logice.cw3uk8qntram.us-east-2.rds.amazonaws.com port=5432 dbname=postgres user=postgres password=Logice1!");

	if (!$dbconn) {
        die('Could not connect: ');
	}

	$eid = $_POST['eid'];
	$sql = "DELETE FROM event WHERE eventid = $eid";
	
    $rs=pg_query($dbconn, $sql);
    if(!$rs){  //error with command
        echo pg_last_error($dbconn);
    } else {
        header("Location: index.php");
    }

}
?>
