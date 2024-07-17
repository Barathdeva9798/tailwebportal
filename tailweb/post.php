<?php
@session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
if(!isset($db)){
    include_once('dbclass.php');
    $db = new Database(DB_SERVER,DB_USER,DB_PASS,DB_DATABASE);
}
$action=$_POST['action'];
if($action=="login"){
    $uemail=$_POST['uemail'];
    $pass=$_POST['pass'];
    $password=md5($pass);
    $mailcheck=$db->queryUniqueValue("teachers","id","email='$uemail'");
    if($mailcheck){
        $passcheck=$db->queryUniqueValue("teachers","id","email='$uemail' and pass='$password'");
        if($passcheck){
            $_SESSION['uid']=$passcheck;
            echo json_encode(['process' => "success", 'message' => 'Login successful,Redirecting...']);
        }else{
            echo json_encode(['process' => "failed", 'message' => 'Wrong Password']);
        }
    }else{
        echo json_encode(['process' => "noaccount", 'message' => 'No Account Found']);
    }
}else if($action=="allstudents"){
    $page=$_POST['page'];
    $query = $db->queryAll("SELECT * FROM students");
    if(count($query)>0){
        echo json_encode(['process' => "success", 'data' => $query]);
    }else{
        echo json_encode(['process' => "nodata"]);
    }
}else if($action=="add"){
    $sname=$_POST['name'];
    $subject=$_POST['subject'];
    $mark=$_POST['mark'];
    $checkexists=$db->queryAll("SELECT id from students where name='$sname' and subject='$subject'");
    if(count($checkexists)==0){
        $query = $db->runQuery("INSERT into students (name,subject,mark) values ('$sname','$subject','$mark')");
        if($query){
            echo json_encode(['process' => "success"]);
        }else{
            echo json_encode(['process' => "failed", 'reason' => "some error occurred"]);
        }
    }else{
        $eid=$checkexists[0]['id'];
        $query = $db->runQuery("UPDATE students set mark='$mark' where id='$eid'");
        if($query){
            echo json_encode(['process' => "success"]);
        }else{
            echo json_encode(['process' => "failed", 'reason' => "some error occurred"]);
        }
    }
}else if($action=="edit"){
    $sname=$_POST['name'];
    $subject=$_POST['subject'];
    $mark=$_POST['mark'];
    $sid=$_POST['sid'];
    $checkexists=$db->queryAll("SELECT id from students where name='$sname' and subject='$subject' and id!='$sid'");
    if(count($checkexists)>=1){
        $eid=$checkexists[0]['id'];
        $query = $db->runQuery("UPDATE students set mark='$mark' where id='$eid'");
        if($query){
            echo json_encode(['process' => "success"]);
        }else{
            echo json_encode(['process' => "failed", 'reason' => "some error occurred"]);
        }
    }else{
        $query = $db->runQuery("UPDATE students set name='$sname',subject='$subject',mark='$mark' where id='$sid'");
        if($query){
            echo json_encode(['process' => "success"]);
        }else{
            echo json_encode(['process' => "failed", 'reason' => "some error occurred"]);
        }
    }
}else if($action=="editanddelete"){
    $act=$_POST['act'];
    $sid=$_POST['sid'];
    if($act=="edit"){
        $query = $db->queryAll("SELECT * FROM students where id='$sid'");
        if(count($query)>0){
            echo json_encode(['process' => "success", 'data' => $query]);
        }else{
            echo json_encode(['process' => "nodata"]);
        }
    }else if($act=="remove"){
         $query = $db->runQuery("DELETE from students where id='$sid'");
         if($query){
            echo json_encode(['process' => "success"]);
        }else{
            echo json_encode(['process' => "failed"]);
        }
    }
}
?>
