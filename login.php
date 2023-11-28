<?php
    require "main.php";
    if(IsPostSet(["name", "password"]) or IsCookieSet(["name","password"])){
        //initialize two variables
        $username;
        $password;
        if(isset($_POST['name'])){ // Check only one value since the other one has to be present
            $username = $_POST['name'];
            $password = $_POST['password'];
        } else {
            $username = $_COOKIE['name'];
            $password = $_COOKIE['password'];
        };
        $conn = new mysqli("localhost", "root", "", "testportal");
        if ($conn->connect_error) {
            // Don't give any unimportant information to user
            die("failed Nie znaleziono konta!");
        };
        $result = $conn->query('SELECT uid FROM users WHERE username="'.$username.'" AND password="'.$password.'"');
        if ($result->num_rows > 0) {
            echo($username);
        } else {
            echo("failed Nie znaleziono konta!");
        };
        $conn->close();
    } else {
        echo("failed Złe dane!");
    };
?>
