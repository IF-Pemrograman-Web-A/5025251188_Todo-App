<?php
$kuncidikirim = $_SERVER['HTTP_X_API_KEY'] ?? "";

if ($kuncidikirim === "") {
  http_response_code(401);
  echo json_encode(["error" => "Header X-API-Key belum dikirim"]);
  exit;
}

$cek = $pdo->prepare("SELECT * FROM apikey WHERE kunci = ?");
$cek->execute([$kuncidikirim]);
$pemilik = $cek->fetch();

if (!$pemilik) {
  http_response_code(401);
  echo json_encode(["error" => "API key tidak dikenal"]);
  exit;
}
?>
