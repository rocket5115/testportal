<?php
    if(!isset($_COOKIE['username'])or!isset($_COOKIE['password'])or!isset($_COOKIE['pid'])){
        die('^Invalid Data!');
    };
    $conn = new mysqli("localhost", "root", "", "testportal");
    if ($conn->connect_error) {
        die("^Connection failed: " . $conn->connect_error);
    };
    $result = $conn->query('SELECT uid FROM users WHERE username="'.$_COOKIE['username'].'" AND password="'.$_COOKIE['password'].'"');
    if($result->num_rows<1){
        die('^You must be logged in!');
    };
    $result=$conn->query('SELECT data FROM answers WHERE code="'.$_COOKIE['pid'].'"');
    if($result->num_rows > 0) {
        $res = "[";
        while($row = $result->fetch_assoc()) {
            $res=$res.'"'.$row['data'].'",';
        };
        $res=$res."]";
        echo($res);
    } else {
        echo('^Invalid Data!');
    };
    $conn->close();
?>
