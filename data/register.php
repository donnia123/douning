<?php

include 'base.php';

$uname = $_POST['username'];
$upass = $_POST['password'];
$conn = mysqli_connect('localhost','root','root','shop');

$sql = "INSERT INTO `user` VALUES (null,'$uname','$upass')";
$res = mysqli_query($conn,$sql);
mysqli_close($conn);



if($res){
    header('location:../baoxue-login.html');
}else{
    echo "服务器错误";
}

?>