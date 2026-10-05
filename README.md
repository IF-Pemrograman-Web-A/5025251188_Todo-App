# 5025251188_Todo App

# Tugas E03

Nama : Novaldi Rayhan Asshiddiqi

NRP : 5025251188

Kelas : A

Website: https://if-pemrograman-web-a.github.io/5025251188_Todo-App/

## Deskripsi

Lanjutan dari branch E02. Sebelumnya data tugasnya masih disimpan di array biasa di
dalam script.js, jadi tiap halaman direfresh tugasnya balik lagi ke lima tugas awal.
Sekarang datanya dipindah ke IndexedDB biar nggak hilang, pilihan tema terang/gelap
disimpan di localStorage, formnya ditambah kolom foto sama kolom waktu pengingat, dan
ditambah file sw.js buat service worker.

File yang ada:

- index.html
- style.css
- script.js
- sw.js

## Yang dikerjakan

- Data tugas disimpan di IndexedDB (database tododb, object store tugas), jadi kalau
  halaman direfresh atau browser ditutup tugasnya tetap ada
- Pilihan tema terang/gelap disimpan di localStorage, pas halaman dibuka lagi temanya
  masih sama kayak terakhir dipakai
- Kolom foto di form tugas pakai Media Capture API (navigator.mediaDevices.getUserMedia),
  fotonya diambil dari video pakai Canvas API terus nempel di kartu tugasnya
- Kolom waktu pengingat di form tugas, sama tombol buat minta izin notifikasi
- Service worker didaftarkan lewat sw.js, isinya event install, activate, sama push
- Aksesibilitas: lang="id", title yang jelas, link Lewati ke konten utama, h1 di awal
  konten, label di semua input, alt di semua gambar, aria-label di tombol Edit/Hapus
  sama checkbox, role="status" buat pesan, ukuran font pakai rem, warna teks dicek
  kontrasnya

## Preview

# Mode terang

<img width="1624" height="986" alt="Screenshot 2026-10-05 at 18 58 03" src="https://github.com/user-attachments/assets/35c24251-7ac3-45c4-822c-97bbe26d2c0f" />

# Mode gelap

<img width="1624" height="986" alt="Screenshot 2026-10-05 at 18 58 07" src="https://github.com/user-attachments/assets/3f581595-5f69-44a2-848a-069a12a5e902" />

# Tampilan HP

<img width="1624" height="986" alt="Screenshot 2026-10-05 at 19 01 07" src="https://github.com/user-attachments/assets/95a3fdf2-a2a3-4bae-8f26-992d0e651618" />
<img width="1624" height="986" alt="Screenshot 2026-10-05 at 19 01 16" src="https://github.com/user-attachments/assets/f4ed77c8-55a0-4d17-a531-4229e87a6ee4" />
<img width="1624" height="986" alt="Screenshot 2026-10-05 at 19 01 33" src="https://github.com/user-attachments/assets/7e63d3d2-46f5-4910-b816-11a1c2d32f8c" />

# Ambil foto lewat kamera

<img width="1624" height="986" alt="Screenshot 2026-10-05 at 19 04 08" src="https://github.com/user-attachments/assets/500139f3-5c94-42dc-b0b1-a234d4601598" />
<img width="1624" height="986" alt="Screenshot 2026-10-05 at 19 04 18" src="https://github.com/user-attachments/assets/9128f6e5-4a64-4700-95d2-11da88820c8f" />

# Notifikasi

<img width="1624" height="986" alt="Screenshot 2026-10-05 at 19 06 31" src="https://github.com/user-attachments/assets/7dad598d-3e3b-4f54-bf49-ccc71338f73a" />
<img width="1512" height="873" alt="Screenshot 2026-10-05 at 19 10 41" src="https://github.com/user-attachments/assets/b0b1bec8-075f-4229-aca5-2ffeed17b12c" />

# DevTools (tugas & service workers)

<img width="1624" height="986" alt="Screenshot 2026-10-05 at 19 13 36" src="https://github.com/user-attachments/assets/7c855f6d-b945-45a8-8adc-65d6066a2681" />
<img width="1624" height="986" alt="Screenshot 2026-10-05 at 19 14 05" src="https://github.com/user-attachments/assets/567aaec8-0f55-4066-8674-99eaa3097096" />

## Cara buka

Klik link Website yang ada di atas 

Atau lewat localhost dengan,

Download dulu semua filenya, terus buka terminal dan jalanin ini:

    cd folder-tempat-filenya
    python3 -m http.server 8000

Habis itu buka browser ke `http://localhost:8000`. Kalau mau berhenti, tekan Ctrl+C di terminal.

