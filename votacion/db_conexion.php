<?php
// db_connection.php

$host = "database-2.ch0ay6w4kcbb.us-east-1.rds.amazonaws.com";  // Dirección de tu RDS en la nube
$dbname = "urnaelectroral";  // Nombre de la base de datos en la nube
$username = "admin";  // Usuario de la base de datos en la nube
$password = "Hereiva12";  // Contraseña de la base de datos en la nube

try {
    // Crear conexión con la base de datos en la nube
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexión exitosa a la base de datos en la nube!";
} catch (PDOException $e) {
    echo "Conexión fallida: " . $e->getMessage();
}
?>
