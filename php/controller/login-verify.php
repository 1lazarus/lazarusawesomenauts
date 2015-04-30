<?php

require_once (__DIR__."/../model/config.php");

function authenticateUsers(){
    if(!isset($_SESSION["authenticate"])){
        return false;
    }
 else {
        if ($_SESSION["authenticated"] != true){
            
        }  
        else {
            return true;  
        }
    }
}

