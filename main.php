<?php
    function IsPostSet($arr) {
        foreach ($arr as $key) {
            if (!isset($_POST[$key])) {
                return false;
            }
        }
        return true;
    }

    function IsCookieSet($arr) {
        foreach ($arr as $key) {
            if (!isset($_COOKIE[$key])) {
                return false;
            }
        }
        return true;
    }

    function IsEmailCorrect($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

    function CreateUID($pp="XX",$ee="XX",$length=20) {
        $result = $pp;
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()-_+=';
        $charLength = strlen($characters);
        for($i = 0; $i < $length-4; $i++) {
            $result .= $characters[rand(0,$charLength - 1)];
        }
        return $result . $ee;
    }

    function CreateFreeUID($length=20) {
        $result = CreateUID(null, null, $length+4);
        return substr($result, 2, strlen($result)-4);
    }
?>
