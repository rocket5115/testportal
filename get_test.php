<?php
    if(!isset($_COOKIE['code'])or!isset($_COOKIE['pass'])or!isset($_COOKIE['firstname'])or!isset($_COOKIE['surname'])or!isset($_COOKIE['class'])){
        die('^Invalid Data!');
    };
    $conn = new mysqli("localhost", "root", "", "testportal");
    if ($conn->connect_error) {
        die("^Connection failed: " . $conn->connect_error);
    };
    $result=$conn->query('SELECT data FROM exports WHERE pid="'.$_COOKIE['code'].'" AND code="'.$_COOKIE['pass'].'"');
    if($result->num_rows > 0) {
        echo($result->fetch_assoc()['data']);
    } else {
        echo('^Invalid Data!');
    };
    $conn->close();
?>