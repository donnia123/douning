<?php


include './base.php';

$uname = $_GET['username'];
$upass = $_GET['password'];

$conn = mysqli_connect('localhost','root','root','shop');
$sql = "SELECT * FROM `user` WHERE `uname`='$uname' AND `upass`='$upass'";
$res = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($res);
print_r($row);
mysqli_close($conn);
if($row){    
    header('location:../baoxue-index.html');
}else{
    echo "用户名或密码错误!";
}




?>