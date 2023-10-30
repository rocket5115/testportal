<?php
if(isset($_COOKIE['username'])and isset($_COOKIE['password'])and isset($_COOKIE['data'])){
    $conn = new mysqli("localhost", "root", "", "testportal");
    if ($conn->connect_error) {
        die('failed Error Connecting to Server');
    };
    $result = $conn->query('SELECT uid FROM users WHERE username="'.$_COOKIE['username'].'" AND password="'.$_COOKIE['password'].'"');
    $uid;
    if($result->num_rows>0){
        $uid=$result->fetch_assoc()['uid'];
    } else {
        die('You must be logged in!');
    };
    $result=$conn->query('SELECT id FROM projekty WHERE title="'.$_COOKIE['data'].'" AND uid="'.$uid.'"');
    if($result->num_rows>0){
        $conn->query('DELETE FROM projekty WHERE title="'.$_COOKIE['data'].'" AND uid="'.$uid.'"');
        echo("Pomyślnie usunięto Projekt!");
    };
    $conn->close();
} else {
    die('You must be logged in!');
};
?>