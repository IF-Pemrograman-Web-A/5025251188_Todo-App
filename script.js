let daftar = [
  { id: 1, judul: "Jogging 5 km", kategori: "Pribadi", tanggal: "2026-09-21", jam: "05:30", prioritas: "Sedang", ket: "Jaga pace tetap stabil", foto: "", selesai: false },
  { id: 2, judul: "Upload SKEM", kategori: "Kampus", tanggal: "2026-09-22", jam: "19:00", prioritas: "Tinggi", ket: "Unggah bukti kegiatan ke myITS sebelum ditutup", foto: "", selesai: false },
  { id: 3, judul: "Baca modul praktikum Jarkom", kategori: "Kampus", tanggal: "2026-09-23", jam: "20:00", prioritas: "Tinggi", ket: "Modulnya dibaca2 dong Mas", foto: "", selesai: false },
  { id: 4, judul: "Belajar HTML", kategori: "Kampus", tanggal: "2026-09-24", jam: "16:00", prioritas: "Sedang", ket: "Belajar dari W3Schools", foto: "", selesai: false },
  { id: 5, judul: "Belajar 1 jam tanpa distraksi", kategori: "Pribadi", tanggal: "2026-09-20", jam: "21:00", prioritas: "Rendah", ket: "HP disilent jangan buka apa-apa sampai satu jam kelar", foto: "", selesai: true }
];

let nomor = 6;
let idedit = 0;
let fotobaru = "";
let aliran = null;
let db;

const listbelum = document.getElementById("belum");
const listsudah = document.getElementById("sudah");
const kotakpesan = document.getElementById("pesan");
const videokamera = document.getElementById("videokamera");
const kanvas = document.getElementById("kanvas");
const pratinjau = document.getElementById("pratinjau");

function tulispesan(teks) {
  kotakpesan.textContent = teks;
}

function toko(mode) {
  return db.transaction("tugas", mode).objectStore("tugas");
}

function rekam(tugas) {
  toko("readwrite").put(tugas);
}

const permintaan = indexedDB.open("tododb", 1);

permintaan.onupgradeneeded = function (event) {
  const basis = event.target.result;
  basis.createObjectStore("tugas", { keyPath: "id" });
};

permintaan.onerror = function () {
  tulispesan("Database tugas gagal dibuka, coba buka lewat GitHub Pages.");
};

permintaan.onsuccess = function (event) {
  db = event.target.result;
  muat();
};

function muat() {
  const minta = toko("readonly").getAll();

  minta.onsuccess = function (event) {
    const tersimpan = event.target.result;

    if (tersimpan.length === 0) {
      const gudang = toko("readwrite");
      for (let i = 0; i < daftar.length; i++) {
        gudang.put(daftar[i]);
      }
    } else {
      daftar = tersimpan;
      for (let i = 0; i < daftar.length; i++) {
        if (daftar[i].id >= nomor) {
          nomor = daftar[i].id + 1;
        }
      }
    }

    tampilkan();
  };
}

