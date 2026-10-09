<?php
include "config.php";

$id = $_POST['id'];
$judul = $_POST['judul'];
$tanggal = $_POST['tanggal'];
$jam = $_POST['jam'];
$ket = $_POST['ket'];
$status = $_POST['status'];
$jenis = $_POST['jenis'];

if ($id == 0) {
  echo "<p>Pilih Edit di salah satu tugas dulu.</p>";
} else {
  $selesai = 0;
  if ($status == "Selesai") {
    $selesai = 1;
  }

  $sql = "UPDATE tugas SET judul='$judul', tanggal='$tanggal', jam='$jam', ket='$ket', selesai=$selesai WHERE id=$id";

  if ($conn->query($sql) === TRUE) {
    $pesanlog = "Edit tugas: $judul ($jenis)";
    tulislog();
    echo "<p>Perubahan berhasil disimpan.</p>";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

if ($jenis == "shared") {
  echo "<a href='shared.php'>Kembali ke daftar Shared</a>";
} else {
  echo "<a href='index.php'>Kembali ke daftar Personal</a>";
}

$conn->close();
?>
