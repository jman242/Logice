<?php ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$dbconn = pg_connect("host=logice.cw3uk8qntram.us-east-2.rds.amazonaws.com port=5432 dbname=postgres user=postgres password=Logice1!");
session_start();

if (isset($_SESSION['userid']) && isset($_SESSION['username'])) {
?>
<!DOCTYPE html>
<html lang ="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <title>Logice - Search</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://kit.fontawesome.com/e9fdb44b0e.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1$
</head>
    <nav class="topline">
        <div class="container">
            <img class="headerImage" src="logoHeader.png" alt="Logice - Welcome:" height="53px" width="439px" />
            <h1 class="headerh1"><?php echo $_SESSION['username']; ?></h1>
            <div class="topnav">
                <a class="active" href="index.php">Home</a>
                <a href="notes/index.php">Notes</a>
                <a href="search.php">Search Event</a>
                <a href="login/logout.php">Logout</a>
            </div>
        </div>
    </nav>
    <body>
      <div class="sub-menu">
        <a class="active" href="#overview">Overview</a>
        <a href="#notes">Notes</a>
        <a href="search.php">Search Event</a>
      </div>

      <form name= "Search" action="search.php" method="GET">
        <input type="text" name="title" />
        <input type="submit" name="search" value="Search" />
      </form>

      <table align = "center" border = "1" cellpadding = "3" cellspacing = "0" style="width:80%; margin-left:auto; margin-right:auto;">
        <tr>
        <th>Type</th>
        <th>Title</th>
        <th>Date</th>
        <th>From</th>
        <th>To</th>
        <th>Description</th>
        </tr>
<?php
if(isset($_GET['search'])) {
$title = $_GET['title'];
$title = htmlspecialchars($title);
$rs = pg_query("SELECT * FROM event WHERE title LIKE '%".$title."%' AND userid = ".$_SESSION['userid']." ORDER BY eventdate");

if(pg_num_rows($rs) > 0){
   while($out = pg_fetch_array($rs)) {
     switch($out['category']) {
     case "Meeting":
       echo "<tr style='background-color:red'>";
       break;
     case "Play":
       echo "<tr style='background-color:blue'>";
       break;
     case "Shopping":
       echo "<tr style='background-color:orange'>";
       break;
     case "Medical":
       echo "<tr style='background-color:green'>";
       break;
     case "Date":
       echo "<tr style='background-color:purple'>";
       break;
     }
     echo "<td>".$out['category']."</td>";
     echo "<td>".$out['title']."</td>";
     echo "<td>".$out['eventdate']."</td>";
     echo "<td>".$out['start']."</td>";
     echo "<td>".$out['fin']."</td>";
     echo "<td>".$out['descrip']."</td>";
     echo "</tr>";
   }
} else {
   echo "<tr>";
   echo "<td>No results</td>";
   echo "<td></td>";
   echo "<td></td>";
   echo "<td></td>";
   echo "<td></td>";
   echo "</tr>";
   }
}
?>
</table>
</body>
</html>
<?php
} else{
echo "Something is wrong!";
}
?>
