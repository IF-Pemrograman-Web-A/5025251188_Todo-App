# 5025251188_Todo-App

Static web Todo List, tugas E01a mata kuliah Pemrograman Web kelas A.

## Identitas

| NRP | Nama | Kelas |
|---|---|---|
| 5025251188 | Novaldi Rayhan Asshiddiqi | A |

## Deskripsi

### Gambaran Umum

MYTODO adalah halaman Todo List statis yang dibuat memakai HTML semantik dan CSS
saja, tanpa JavaScript dan tanpa framework apa pun. Halaman ini memakai tata letak
dua panel (two-panel layout) yang responsif: panel kiri untuk daftar tugas, panel
kanan untuk editor detail tugas.

### Struktur File

| File | Isi |
|---|---|
| `index.html` | Seluruh struktur halaman dan penandaan semantik |
| `style.css` | Semua aturan tampilan, tata letak Grid dan Flexbox, serta breakpoint responsif |
| `preview-*.png` | Tangkapan layar tampilan desktop dan mobile |
| `fitur-*.png` | Tangkapan layar tiap komponen |

### Elemen Semantik

Halaman disusun memakai empat elemen semantik yang diminta pada soal:

- `<header>` — bar atas berisi nama aplikasi, navigasi, dan identitas
- `<main>` — panel kiri, berisi form dan daftar tugas
- `<aside>` — panel kanan, berisi editor detail dan ringkasan
- `<footer>` — keterangan tugas di bagian bawah halaman

### Tata Letak

Pembagian dua panel memakai **CSS Grid** (`grid-template-columns: 62% 38%`).
**Flexbox** dipakai untuk komponen yang lebih kecil: bar atas, baris input pada form,
kartu tugas, baris chip, baris tombol, dan kotak ringkasan.

## Fitur Antarmuka

### 1. Form Pembuatan Tugas

Komponen form terpisah (`<section class="formbaru">`) di bagian atas panel kiri.
Berisi input judul, pilihan kategori, tanggal, prioritas, keterangan, dan tombol tambah.

![Form tambah tugas](fitur-form.png)

### 2. Daftar Tugas

Daftar tugas memakai data dummy, dipisah menjadi dua bagian: Belum Selesai dan Sudah
Selesai. Tiap kartu menampilkan checkbox bulat, label kategori berwarna, judul,
keterangan singkat, serta chip tanggal dan prioritas. Tugas yang sudah selesai
judulnya dicoret.

![Daftar tugas](fitur-list.png)

### 3. Panel Editor Detail

Panel kanan berisi editor tugas yang dipilih: judul, status, deadline, keterangan,
tombol Simpan dan Hapus, ditambah kotak ringkasan jumlah tugas.

![Panel detail](fitur-detail.png)

## Preview Todo App

### Tampilan Desktop

![Tampilan desktop](preview-desktop.png)

### Tampilan Mobile

Pada lebar layar 768px ke bawah, dua panel berubah menjadi satu kolom dan baris input
pada form ikut ditumpuk ke bawah.

![Tampilan mobile](preview-mobile.png)

## Cara Menjalankan

1. Clone atau download repository ini
2. Buka `index.html` memakai browser

Versi online dapat dibuka lewat tautan GitHub Pages pada bagian **About** repository ini.
