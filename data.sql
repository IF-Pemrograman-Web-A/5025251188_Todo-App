CREATE DATABASE IF NOT EXISTS tododb;
USE tododb;

DROP TABLE IF EXISTS tugas;

CREATE TABLE tugas (
  id INT(11) NOT NULL AUTO_INCREMENT,
  judul VARCHAR(128) NOT NULL,
  kategori VARCHAR(16) NOT NULL,
  tanggal VARCHAR(16) NOT NULL,
  jam VARCHAR(16) NOT NULL,
  prioritas VARCHAR(16) NOT NULL,
  ket VARCHAR(255) NOT NULL,
  foto LONGTEXT NOT NULL,
  selesai INT(11) NOT NULL,
  jenis VARCHAR(16) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO tugas (judul, kategori, tanggal, jam, prioritas, ket, foto, selesai, jenis) VALUES
('Jogging 5 km', 'Pribadi', '2026-10-20', '05:30', 'Sedang', 'Jaga pace tetap stabil', '', 0, 'personal'),
('Upload SKEM', 'Kampus', '2026-10-21', '19:00', 'Tinggi', 'Unggah bukti kegiatan ke myITS sebelum ditutup', '', 0, 'personal'),
('Baca modul praktikum Jarkom', 'Kampus', '2026-10-22', '20:00', 'Tinggi', 'Modulnya dibaca2 dong Mas', '', 0, 'personal'),
('Belajar HTML', 'Kampus', '2026-10-23', '16:00', 'Sedang', 'Belajar dari W3Schools', '', 0, 'personal'),
('Belajar 1 jam tanpa distraksi', 'Pribadi', '2026-10-18', '21:00', 'Rendah', 'HP disilent jangan buka apa-apa sampai satu jam kelar', '', 1, 'personal'),
('Rapat rutin divisi', 'Kampus', '2026-10-20', '16:00', 'Tinggi', 'Bahas progres tiap anggota, jangan telat', '', 0, 'shared'),
('Siapkan materi sharing session', 'Kampus', '2026-10-24', '13:00', 'Sedang', 'Slide dibagi ke semua anggota H-1', '', 0, 'shared'),
('Rekap stok barang Centa Ultra', 'Bisnis', '2026-10-25', '10:00', 'Tinggi', 'Cek sisa stok sebelum restock', '', 0, 'shared'),
('Bikin notulen rapat minggu lalu', 'Kampus', '2026-10-17', '20:00', 'Rendah', 'Sudah diunggah ke drive bersama', '', 1, 'shared');
