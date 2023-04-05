<?php ini_set('display_errors', 1); error_reporting(-1);
$dbconn = pg_connect("host=logice.cw3uk8qntram.us-east-2.rds.amazonaws.com port=5432 dbname=postgres user=postgres password=Logice1!");

if (!$dbconn) {
        die('Could not connect: ');
}
echo 'Connecte successfully';

$fname = $_POST['f_name'];
$lname = $_POST['l_name'];
$email = $_POST['t_email'];
$pass = $_POST['t_password'];

$sql = "INSERT INTO Users (lastname, firstname, email, pass) VALUES ('$lname', '$fname', '$email', '$pass');";
$rs = pg_query($dbconn, $sql);

if($rs)
{
        echo "Contact Records Inserted";
}
?>
