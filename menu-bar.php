<nav class="sidebar" aria-label="Menu daftar tugas">
  <h2>Daftar</h2>
  <ul>
    <li>
      <?php
      if ($jenis == "personal") {
        echo "<a href='index.php' class='menuaktif'>Personal</a>";
      } else {
        echo "<a href='index.php'>Personal</a>";
      }
      ?>
    </li>
    <li>
      <?php
      if ($jenis == "shared") {
        echo "<a href='shared.php' class='menuaktif'>Shared</a>";
      } else {
        echo "<a href='shared.php'>Shared</a>";
      }
      ?>
    </li>
  </ul>

  <h2>Catatan Aktivitas</h2>
  <pre class="logkotak"><?php
    if (file_exists($filelog)) {
      echo file_get_contents($filelog);
    } else {
      echo "Belum ada aktivitas.";
    }
  ?></pre>
  <a href="hapuslog.php" class="hapuslog">Bersihkan Catatan</a>
</nav>
