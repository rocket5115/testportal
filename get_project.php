<?php
    require "main.php";
    if(!IsPostSet(["username","password","project_name"])) {
        die('You must be logged in!');
    };
    $conn = new mysqli("localhost", "root", "", "testportal");
    if ($conn->connect_error) {
        die("Brak rekordów");
    };
    $result = $conn->query('SELECT projekty.data AS prData FROM projekty AS prj JOIN users AS us ON prj.uid=users.uid WHERE us.username="'.$_COOKIE['username'].'" AND us.password="'.$_COOKIE['password'].'" AND prj.title="'.$_COOKIE['project_name'].'"');
    if ($result->num_rows > 0) {
        $row=$result->fetch_assoc();
        echo($row['prData']);
        $conn->close();
    } else {
        $conn->close();
        die('Brak rekordów');
    };
?>
