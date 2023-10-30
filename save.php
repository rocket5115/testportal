<?php
if(isset($_COOKIE['username'])and isset($_COOKIE['password'])and isset($_COOKIE['data'])and isset($_COOKIE['title'])){
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
    $result = $conn->query('SELECT id FROM projekty WHERE title="'.$_COOKIE['title'].'" AND uid="'.$uid.'"');
    if($result->num_rows>0){
        $conn->query('UPDATE projekty SET data="'.$_COOKIE['data'].'" WHERE title="'.$_COOKIE['title'].'" AND uid="'.$uid.'"');
        echo('Pomyślnie Zapisano Projekt');
    } else {
        $conn->query('INSERT INTO projekty (title,data,uid) VALUES("'.$_COOKIE['title'].'","'.$_COOKIE['data'].'","'.$uid.'")');
        echo('Pomyślnie Zapisano Projekt (pierwszy raz)');
    };
    $conn->close();
} else {
    die('You must be logged in!');
};
?>