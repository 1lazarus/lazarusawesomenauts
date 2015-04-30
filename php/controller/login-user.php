<nav>
    <ul>
        
        
        <a class="blogPost" href="<?php echo $path . "/index.php"; ?>">Main Page</a>
        
          <a class="blogPost" href="<?php echo $path . "/post.php"; ?>">Post Blog Form</a>
            <a class="blogPost" href="<?php echo $path . "/login.php"; ?>">Sign in</a>
          
        
    </ul>
</nav>

<?php
require_once (__DIR__ ."/../model/config.php");

$username = filter_input(INPUT_POST,"username",FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST,"password",FILTER_SANITIZE_STRING);

$query = $_SESSION["connection"]->query("SELECT salt,password FROM users WHERE username = '$username'");

 
if($query->num_rows == 1){
    $row = $query->fetch_array();
    
    if($row["password"] ===crypt ($password,$row["salt"])){
         $_SESSION["authenticate"]  = true;
        echo "<p>Login Successful!</p>";
        
         
    }
    else{
        echo "<p>Invalid usename and password1</p>";
    }
}
 else {
    echo "<p> Ivalid username and password2</p>";
}
