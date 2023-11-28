<?php
    // import general functions script
    require "main.php";
    // Check for user credentials
    if(!IsCookieSet(["username","password"]))){
        die('^Invalid Data!');
    };
    // start connection to DB
    $conn = new mysqli("localhost", "root", "", "testportal");
    if ($conn->connect_error) {
        die("^Connection failed");
    };
    // Check if user is exists and retrieve uid
    $result = $conn->query('SELECT uid FROM users WHERE username="'.$_COOKIE['username'].'" AND password="'.$_COOKIE['password'].'"');
    $uid;
    if($result->num_rows>0){
        $uid=$result->fetch_assoc()['uid'];
    } else {
        die('^You must be logged in!');
    };
    // select title, enter code and test id from `exports` where all user tests are held
    $result=$conn->query('SELECT title,code,pid FROM exports WHERE uid="'.$uid.'"');
    // return data using JSON-like data
    if($result->num_rows > 0) {
        $res = "[";
        while($row = $result->fetch_assoc()) {
            $r = $row['title'];
            if($r==""or$r==" "){
                $r = 'Brak nazwy';
            };
            // eg. ["Title: test Pass: 0000; PID: xxxx,xxxx"]. Where pid is x2 for client-side checks
            $res=$res.'["Title: '.$r.' Pass: '.$row['code'].'; PID: '.$row['pid'].'","'.$row['pid'].'"],';
        };
        //end the format
        $res=$res."]";
        echo($res);
    } else {
        echo('^Invalid Data!');
    };
    //end DB connection
    $conn->close();
?>
