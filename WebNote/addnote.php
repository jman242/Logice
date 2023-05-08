<?php
session_start();
//Checks session details from login
if (isset($_SESSION['userid']) && isset($_SESSION['username'])) {
//establishes connection
$dbconn = pg_connect("host=logice.cw3uk8qntram.us-east-2.rds.amazonaws.com port=5432 dbname=postgres user=postgres password=Logice1!");

if (!$dbconn) {
        die('Could not connect: ');
}
        $title=$_GET['title'];
        $desc=$_GET['description'];

        $sql="INSERT INTO note (uid, description, name) VALUES (".$_SESSION['userid'].", '$desc', '$title')";
        $rs=pg_query($dbconn, $sql);
        if(!$rs){
                echo pg_last_error($dbconn);
        } else {
                header("Location: index.php");
        }

}
?>