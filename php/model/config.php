<?php
require_once (__DIR__."/database.php");
session_regenerate_id(true );
session_start();


$path = "/NewGame/php/";

$host = "localhost";
$username = "root";
$password = "root";
$database = "awesomenauts_db";

if(!isset($_SESSION["connection"])){
    echo 'set';
$connection = new Database($host,$username,$password,$database);

$_SESSION["connection"] = $connection;
}