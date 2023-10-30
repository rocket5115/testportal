<?php
    if(!isset($_COOKIE['username'])or!isset($_COOKIE['password'])or!isset($_COOKIE['pid'])or!isset($_COOKIE['data'])){
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
    $result=$conn->query('SELECT answers.answers AS answ,exports.data as eDATA,exports.answers AS eANSW FROM answers JOIN exports ON answers.code=exports.pid WHERE answers.code="'.$_COOKIE['pid'].'" AND answers.data="'.$_COOKIE['data'].'"');
    if($result->num_rows > 0) {
        $row=$result->fetch_assoc();
        echo("['".$row['eDATA']."','".$row['answ']."','".$row['eANSW']."']");
    } else {
        echo('^Invalid Data!');
    };
    $conn->close();
?>