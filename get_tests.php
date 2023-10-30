<?php
    if(!isset($_COOKIE['username'])or!isset($_COOKIE['password'])){
        die('^Invalid Data!');
    };
    $conn = new mysqli("localhost", "root", "", "testportal");
    if ($conn->connect_error) {
        die("^Connection failed: " . $conn->connect_error);
    };
    $result = $conn->query('SELECT uid FROM users WHERE username="'.$_COOKIE['username'].'" AND password="'.$_COOKIE['password'].'"');
    $uid;
    if($result->num_rows>0){
        $uid=$result->fetch_assoc()['uid'];
    } else {
        die('^You must be logged in!');
    };
    $result=$conn->query('SELECT title,code,pid FROM exports WHERE uid="'.$uid.'"');
    if($result->num_rows > 0) {
        $res = "[";
        while($row = $result->fetch_assoc()) {
            $r = $row['title'];
            if($r==""or$r==" "){
                $r = 'Brak nazwy';
            };
            $res=$res.'["Title: '.$r.' Pass: '.$row['code'].'; PID: '.$row['pid'].'","'.$row['pid'].'"],';
        };
        $res=$res."]";
        echo($res);
    } else {
        echo('^Invalid Data!');
    };
    $conn->close();
?>