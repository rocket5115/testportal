<?php
    if(!isset($_COOKIE['username'])or!isset($_COOKIE['password'])){
        die('You must be logged in!');
    };
    $conn = new mysqli("localhost", "root", "", "testportal");
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    };
    $result = $conn->query('SELECT projekty.title AS prTitle FROM projekty INNER JOIN users ON projekty.uid=users.uid WHERE users.username="'.$_COOKIE['username'].'" AND users.password="'.$_COOKIE['password'].'" GROUP BY projekty.title ORDER BY LENGTH(projekty.data) DESC');
    if ($result->num_rows > 0) {
        $res = "[";
        while($row = $result->fetch_assoc()) {
            $r = $row['prTitle'];
            if($r==""or$r==" "){
                $r = 'Brak nazwy';
            };
            $res=$res.'"'.$r.'",';
        };
        $res=$res."]";
        echo($res);
        $conn->close();
    } else {
        $conn->close();
        die('Brak rekordów');
    };
?>