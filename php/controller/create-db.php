<?php

require_once (__DIR__ . "/../model/config.php");




$query = $_SESSION["connection"]->query("CREATE TABLE posts("
        . "id int(11) NOT NULL AUTO_INCREMENT,"
        . "title varchar (225) NOT NULL,"
        . "post text NOT NULL,"
        . "PRIMARY KEY (id))");

if ($query) {
    echo "<p>Succesfully create table posts</p>";
} else {
    echo"<p>" . $_SESSION["connection"]->error ."</P>";
}

$query =  $_SESSION["connection"]->query("CREATE TABLE users("
        . "id int(11) NOT NULL AUTO_INCREMENT,"
        . "username varchar(30) NOT NULL,"
        . "email varchar(50)NOT NULL,"
        . "password char(128)NOT NULL,"
        . "salt char(128)NOT NULL,"
        . "PRIMARY KEY (id))");
if($query){
    echo "<p>Successfully created table: users</p>";
}
else{
    echo "<p>".$_SESSION["connection"]->error."</p>";
    
}




