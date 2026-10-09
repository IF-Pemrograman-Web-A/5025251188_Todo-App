<div class="kotak">
  <form method="post" action="ubah.php">
    <input type="hidden" name="id" value="<?php echo $idedit; ?>">
    <input type="hidden" name="jenis" value="<?php echo $jenis; ?>">

    <label for="j2">Judul</label>
    <input type="text" id="j2" name="judul" value="<?php echo $isijudul; ?>" placeholder="pilih Edit di salah satu tugas">

    <label for="status">Status</label>
    <select id="status" name="status">
      <?php
      if ($isistatus == "Selesai") {
        echo "<option>Belum dikerjakan</option>";
        echo "<option selected>Selesai</option>";
      } else {
        echo "<option selected>Belum dikerjakan</option>";
        echo "<option>Selesai</option>";
      }
      ?>
    </select>

    <label for="dl">Deadline</label>
    <input type="date" id="dl" name="tanggal" value="<?php echo $isitanggal; ?>">

    <label for="jam2">Waktu pengingat</label>
    <input type="time" id="jam2" name="jam" value="<?php echo $isijam; ?>">

    <label for="ket2">Keterangan</label>
    <textarea id="ket2" name="ket" rows="4"><?php echo $isiket; ?></textarea>

    <div class="tombol">
      <button type="submit" id="simpan">Simpan</button>
      <?php echo "<a class='aksibtn buang' href='hapus.php?id=$idedit&jenis=$jenis'>Hapus</a>"; ?>
    </div>
  </form>
</div>
