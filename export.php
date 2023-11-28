<?php
require "main.php";
if(IsPostSet(["username","password","data","answers","pass","title"])) {
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
    $password = $_COOKIE['pass']=="#NOT#SET"?"":$password;
    $pid = CreateFreeUID(6);
    $conn->query('INSERT INTO exports (title,code,data,answers,uid,pid) VALUES("'.$_COOKIE['title'].'","'.$password.'","'.$_COOKIE['data'].'","'.$_COOKIE['answers'].'","'.$uid.'","'.$pid.'")');
    $conn->close();
    echo('Twoje Nowe ID Testu to: '.$pid);
} else {
    die('You must be logged in!');
};
?>
