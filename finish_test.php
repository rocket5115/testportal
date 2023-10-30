<?php
    if(!isset($_COOKIE['code'])or!isset($_COOKIE['answers'])or!isset($_COOKIE['data'])){
        die('^Invalid Data!');
    };
    $conn = new mysqli("localhost", "root", "", "testportal");
    if ($conn->connect_error) {
        die("^Connection failed: " . $conn->connect_error);
    };
    $result = $conn->query('SELECT id FROM answers WHERE code="'.$_COOKIE['code'].'" AND data="'.$_COOKIE['data'].'"');
    if($result->num_rows>0){
        echo('^Invalid User!');
    } else {
        $conn->query('INSERT INTO answers (code,answers,data) VALUES ("'.$_COOKIE['code'].'","'.$_COOKIE['answers'].'","'.$_COOKIE['data'].'")');
        echo("Success!");
    };
    $conn->close();
?>