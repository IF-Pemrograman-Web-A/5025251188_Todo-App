<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-API-Key");

$metode = $_SERVER['REQUEST_METHOD'];

if ($metode === "OPTIONS") {
  http_response_code(204);
  exit;
}

$alamat = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$pecah = explode("/api/", $alamat);
$sisa = trim($pecah[1] ?? "", "/");
$bagian = explode("/", $sisa);

$versi = $bagian[0] ?? "";
$sumber = $bagian[1] ?? "";
$pilihan = $bagian[2] ?? "";

if ($versi !== "v1") {
  http_response_code(404);
  echo json_encode(["error" => "Versi API tidak ditemukan"]);
  exit;
}

require "db.php";
require "auth.php";

try {
  if ($sumber === "todos") {
    require "todos.php";
    exit;
  }
} catch (PDOException $error) {
  http_response_code(500);
  echo json_encode(["error" => "Database sedang bermasalah"]);
  exit;
}

http_response_code(404);
echo json_encode(["error" => "Endpoint tidak ditemukan"]);
?>
