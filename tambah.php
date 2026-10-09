<?php
include "config.php";

$judul = $_POST['judul'];
$kategori = $_POST['kategori'];
$tanggal = $_POST['tanggal'];
$jam = $_POST['jam'];
$prioritas = $_POST['prioritas'];
$ket = $_POST['ket'];
$foto = $_POST['foto'];
$jenis = $_POST['jenis'];

$sql = "INSERT INTO tugas (judul, kategori, tanggal, jam, prioritas, ket, foto, selesai, jenis) VALUES ('$judul', '$kategori', '$tanggal', '$jam', '$prioritas', '$ket', '$foto', 0, '$jenis')";

if ($conn->query($sql) === TRUE) {
  $pesanlog = "Tambah tugas: $judul ($jenis)";
  tulislog();
  echo "<p>Tugas berhasil ditambahkan.</p>";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

if ($jenis == "shared") {
  echo "<a href='shared.php'>Kembali ke daftar Shared</a>";
} else {
  echo "<a href='index.php'>Kembali ke daftar Personal</a>";
}

$conn->close();
?>
