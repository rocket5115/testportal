<?php
    if(!isset($_COOKIE['username'])or!isset($_COOKIE['password'])or!isset($_COOKIE['project_name'])){
        die('You must be logged in!');
    };
    $conn = new mysqli("localhost", "root", "", "testportal");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    };
    $result = $conn->query('SELECT projekty.data AS prData FROM projekty INNER JOIN users ON projekty.uid=users.uid WHERE users.username="'.$_COOKIE['username'].'" AND users.password="'.$_COOKIE['password'].'" AND projekty.title="'.$_COOKIE['project_name'].'"');
    if ($result->num_rows > 0) {
        $row=$result->fetch_assoc();
        echo($row['prData']);
        $conn->close();
    } else {
        $conn->close();
        die('Brak rekordów');
    };
?>