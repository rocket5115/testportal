<?php
    $conn = new mysqli("localhost", "root", "", "testportal");
    $result = $conn->query('SELECT uid FROM users WHERE username="'.$_COOKIE['username'].'" AND password="'.$_COOKIE['password'].'"');
    $result=$conn->query('SELECT data FROM answers WHERE code="'.$_COOKIE['pid'].'"');
    $res = "[";
    while($row = $result->fetch_assoc()) {
        $res=$res.'"'.$row['data'].'",';
    };
    $res=$res."]";
    echo($res);
    $conn->close();
?>
