<?php
include "config.php";

$id = $_GET['id'];

$sql = "SELECT * FROM tugas WHERE id=$id";
$hasil = $conn->query($sql);
$baris = $hasil->fetch_assoc();

$jenis = $baris["jenis"];
$idedit = $baris["id"];
$isijudul = $baris["judul"];
$isitanggal = $baris["tanggal"];
$isijam = $baris["jam"];
$isiket = $baris["ket"];

if ($baris["selesai"] == 1) {
  $isistatus = "Selesai";
} else {
  $isistatus = "Belum dikerjakan";
}

if ($jenis == "shared") {
  $judulhalaman = "Daftar Tugas Shared";
} else {
  $judulhalaman = "Daftar Tugas Personal";
}

include "kerangka.php";
?>
