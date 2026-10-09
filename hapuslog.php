<?php
include "config.php";

if (file_exists($filelog)) {
  unlink($filelog);
  echo "<p>Catatan aktivitas berhasil dihapus.</p>";
} else {
  echo "<p>Catatan aktivitas memang belum ada.</p>";
}

echo "<a href='index.php'>Kembali ke daftar Personal</a>";

$conn->close();
?>
