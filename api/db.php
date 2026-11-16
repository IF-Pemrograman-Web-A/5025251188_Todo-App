<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tododb";

try {
  $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $error) {
  http_response_code(500);
  echo json_encode(["error" => "Database tidak bisa dihubungi"]);
  exit;
}
?>
