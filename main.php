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
?>
