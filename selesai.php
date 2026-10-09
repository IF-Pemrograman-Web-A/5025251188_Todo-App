<?php
include "config.php";

$id = $_GET['id'];
$nilai = $_GET['nilai'];
$jenis = $_GET['jenis'];

$sql = "UPDATE tugas SET selesai=$nilai WHERE id=$id";

if ($conn->query($sql) === TRUE) {
  $pesanlog = "Ubah status tugas nomor $id jadi $nilai ($jenis)";
  tulislog();
  echo "<p>Status tugas berhasil diubah.</p>";
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
