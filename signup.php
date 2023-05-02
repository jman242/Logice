<?php ini_set('display_errors', 1);
//DB Connection details
$dbconn = pg_connect("host=logice.cw3uk8qntram.us-east-2.rds.amazonaws.com port=5432 dbname=postgres user=postgres password=Logice1!");
if (!$dbconn) {
        die('Could not connect: ');
}
echo 'Connected successfully';

//Passes POST variables into php variables
$fname = $_POST['f_name'];
$lname = $_POST['l_name'];
$email = $_POST['t_email'];
$pass = $_POST['t_password'];

//Creates SQL statement as string
$sql = "INSERT INTO Users (lastname, firstname, email, pass) VALUES ('$lname', '$fname', '$email', '$pass');";
//pg_query enters sql into database to insert variables
$rs = pg_query($dbconn, $sql);
//troubleshooting statement. returns to login.
if($rs) {
echo 'Recrods inserted';

header("Location: ../login/login.html");
}
?>