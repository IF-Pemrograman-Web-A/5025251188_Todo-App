<div class="kotak">
  <form id="formdetail">
    <input type="hidden" id="idedit" value="0">

    <label for="j2">Judul</label>
    <input type="text" id="j2" placeholder="pilih Edit di salah satu tugas">

    <label for="status">Status</label>
    <select id="status">
      <option>Belum dikerjakan</option>
      <option>Selesai</option>
    </select>

    <label for="dl">Deadline</label>
    <input type="date" id="dl">

    <label for="jam2">Waktu pengingat</label>
    <input type="time" id="jam2">

    <label for="ket2">Keterangan</label>
    <textarea id="ket2" rows="4"></textarea>

    <div class="tombol">
      <button type="submit" id="simpan">Simpan</button>
      <button type="button" id="hapusdetail" class="aksibtn buang">Hapus</button>
    </div>
  </form>
</div>
