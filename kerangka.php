<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MYTODO - <?php echo $judulhalaman; ?></title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<a href="#konten" class="lewati">Lewati ke konten utama</a>

<header>
  <div class="merek">
    <div class="logo" aria-hidden="true">&check;</div>
    <span class="namaapp">MYTODO</span>
  </div>

  <nav aria-label="Menu utama">
    <a href="#">Dashboard</a>
    <a href="#">Semua Tugas</a>
    <a href="#" class="aktif">Hari Ini</a>
    <a href="#">Mendatang</a>
    <a href="#">Kategori</a>
  </nav>

  <span class="identitas">Halo, Mas Valdi</span>
  <button type="button" id="tomboltema" class="tematoggle">Mode Gelap</button>
</header>

<p id="pesan" class="pesan" role="status">Selamat datang, tugas hari ini sudah dimuat.</p>

<div class="isi">

  <?php include "menu-bar.php"; ?>

  <?php include "content.php"; ?>

  <aside aria-labelledby="juduldetail">
    <h2 id="juduldetail">Detail Tugas</h2>

    <?php include "detail.php"; ?>

    <div class="kotak ringkasan">
      <h3>Ringkasan</h3>
      <div class="angka">
        <?php
        $sql = "SELECT * FROM tugas WHERE jenis='$jenis'";
        $hasil = $conn->query($sql);
        $total = $hasil->num_rows;

        $sql = "SELECT * FROM tugas WHERE jenis='$jenis' AND selesai=1";
        $hasil = $conn->query($sql);
        $beres = $hasil->num_rows;

        $belum = $total - $beres;
        ?>
        <div>
          <span class="besar"><?php echo $total; ?></span>
          <span class="kecil">Total</span>
        </div>
        <div>
          <span class="besar"><?php echo $beres; ?></span>
          <span class="kecil">Selesai</span>
        </div>
        <div>
          <span class="besar"><?php echo $belum; ?></span>
          <span class="kecil">Belum</span>
        </div>
      </div>
    </div>

    <div class="kotak">
      <h3>Notifikasi</h3>
      <p class="bantuan">Izinkan notifikasi supaya dapat pengingat tiap nambah tugas.</p>
      <button type="button" id="izinnotif" class="aksibtn">Izinkan Notifikasi</button>
    </div>

  </aside>

</div>

<footer>
  <p>Pemrograman Web A</p>
</footer>

<script src="script.js"></script>

</body>
</html>
<?php $conn->close(); ?>