function buatkartu(tugas) {
  const li = document.createElement("li");

  const centang = document.createElement("input");
  centang.type = "checkbox";
  centang.checked = tugas.selesai;
  centang.setAttribute("aria-label", "Tandai selesai untuk " + tugas.judul);
  centang.addEventListener("change", function () {
    tugas.selesai = centang.checked;
    rekam(tugas);
    tampilkan();
  });

  const teks = document.createElement("div");
  teks.className = "teks";

  const kategori = document.createElement("span");
  kategori.className = "kategori " + tugas.kategori.toLowerCase();
  kategori.textContent = tugas.kategori.toUpperCase();

  const judul = document.createElement("b");
  judul.textContent = tugas.judul;

  const ket = document.createElement("p");
  ket.textContent = tugas.ket;

  const chipbaris = document.createElement("div");
  chipbaris.className = "chipbaris";

  const chiptanggal = document.createElement("span");
  chiptanggal.className = "chip";
  chiptanggal.textContent = tugas.tanggal === "" ? "Tanpa tanggal" : tugas.tanggal;

  const chipjam = document.createElement("span");
  chipjam.className = "chip";
  chipjam.textContent = tugas.jam === "" ? "Tanpa pengingat" : "Ingatkan " + tugas.jam;

  const chipprioritas = document.createElement("span");
  chipprioritas.className = "chip " + tugas.prioritas.toLowerCase();
  chipprioritas.textContent = tugas.prioritas;

  chipbaris.appendChild(chiptanggal);
  chipbaris.appendChild(chipjam);
  chipbaris.appendChild(chipprioritas);

  teks.appendChild(kategori);
  teks.appendChild(judul);
  teks.appendChild(ket);

  if (tugas.foto !== "") {
    const gambar = document.createElement("img");
    gambar.className = "fototugas";
    gambar.src = tugas.foto;
    gambar.setAttribute("alt", "Foto tugas " + tugas.judul);
    teks.appendChild(gambar);
  }

  teks.appendChild(chipbaris);

  const aksi = document.createElement("div");
  aksi.className = "aksi";

  const tomboledit = document.createElement("button");
  tomboledit.type = "button";
  tomboledit.className = "aksibtn";
  tomboledit.textContent = "Edit";
  tomboledit.setAttribute("aria-label", "Edit tugas " + tugas.judul);
  tomboledit.addEventListener("click", function () {
    isidetail(tugas);
  });

  const tombolbuang = document.createElement("button");
  tombolbuang.type = "button";
  tombolbuang.className = "aksibtn buang";
  tombolbuang.textContent = "Hapus";
  tombolbuang.setAttribute("aria-label", "Hapus tugas " + tugas.judul);
  tombolbuang.addEventListener("click", function () {
    buang(tugas.id);
  });

  aksi.appendChild(tomboledit);
  aksi.appendChild(tombolbuang);

  li.appendChild(centang);
  li.appendChild(teks);
  li.appendChild(aksi);

  return li;
}

function tampilkan() {
  listbelum.innerHTML = "";
  listsudah.innerHTML = "";

  let belum = 0;
  let selesai = 0;

  for (let i = 0; i < daftar.length; i++) {
    if (daftar[i].selesai) {
      listsudah.appendChild(buatkartu(daftar[i]));
      selesai++;
    } else {
      listbelum.appendChild(buatkartu(daftar[i]));
      belum++;
    }
  }

  if (belum === 0) {
    listbelum.innerHTML = "<li class='kosong'>Belum ada tugas di sini</li>";
  }
  if (selesai === 0) {
    listsudah.innerHTML = "<li class='kosong'>Belum ada yang selesai</li>";
  }

  document.getElementById("jumlahtotal").textContent = daftar.length;
  document.getElementById("jumlahselesai").textContent = selesai;
  document.getElementById("jumlahbelum").textContent = belum;
}

function isidetail(tugas) {
  idedit = tugas.id;
  document.getElementById("j2").value = tugas.judul;
  document.getElementById("dl").value = tugas.tanggal;
  document.getElementById("jam2").value = tugas.jam;
  document.getElementById("ket2").value = tugas.ket;
  document.getElementById("status").value = tugas.selesai ? "Selesai" : "Belum dikerjakan";
  tulispesan("Tugas " + tugas.judul + " siap diedit di panel Detail Tugas.");
}

function buang(id) {
  toko("readwrite").delete(id);

  const sisa = [];
  for (let i = 0; i < daftar.length; i++) {
    if (daftar[i].id !== id) {
      sisa[sisa.length] = daftar[i];
    }
  }
  daftar = sisa;

  if (idedit === id) {
    idedit = 0;
    document.getElementById("j2").value = "";
    document.getElementById("dl").value = "";
    document.getElementById("jam2").value = "";
    document.getElementById("ket2").value = "";
  }
  tampilkan();
  tulispesan("Satu tugas sudah dihapus.");
}

document.getElementById("tambah").addEventListener("click", function () {
  const judul = document.getElementById("judul").value;

  if (judul === "") {
    alert("Judul tugasnya diisi dulu");
    return;
  }

  const tugas = {
    id: nomor,
    judul: judul,
    kategori: document.getElementById("kategori").value,
    tanggal: document.getElementById("tgl").value,
    jam: document.getElementById("jam").value,
    prioritas: document.getElementById("prioritas").value,
    ket: document.getElementById("ket").value,
    foto: fotobaru,
    selesai: false
  };

  daftar[daftar.length] = tugas;
  rekam(tugas);

  nomor++;
  document.getElementById("judul").value = "";
  document.getElementById("tgl").value = "";
  document.getElementById("jam").value = "";
  document.getElementById("ket").value = "";
  fotobaru = "";
  pratinjau.style.display = "none";
  tampilkan();
  tulispesan("Tugas " + tugas.judul + " sudah ditambahkan.");
  kirimnotif(tugas);
});

