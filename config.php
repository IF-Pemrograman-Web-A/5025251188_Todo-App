<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tododb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Koneksi gagal: " . $conn->connect_error);
}

$filelog = "log.txt";

function tulislog() {
  global $filelog;
  global $pesanlog;

  $isi = "";
  if (file_exists($filelog)) {
    $isi = file_get_contents($filelog);
  }

  $isi .= $pesanlog . "\n";
  file_put_contents($filelog, $isi);
}
?>
