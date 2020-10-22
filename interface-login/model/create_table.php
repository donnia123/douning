<?php
require('./_connect.php');

//书写sql语句

$sql = "CREATE TABLE user (
			id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
			uname VARCHAR(300) NOT NULL,
			upass VARCHAR(30) NOT NULL
)";
$result = mysqli_query($conn,$sql);
if($result){
	echo "数据表创建成功";
}else{
	echo "数据表创建失败";
}

?>