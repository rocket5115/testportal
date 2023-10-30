<?php
    if((isset($_POST['name']) and isset($_POST['password']))or(isset($_COOKIE['name']) and isset($_COOKIE['password']))){
        $un;
        $pw;
        if(isset($_POST['name']) and $_POST['password']){
            $un = $_POST['name'];
            $pw = $_POST['password'];
        } else {
            $un = $_COOKIE['name'];
            $pw = $_COOKIE['password'];
        };
        $conn = new mysqli("localhost", "root", "", "testportal");
        if ($conn->connect_error) {
            die("failed Connection failed: " . $conn->connect_error);
        };
        $result = $conn->query('SELECT uid FROM users WHERE username="'.$un.'" AND password="'.$pw.'"');
        if ($result->num_rows > 0) {
            echo($un);
        } else {
            echo("failed Nie znaleziono konta!");
        };
        $conn->close();
    } else {
        echo("failed Złe dane!");
    };
?>