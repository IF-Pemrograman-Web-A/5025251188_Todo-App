<main id="konten" tabindex="-1">

  <h1><?php echo $judulhalaman; ?></h1>

  <section class="formbaru">
    <h2>Tambah Tugas Baru</h2>
    <form method="post" action="tambah.php" id="formtugas">
      <input type="hidden" name="jenis" value="<?php echo $jenis; ?>">
      <input type="hidden" name="foto" id="foto" value="">

      <div class="baris">
        <div>
          <label for="judul">Judul</label>
          <input type="text" id="judul" name="judul" placeholder="mau ngapain hari ini?">
        </div>
        <div>
          <label for="kategori">Kategori</label>
          <select id="kategori" name="kategori">
            <option>Kampus</option>
            <option>Bisnis</option>
            <option>Pribadi</option>
          </select>
        </div>
      </div>

      <div class="baris">
        <div>
          <label for="tgl">Tanggal</label>
          <input type="date" id="tgl" name="tanggal">
        </div>
        <div>
          <label for="prioritas">Prioritas</label>
          <select id="prioritas" name="prioritas">
            <option>Rendah</option>
            <option>Sedang</option>
            <option>Tinggi</option>
          </select>
        </div>
      </div>

      <label for="jam">Waktu pengingat</label>
      <input type="time" id="jam" name="jam">

      <label for="ket">Keterangan</label>
      <textarea id="ket" name="ket" rows="2" placeholder="catatan kalo ada"></textarea>

      <div class="kamera">
        <h3>Foto tugas</h3>
        <p class="bantuan">Nyalakan kamera dulu, habis itu tekan Ambil Foto.</p>
        <video id="videokamera"></video>
        <canvas id="kanvas"></canvas>
        <img id="pratinjau" alt="Pratinjau foto tugas yang sudah diambil">
        <div class="tombol">
          <button type="button" id="nyalakan" class="aksibtn">Nyalakan Kamera</button>
          <button type="button" id="jepret" class="aksibtn">Ambil Foto</button>
          <button type="button" id="buangfoto" class="aksibtn buang">Hapus Foto</button>
        </div>
      </div>

      <button type="submit" id="tambah">+ Tambah Tugas</button>
    </form>
  </section>

  <h2>Belum Selesai</h2>
  <ul class="daftar">
    <?php
    $sql = "SELECT * FROM tugas WHERE jenis='$jenis' AND selesai=0";
    $hasil = $conn->query($sql);

    if ($hasil->num_rows > 0) {
      while ($baris = $hasil->fetch_assoc()) {
        include "kartu.php";
      }
    } else {
      echo "<li class='kosong'>Belum ada tugas di sini</li>";
    }
    ?>
  </ul>

  <h2>Sudah Selesai</h2>
  <ul class="daftar selesai">
    <?php
    $sql = "SELECT * FROM tugas WHERE jenis='$jenis' AND selesai=1";
    $hasil = $conn->query($sql);

    if ($hasil->num_rows > 0) {
      while ($baris = $hasil->fetch_assoc()) {
        include "kartu.php";
      }
    } else {
      echo "<li class='kosong'>Belum ada yang selesai</li>";
    }
    ?>
  </ul>

</main>
