<?php
@session_start();
if(!isset($db)){
    include_once('dbclass.php');
    $db = new Database(DB_SERVER,DB_USER,DB_PASS,DB_DATABASE);
}
if(isset($_SESSION['uid'])){
	$uid=$_SESSION['uid'];
	$query = $db->queryAll("SELECT * FROM teachers where id='$uid'");
	if ($query) {
	    foreach ($query as $row) {
			$id = $row['id'];
			$email = $row['email'];
			$uname = $row['uname'];
		}
	}
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" type="image/x-icon" href="images/favicon.png">
	<link rel="stylesheet" type="text/css" href="css/styles.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
	<script type="text/javascript" src='./js/main.js?v1.1'></script>
	<title>TailWebs Project</title>
</head>
<body>
<header>
	<div class='twheaddiv'>
		<a href="index.php">
			<h2 class="twhead">Tailwebs.</h2>
		</a>
	</div>
	<?php
	if(isset($_SESSION['uid'])){
	?>
	<div class='logoutdiv'>
		<div class='profdiv'>
		<span> Welcome <?php echo "$uname"; ?></span>
		</div>
		<a href="logout.php">
			<span class="lthead">Logout</span>
		</a>
	</div>
	<?php
	}
	?>
 </header>