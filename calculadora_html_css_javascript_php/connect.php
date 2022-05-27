<?php

//result MATH to put on DATABASE
$receiveOperation = filter_input(INPUT_POST, 'historyDisplay');

//DATABASE settings
$host = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "calchist";

//Create connection
$conn = new mysqli ($host, $dbusername, $dbpassword, $dbname);

if (mysqli_connect_error())
{
    die('Connect Error ('. mysqli_connect_errno() .') '
    . mysqli_connect_error());
}else{
    $sql = "INSERT INTO contas (operacao)
    values ('$receiveOperation')";
    
    if ($conn->query($sql)){
        echo "sucess";
}else{
    echo "Error: ". $sql ."
    ". $conn->error;
}

    //Close connection
    $conn->close();
}

?>