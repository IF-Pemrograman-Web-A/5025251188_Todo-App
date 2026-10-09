# 5025251188_Todo App

# Tugas E04

Nama : Novaldi Rayhan Asshiddiqi

NRP : 5025251188

Kelas : A

## Deskripsi

Lanjutan dari branch E03. Sebelumnya semua data tugas disimpan di browser lewat
IndexedDB, jadi tiap orang cuma bisa lihat tugasnya sendiri. Sekarang datanya dipindah
ke database MySQL dan diproses pakai PHP, jadi tugasnya bisa dipakai bareng-bareng satu
organisasi. Kode HTML-nya juga dipecah jadi beberapa file PHP biar nggak numpuk di satu
file, dan ditambah menu Personal sama Shared di sebelah kiri.

File yang ada:

- index.php (halaman Personal)
- shared.php (halaman Shared)
- kerangka.php (rangka halaman, dipakai dua-duanya)
- menu-bar.php (side bar Personal/Shared + catatan aktivitas)
- content.php (form tambah + daftar tugas)
- kartu.php (satu kartu tugas)
- detail.php (panel Detail Tugas di sebelah kanan)
- config.php (koneksi database + fungsi tulis catatan)
- tambah.php, ubah.php, hapus.php, selesai.php (proses CRUD)
- edit.php (halaman form edit)
- hapuslog.php (hapus file catatan)
- data.sql (struktur database + data dummy)
- style.css, script.js, sw.js

## Yang dikerjakan

- Side bar dengan dua menu, Personal sama Shared. Keduanya halaman PHP sendiri-sendiri
  dan tugasnya dipisah lewat kolom jenis di database
- Kode HTML dipecah jadi beberapa file PHP kecil, terus digabung lagi jadi satu
  halaman utuh pakai include
- Struktur database dan data dummy disimpan di data.sql, tabelnya bernama tugas
- CRUD pakai PHP dan MySQLi, tambah pakai INSERT INTO, tampil pakai SELECT FROM,
  edit pakai UPDATE, hapus pakai DELETE FROM
- Centang selesai juga lewat UPDATE ke database
- Panel Detail Tugas di kanan tetap dipakai seperti di E03, kosong kalau belum milih,
  dan langsung terisi begitu tombol Edit di kartu ditekan
- File handling, tiap kali ada tambah, edit, atau hapus, aktivitasnya dicatat ke file
  log.txt pakai file_get_contents dan file_put_contents. Catatannya ditampilkan di side
  bar, dan bisa dibersihkan pakai unlink
- Fitur dari E03 tetap jalan, kamera (foto disimpan ke database), tema terang/gelap
  (localStorage), notifikasi, service worker, dan aksesibilitasnya

## Preview

# Halaman Personal

<img width="1624" height="987" alt="Screenshot 2026-10-09 at 08 20 15" src="https://github.com/user-attachments/assets/7da95950-1188-4a23-bbc2-68f9507cbc1b" />

# Halaman Shared

<img width="1624" height="987" alt="Screenshot 2026-10-09 at 08 27 03" src="https://github.com/user-attachments/assets/426da8c7-2f1e-4850-aa60-fdc3adbcc1d0" />
<img width="1624" height="987" alt="Screenshot 2026-10-09 at 08 27 09" src="https://github.com/user-attachments/assets/d2379a86-f350-44de-9c0e-44e57b01d44d" />

# Mode gelap

<img width="1624" height="987" alt="Screenshot 2026-10-09 at 08 29 26" src="https://github.com/user-attachments/assets/8744f000-cd45-4c01-9893-34706bcdf2fb" />

# Panel Detail Tugas saat edit

<img width="1624" height="987" alt="Screenshot 2026-10-09 at 08 24 31" src="https://github.com/user-attachments/assets/bac8360f-a97b-4222-a238-0857c69ec1bb" />

# Tugas dengan foto dari kamera

<img width="1624" height="987" alt="Screenshot 2026-10-09 at 08 26 25" src="https://github.com/user-attachments/assets/30f02fa1-f513-4dcd-81aa-7b99eff8c00b" />

# Isi tabel tugas di phpMyAdmin

<img width="1624" height="987" alt="Screenshot 2026-10-09 at 08 33 03" src="https://github.com/user-attachments/assets/3d15b1fe-71ee-4cfd-9aee-67d70558fb79" />
<img width="1624" height="987" alt="Screenshot 2026-10-09 at 08 33 12" src="https://github.com/user-attachments/assets/400fcc71-410d-453a-8a4c-86fdcf807472" />

## Cara menjalankan

Beda dari tugas sebelumnya, yang ini **tidak bisa dibuka lewat GitHub Pages**, karena
GitHub Pages cuma bisa melayani file statis dan tidak bisa menjalankan PHP. Harus
dijalankan pakai web server sendiri.

**1. Install XAMPP**

Download XAMPP, lalu nyalakan Apache dan MySQL lewat XAMPP Control Panel.

**2. Taruh filenya di folder htdocs**

Salin semua file ke dalam folder htdocs, misalnya jadi folder bernama todo-app.

**3. Buat databasenya**

Buka `http://localhost/phpmyadmin`, masuk ke tab Import, pilih file `data.sql`, lalu
tekan Import. Database bernama `tododb` beserta tabel `tugas` dan data dummynya akan
dibuat otomatis.

**4. Buka di browser**

    http://localhost/todo-app/index.php

Kalau username atau password MySQL di komputernya beda, ubah dulu bagian ini di
`config.php`:

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "tododb";
