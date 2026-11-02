# 5025251188_Todo App

# Tugas E05

Nama : Novaldi Rayhan Asshiddiqi

NRP : 5025251188

Kelas : A

## Deskripsi

Lanjutan dari branch E04. Aplikasinya diubah jadi PWA (Progressive Web App), yaitu web
yang bisa dipasang seperti aplikasi biasa dan tetap bisa dibuka walaupun tidak ada
internet.

File baru: manifest.json, offline.html, icon-48.png, icon-196.png

File diubah: sw.js, kerangka.php, script.js

## Yang dikerjakan

- **manifest.json** — identitas aplikasi: name, short_name, start_url, display
  standalone, theme_color, background_color, ikon 48x48 dan 196x196.

- **sw.js** — event install menyimpan app shell (HTML, CSS, JavaScript) ke cache,
  event activate menghapus cache versi lama.

- **offline.html** — halaman cadangan kalau halaman yang dibuka belum ada di cache.

- **Strategi cache** — CSS, JavaScript, gambar, dan manifest pakai **Cache First**
  karena jarang berubah. Halaman PHP pakai **Network First** karena datanya sering
  berubah, kalau jaringan mati baru ambil dari cache, kalau kosong tampil offline.html.

- **Tombol Pasang Aplikasi** — pakai event `beforeinstallprompt`, muncul sendiri kalau
  browser menilai aplikasinya layak dipasang.

## Laporan Uji Offline

Diuji di Chrome, DevTools tab Application, dengan mencentang Offline di bagian Service
Workers.

| Yang diuji | Hasil |
|---|---|
| Manifest terbaca | Sesuai, display standalone, 2 ikon |
| Service worker | Sesuai, activated and is running |
| Cache storage | Sesuai, 8 berkas di mytodo-v1 |
| Offline, buka ulang index.php | Sesuai, tampil lengkap dari cache |
| Offline, buka halaman yang belum pernah dibuka | Sesuai, muncul offline.html |
| Offline, tambah tugas | Gagal, datanya di MySQL jadi butuh koneksi |

Menambah dan mengubah tugas saat offline belum didukung, karena datanya ada di database
MySQL di server. Yang bisa offline baru tampilan dan halaman yang pernah dibuka.

## Preview

# Manifest di DevTools

![Manifest](screenshot/Screenshot%202026-10-31%20at%2007.58.58.png)

![Ikon di manifest](screenshot/Screenshot%202026-10-31%20at%2007.59.07.png)

# Service Worker aktif

![Service worker](screenshot/Screenshot%202026-10-31%20at%2008.00.48.png)

# Isi Cache Storage

![Cache storage](screenshot/Screenshot%202026-10-31%20at%2008.03.41.png)

# Tampilan saat offline

![Tampilan offline](screenshot/Screenshot%202026-10-31%20at%2008.04.58.png)

# Halaman offline.html

![Halaman offline](screenshot/Screenshot%202026-10-31%20at%2014.35.53.png)

# Tombol Pasang Aplikasi

![Tombol pasang](screenshot/Screenshot%202026-10-31%20at%2008.10.44.png)

# Aplikasi terpasang di jendela sendiri

![Aplikasi terpasang](screenshot/Screenshot%202026-10-31%20at%2008.11.26.png)

## Cara menjalankan

Sama seperti E04, butuh web server karena memakai PHP dan MySQL.

**1.** Install XAMPP, lalu nyalakan Apache dan MySQL.

**2.** Salin semua file ke folder htdocs, misalnya jadi folder todo-app.

**3.** Buka `http://localhost/phpmyadmin`, masuk tab Import, pilih file `data.sql`,
tekan Import.

**4.** Buka `http://localhost/todo-app/index.php`

Service worker hanya berjalan di https atau localhost, jadi filenya jangan dibuka
dengan klik dua kali.

**Cara menguji offline:** buka DevTools, tab Application, pilih Service Workers,
centang Offline, lalu muat ulang halaman.
