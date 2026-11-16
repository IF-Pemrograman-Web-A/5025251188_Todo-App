# 5025251188_Todo App

# Tugas E06

Nama : Novaldi Rayhan Asshiddiqi

NRP : 5025251188

Kelas : A

## Deskripsi

Lanjutan dari branch E05. CRUD yang tadinya dikerjakan file PHP terpisah (tambah.php,
ubah.php, hapus.php, selesai.php) sekarang dipindah ke REST API, yaitu satu pintu masuk
yang dipanggil lewat HTTP dan membalas data dalam bentuk JSON. Halamannya tidak lagi
mengambil data lewat PHP, tapi memanggil API itu pakai `fetch()` di JavaScript.

File baru, api/index.php, api/db.php, api/auth.php, api/todos.php, api/.htaccess

File diubah, index.php, shared.php, content.php, detail.php, kerangka.php, menu-bar.php,
config.php, script.js, sw.js, style.css, data.sql

File dihapus, tambah.php, ubah.php, hapus.php, selesai.php, edit.php, kartu.php

## Yang dikerjakan

- **Routing**, semua permintaan ke folder api dialihkan .htaccess ke api/index.php. Di
  situ URLnya dipecah pakai `parse_url` dan `explode`, lalu diteruskan ke handlernya.

- **api/todos.php**, berisi handler GET, POST, PUT/PATCH, dan DELETE. Semua query pakai
  prepared statement PDO, jadi nilai dari user tidak langsung ditempel ke SQL.

- **Response code**, tiap endpoint membalas kode yang sesuai, 200 dan 201 untuk berhasil,
  400, 401, 404, 405, dan 500 untuk gagal.

- **API Key**, tiap permintaan wajib membawa header `X-API-Key`. Kuncinya dicocokkan ke
  tabel apikey, kalau tidak cocok dibalas 401.

- **CORS**, api/index.php mengirim header Access-Control-Allow-Origin, Allow-Methods, dan
  Allow-Headers, supaya API boleh dipanggil dari halaman lain.

- **script.js**, memuat daftar, menambah, mencentang selesai, mengubah, dan menghapus
  semuanya lewat `fetch()`. Hasilnya dicek `res.ok` dulu, kalau gagal yang tampil pesan,
  bukan daftar kosong.

- **sw.js**, ditambah handler `notificationclick` supaya notifikasi yang diklik membuka
  halaman aplikasi. Strategi cache dari E05 tidak diubah.

## Daftar Endpoint

Semua endpoint di bawah diawali `http://localhost/e06/api/v1`

| Method | Endpoint | Kegunaan | Berhasil | Gagal |
|---|---|---|---|---|
| GET | /todos | Semua tugas | 200 | 401, 500 |
| GET | /todos/personal | Tugas Personal | 200 | 401 |
| GET | /todos/shared | Tugas Shared | 200 | 401 |
| GET | /todos/{id} | Satu tugas | 200 | 401, 404 |
| POST | /todos | Tambah tugas | 201 | 400, 401, 405 |
| PATCH | /todos/{id} | Ubah tugas | 200 | 400, 401, 404 |
| DELETE | /todos/{id} | Hapus tugas | 200 | 400, 401, 404 |

Arti kodenya, 200 OK, 201 Created (data baru tersimpan), 400 Bad Request (isian salah),
401 Unauthorized (API key salah), 404 Not Found (tugas atau endpoint tidak ada), 405
Method Not Allowed (method tidak boleh dipakai di endpoint itu), 500 Internal Server
Error (database bermasalah).

## Laporan Uji Endpoint

Diuji pakai Postman, semua permintaan membawa header `X-API-Key` berisi
`mytodo-5025251188`.

| Yang diuji | Diharapkan | Hasil |
|---|---|---|
| GET /todos | 200 | Sesuai, balasannya daftar JSON |
| GET /todos/personal | 200 | Sesuai, hanya tugas personal |
| GET /todos/1 | 200 | Sesuai, satu objek JSON |
| GET /todos/9999 | 404 | Sesuai, "Tugas nomor 9999 tidak ada" |
| GET /api/v2/todos | 404 | Sesuai, versi API tidak ada |
| POST /todos dengan judul | 201 | Sesuai, balasannya id baru |
| POST /todos judul kosong | 400 | Sesuai, "Judul wajib diisi" |
| POST /todos body bukan JSON | 400 | Sesuai |
| POST /todos/1 | 405 | Sesuai, POST tidak boleh pakai nomor |
| PATCH /todos/{id} | 200 | Sesuai, balasannya data terbaru |
| PATCH /todos/9999 | 404 | Sesuai |
| DELETE /todos/{id} | 200 | Sesuai |
| DELETE /todos/9999 | 404 | Sesuai |
| GET /todos tanpa API key | 401 | Sesuai |
| GET /todos API key salah | 401 | Sesuai |

## Preview

# GET /todos berhasil (200)

![GET 200](screenshot/Screenshot%202026-11-16%20at%2012.08.20.png)

# POST /todos berhasil (201)

![POST 201](screenshot/Screenshot%202026-11-16%20at%2012.13.02.png)

# POST tanpa judul (400)

![POST 400](screenshot/Screenshot%202026-11-16%20at%2012.14.55.png)

# GET nomor yang tidak ada (404)

![GET 404](screenshot/Screenshot%202026-11-16%20at%2012.20.17.png)

# Tanpa API key (401)

![401](screenshot/Screenshot%202026-11-16%20at%2012.06.55.png)

# Tabel apikey di database

![Tabel apikey](screenshot/Screenshot%202026-11-16%20at%2011.39.59.png)

# Aplikasi memanggil API lewat fetch

![Panggilan fetch](screenshot/Screenshot%202026-11-16%20at%2012.00.45.png)

## Cara menjalankan

Sama seperti E05, butuh web server karena memakai PHP dan MySQL.

**1.** Install XAMPP, lalu nyalakan Apache dan MySQL.

**2.** Salin semua file ke folder htdocs, misalnya jadi folder e06.

**3.** Buka `http://localhost/phpmyadmin`, masuk tab Import, pilih file `data.sql`, lalu
tekan Import. Tabel tugas dan apikey akan terbuat.

**4.** Buka `http://localhost/e06/index.php`

APInya ada di `http://localhost/e06/api/v1/todos`. URL sependek itu bisa terbaca karena
ada `api/.htaccess` yang mengarahkan semua permintaan ke `api/index.php`, jadi Apache
harus mengizinkan .htaccess (AllowOverride All).

**Cara menguji pakai Postman.** Pilih methodnya, isi URL endpoint, tambahkan header
`X-API-Key` berisi `mytodo-5025251188`. Khusus POST dan PATCH, pilih Body, raw, JSON,
lalu isi datanya dalam bentuk JSON.
