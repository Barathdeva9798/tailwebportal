<?php
session_start();
$_SESSION = array();
session_destroy();
$cookieParams = session_get_cookie_params();
setcookie(session_name(), '', time() - 86400, $cookieParams['path'], $cookieParams['domain'], $cookieParams['secure'], $cookieParams['httponly']);
header("Location: login.php");
exit();
?>
