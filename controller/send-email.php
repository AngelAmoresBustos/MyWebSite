<?php
  if($_SERVER['REQUEST_METHOD'] == 'POST'){
    include_once("app/conexion.php");
    $customerName = mysqli_real_escape_string($conexion,$_POST["name"]);
    $customerEmail = mysqli_real_escape_string($conexion,$_POST["email"]);
    $customerMsg = mysqli_real_escape_string($conexion,$_POST["message"]);
    $kbcra  = 'MIME-Version: 1.0' . "\r\n";
    $kbcra .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $kbcra .= 'From: ' . $customerName . '<' . $customerEmail . '>';
    mail("yo@angelamores.com", "Queremos mas información de sus servicios/productos", $customerMsg, $kbcra);
  }
?>