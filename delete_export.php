<?php
if(isset($_COOKIE['username'])and isset($_COOKIE['password'])and isset($_COOKIE['pid'])){
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
    $result=$conn->query('SELECT id FROM exports WHERE pid="'.$_COOKIE['pid'].'" AND uid="'.$uid.'"');
    if($result->num_rows>0){
        $conn->query('DELETE FROM exports WHERE pid="'.$_COOKIE['pid'].'" AND uid="'.$uid.'"');  
        $conn->query('DELETE FROM answers WHERE code="'.$_COOKIE['pid'].'"');
    }
    $conn->close();
    echo("Pomyślnie usunięto eksport i jego wyniki!");
} else {
    die('You must be logged in!');
};
?>