document.getElementById("simpan").addEventListener("click", function () {
  if (idedit === 0) {
    alert("Pilih Edit di salah satu tugas dulu");
    return;
  }

  for (let i = 0; i < daftar.length; i++) {
    if (daftar[i].id === idedit) {
      daftar[i].judul = document.getElementById("j2").value;
      daftar[i].tanggal = document.getElementById("dl").value;
      daftar[i].jam = document.getElementById("jam2").value;
      daftar[i].ket = document.getElementById("ket2").value;
      daftar[i].selesai = document.getElementById("status").value === "Selesai";
      rekam(daftar[i]);
    }
  }
  tampilkan();
  tulispesan("Perubahan tugas sudah disimpan.");
});

document.getElementById("hapusdetail").addEventListener("click", function () {
  if (idedit === 0) {
    alert("Pilih Edit di salah satu tugas dulu");
    return;
  }
  buang(idedit);
});

document.getElementById("tomboltema").addEventListener("click", function () {
  document.body.classList.toggle("gelap");
  const tombol = document.getElementById("tomboltema");
  if (document.body.className === "gelap") {
    tombol.textContent = "Mode Terang";
    localStorage.setItem("tema", "gelap");
  } else {
    tombol.textContent = "Mode Gelap";
    localStorage.setItem("tema", "terang");
  }
});

if (localStorage.getItem("tema") === "gelap") {
  document.body.classList.add("gelap");
  document.getElementById("tomboltema").textContent = "Mode Terang";
}

function kirimnotif(tugas) {
  if (Notification.permission !== "granted") {
    return;
  }
  const judul = "Tugas baru ditambahkan";
  const isi = { body: tugas.judul + " akan diingatkan jam " + tugas.jam };
  new Notification(judul, isi);
}

document.getElementById("izinnotif").addEventListener("click", async function () {
  const hasil = await Notification.requestPermission();

  if (hasil === "denied") {
    tulispesan("Izin notifikasi ditolak.");
    return;
  }

  if (hasil === "default") {
    tulispesan("Izin notifikasi ditutup atau diabaikan.");
    return;
  }

  tulispesan("Izin notifikasi diterima.");
});

async function nyalakankamera() {
  try {
    aliran = await navigator.mediaDevices.getUserMedia({ video: true });
    videokamera.srcObject = aliran;
    videokamera.play();
    videokamera.style.display = "block";
    tulispesan("Kamera menyala, silakan tekan Ambil Foto.");
  } catch (error) {
    console.error("Kamera gagal dibuka:", error);
    tulispesan("Kamera tidak bisa dibuka. Pastikan halaman dibuka lewat https.");
  }
}

function ambilfoto() {
  if (aliran === null) {
    tulispesan("Nyalakan kameranya dulu.");
    return;
  }

  const lebar = videokamera.videoWidth;
  const tinggi = videokamera.videoHeight;
  kanvas.width = lebar;
  kanvas.height = tinggi;

  const konteks = kanvas.getContext("2d");
  konteks.drawImage(videokamera, 0, 0, lebar, tinggi);

  fotobaru = kanvas.toDataURL("image/png");
  pratinjau.src = fotobaru;
  pratinjau.style.display = "block";
  tulispesan("Foto tugas berhasil diambil.");
}

document.getElementById("nyalakan").addEventListener("click", nyalakankamera);
document.getElementById("jepret").addEventListener("click", ambilfoto);

document.getElementById("buangfoto").addEventListener("click", function () {
  fotobaru = "";
  pratinjau.style.display = "none";
  tulispesan("Foto tugas sudah dibuang.");
});

async function daftarkansw() {
  if (!("serviceWorker" in navigator)) {
    console.error("Service Worker API tidak didukung.");
    return;
  }

  try {
    const hasil = await navigator.serviceWorker.register("./sw.js");
    console.log("Service worker berhasil didaftarkan:", hasil);
  } catch (error) {
    console.error("Service worker gagal didaftarkan:", error);
  }
}

daftarkansw();

tampilkan();
