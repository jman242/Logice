<?php ini_set('display_errors', 1);
   $dbconn = pg_connect("host=logice.cw3uk8qntram.us-east-2.rds.amazonaws.com port=5432 dbname=postgres user=postgres password=Logice1!");
   session_start();
   session_regenerate_id(true);
   if($_SERVER["REQUEST_METHOD"] == "POST") {
      // username and password sent from form 

      $username = $_POST['username'];
      $password = $_POST['password'];

      $sql = "SELECT * FROM users WHERE email = '$username' and pass = '$password'";
      $result = pg_query($dbconn,$sql);
      $row = pg_fetch_array($result);
      if ($row['email'] == $username && $row['pass'] == $password) {
      $_SESSION['username'] = $row['email'];
      $_SESSION['userid'] = $row['userid'];
      header("Location: ../index.php");
      exit();
      }else {
         $error = "Your Login Name or Password is invalid";
      }
    }
?>
