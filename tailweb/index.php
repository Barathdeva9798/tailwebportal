<?php
@session_start();
if(!isset($_SESSION['uid'])){
	header("Location:login.php");
	exit();
}
include "header.php";
?>
<main>
	<div class="container">
		<div class="logo-container-index">
	        <img src="./images/mylogo.png" alt="Company Logo" class="logo">
	    </div>
	    <h3>Teacher Portal</h3>
	    <button class='addbtn' onclick="add()">Add</button>
	    <table id="stutable"></table>
	</div>

	<!-- Popup -->
	<div id="popup" class="popup">
	    <div class="popup-content centered">
	        <span class="close" onclick="closePopup()">&times;</span>
	        <h2 class='addedithead' id='addedithead'>Add Student Details</h2>
	        <div class='addeditform'>
	        	<div class='input-group'>
		            <label for="stuname">Student Name</label>
		            <input type="text" id="stuname">
		            <span class='inpico'><img class='icosum' src="./images/profile.png"/></span>
	            </div>
	            <div class='input-group'>
		            <label for="subname">Subject Name</label>
		            <input type="text" id="subname">
		             <span class='inpico'><img class='icosum' src="./images/book.png"/></span>
	            </div>
	            <div class='input-group'>
		            <label for="mark">Marks</label>
		            <input type="text" id="mark" oninput="isnumb()">
		             <span class='inpico'><img class='icosum' src="./images/mark.png"/></span>
		        </div>
		        <div class='perrdis' id='perrdis'></div>
	            <div id='esbtns' class='addbtndiv'>
	            	<button  class='addbtn' type="button" onclick='manageStudents("add")'>Add</button>
	            </div>
	        </div>
	    </div>
	</div>
</main>
<script type="text/javascript">
	getDetails();
</script>
<?php
include "footer.php";
?>