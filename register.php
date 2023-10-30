
<?php
    function CheckPassword($pwd) {
        if (strlen($pwd) < 8 or !preg_match("#[0-9]+#", $pwd)or !preg_match("#[a-zA-Z]+#", $pwd)) {
            return false;
        };
        return true;
    };
    function CreateNewUID($us,$pw) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomString = '';
    
        for ($i = 0; $i < 6; $i++) {
            $index = rand(0, strlen($characters) - 1);
            $randomString .= $characters[$index];
        }
        return $us[0].$us[1].$randomString.$pw[strlen($pw)-2].$pw[strlen($pw)-3];
    };
    function IsValid($str,$pass) {
        if(!$pass and strlen($str)<5 || $pass and strlen($str)<8){
            return false;
        };
        if($pass) {
            return CheckPassword($str);
        } else {
            $conn = new mysqli("localhost", "root", "", "testportal");
            if ($conn->connect_error) {
                die('failed Error Connecting to Server');
            };
            $result = $conn->query('SELECT uid FROM users WHERE username="'.$str.'"');
            $conn->close();
            if ($result->num_rows > 0) {
                return false;
            } else {
                return true;
            };
        };
    };
    if(isset($_COOKIE['name'])and isset($_COOKIE['password']) and isset($_COOKIE['cpassword'])){
        if($_COOKIE['name']==""or $_COOKIE['password']==""or $_COOKIE['password']=="" or $_COOKIE['password']!=$_COOKIE['cpassword'] or !IsValid($_COOKIE['name'],false) or !IsValid($_COOKIE['password'],true)){
            $err = "";
            if (strlen($_COOKIE['password']) < 8) {
                $err=$err."Hasło jest zbyt krótkie! ";
            };
            if (!preg_match("#[0-9]+#", $_COOKIE['password'])) {
                $err=$err."Hasło musi zawierać jakąś liczbę! ";
            };
            if (!preg_match("#[a-zA-Z]+#", $_COOKIE['password'])) {
                $err=$err."Hasło musi zawierać jakąś literę! ";
            };
            if($_COOKIE['password']!=$_COOKIE['cpassword']) {
                $err=$err."Powtórzenie hasła nie jest takie same! ";
            };
            $conn = new mysqli("localhost", "root", "", "testportal");
            if ($conn->connect_error) {
                die('failed Error Connecting to Server');
            };
            $result = $conn->query('SELECT uid FROM users WHERE username="'.$_COOKIE['name'].'"');
            if ($result->num_rows > 0) {
                $err=$err."Nazwa jest już zajęta! ";
            };
            if(strlen($_COOKIE['name'])<8) {
                $err=$err."Nazwa jest zakrótka!";
            };
            $conn->close();
            echo("failed ".$err);
        } else {
            $conn = new mysqli("localhost", "root", "", "testportal");
            if ($conn->connect_error) {
                die('failed Error Connecting to Server');
            };
            $conn->query('INSERT INTO users (username,password,uid) VALUES ("'.$_COOKIE['name'].'","'.$_COOKIE['password'].'","'.CreateNewUID($_COOKIE['name'],$_COOKIE['password']).'")');
            echo($_COOKIE['name']);
            $conn->close();
        };
    } else {
        echo("failed Złe dane!".$_COOKIE['name']." ".$_COOKIE['password']." ".$_COOKIE['cpassword']);
    };
?>