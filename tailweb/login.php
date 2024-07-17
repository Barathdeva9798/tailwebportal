<?php
include "header.php";
if(isset($_SESSION['uid'])){
	header("Location:index.php");
	exit();
}
?>
<main>
	<div class="login-container centered">
	    <div class="logo-container">
	        <img src="./images/mylogo.png" alt="Company Logo" class="logo">
	    </div>
	    <div class="login-form">
	        <div class="input-group">
	        	<label for="uemail">User ID</label>
	            <input id='uemail' type="email">
	            <span class='inpico'><img class='icosum' src="./images/profile.png"/></span>
	        </div>
	        <div class="input-group">
	        	<label for="password">Password</label>
	            <input id='pass' class='inppass' type="password">
	            <span class='inpico'><img class='icosum' src="./images/lock.png"/></span>
	            <span id='inpicopassword' class='inpicopassword' onclick='showpass()'><img class='icosumpass' src="./images/hidden.png"/></span>
	        </div>
	        <span id='errordisp' class='errordisp'></span>
	        <button type="button" class="login-button" onclick='login()'>Login</button>
	    </div>
	</div>
</main>
<?php
include "footer.php";
?>