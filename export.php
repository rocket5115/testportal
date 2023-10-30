<?php
if(isset($_COOKIE['username'])and isset($_COOKIE['password'])and isset($_COOKIE['data'])and isset($_COOKIE['answers'])and isset($_COOKIE['pass'])and isset($_COOKIE['title'])){
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
    function CreateNewPID() {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
    
        for ($i = 0; $i < 6; $i++) {
            $index = rand(0, strlen($characters) - 1);
            $randomString .= $characters[$index];
        }
        return $randomString;
    };
    $password = $_COOKIE['pass'];
    if($password=='#NOT#SET'){
        $password="";
    };
    $pid = CreateNewPID();
    $conn->query('INSERT INTO exports (title,code,data,answers,uid,pid) VALUES("'.$_COOKIE['title'].'","'.$password.'","'.$_COOKIE['data'].'","'.$_COOKIE['answers'].'","'.$uid.'","'.$pid.'")');
    $conn->close();
    echo('Twoje Nowe ID Testu to: '.$pid);
} else {
    die('You must be logged in!');
};
?>