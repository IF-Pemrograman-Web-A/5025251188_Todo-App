<?php
include "config.php";

$id = $_GET['id'];
$jenis = $_GET['jenis'];

if ($id == 0) {
  echo "<p>Pilih Edit di salah satu tugas dulu.</p>";
} else {
  $sql = "DELETE FROM tugas WHERE id=$id";

  if ($conn->query($sql) === TRUE) {
    $pesanlog = "Hapus tugas nomor $id ($jenis)";
    tulislog();
    echo "<p>Tugas berhasil dihapus.</p>";
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
