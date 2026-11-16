<main id="konten" tabindex="-1">

  <h1><?php echo $judulhalaman; ?></h1>

  <section class="formbaru">
    <h2>Tambah Tugas Baru</h2>
    <form id="formtugas">
      <input type="hidden" id="jenis" value="<?php echo $jenis; ?>">
      <input type="hidden" id="foto" value="">

      <div class="baris">
        <div>
          <label for="judul">Judul</label>
          <input type="text" id="judul" placeholder="mau ngapain hari ini?">
        </div>
        <div>
          <label for="kategori">Kategori</label>
          <select id="kategori">
            <option>Kampus</option>
            <option>Bisnis</option>
            <option>Pribadi</option>
          </select>
        </div>
      </div>

      <div class="baris">
        <div>
          <label for="tgl">Tanggal</label>
          <input type="date" id="tgl">
        </div>
        <div>
          <label for="prioritas">Prioritas</label>
          <select id="prioritas">
            <option>Rendah</option>
            <option>Sedang</option>
            <option>Tinggi</option>
          </select>
        </div>
      </div>

      <label for="jam">Waktu pengingat</label>
      <input type="time" id="jam">

      <label for="ket">Keterangan</label>
      <textarea id="ket" rows="2" placeholder="catatan kalo ada"></textarea>

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
  <ul class="daftar" id="belum"></ul>

  <h2>Sudah Selesai</h2>
  <ul class="daftar selesai" id="sudah"></ul>

</main>
