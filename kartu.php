<li>
  <?php
  if ($baris["selesai"] == 0) {
    echo "<a class='centang' href='selesai.php?id=" . $baris["id"] . "&nilai=1&jenis=$jenis' aria-label='Tandai selesai untuk " . $baris["judul"] . "'>&#9633;</a>";
  } else {
    echo "<a class='centang' href='selesai.php?id=" . $baris["id"] . "&nilai=0&jenis=$jenis' aria-label='Batalkan selesai untuk " . $baris["judul"] . "'>&#9745;</a>";
  }
  ?>

  <div class="teks">
    <?php
    $kelaskategori = "kategori";
    if ($baris["kategori"] == "Bisnis") {
      $kelaskategori = "kategori bisnis";
    }
    if ($baris["kategori"] == "Pribadi") {
      $kelaskategori = "kategori pribadi";
    }
    ?>
    <span class="<?php echo $kelaskategori; ?>"><?php echo $baris["kategori"]; ?></span>
    <b><?php echo $baris["judul"]; ?></b>
    <p><?php echo $baris["ket"]; ?></p>

    <?php
    if ($baris["foto"] != "") {
      echo "<img class='fototugas' src='" . $baris["foto"] . "' alt='Foto tugas " . $baris["judul"] . "'>";
    }
    ?>

    <div class="chipbaris">
      <?php
      if ($baris["tanggal"] == "") {
        echo "<span class='chip'>Tanpa tanggal</span>";
      } else {
        echo "<span class='chip'>" . $baris["tanggal"] . "</span>";
      }

      if ($baris["jam"] == "") {
        echo "<span class='chip'>Tanpa pengingat</span>";
      } else {
        echo "<span class='chip'>Ingatkan " . $baris["jam"] . "</span>";
      }
      ?>
      <?php
      $kelasprioritas = "chip";
      if ($baris["prioritas"] == "Tinggi") {
        $kelasprioritas = "chip tinggi";
      }
      if ($baris["prioritas"] == "Sedang") {
        $kelasprioritas = "chip sedang";
      }
      if ($baris["prioritas"] == "Rendah") {
        $kelasprioritas = "chip rendah";
      }
      ?>
      <span class="<?php echo $kelasprioritas; ?>"><?php echo $baris["prioritas"]; ?></span>
    </div>
  </div>

  <div class="aksi">
    <a class="aksibtn" href="edit.php?id=<?php echo $baris["id"]; ?>" aria-label="Edit tugas <?php echo $baris["judul"]; ?>">Edit</a>
    <a class="aksibtn buang" href="hapus.php?id=<?php echo $baris["id"]; ?>&jenis=<?php echo $jenis; ?>" aria-label="Hapus tugas <?php echo $baris["judul"]; ?>">Hapus</a>
  </div>
</li>
