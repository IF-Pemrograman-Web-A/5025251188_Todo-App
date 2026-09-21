let daftar = [
  { id: 1, judul: "Jogging 5 km", kategori: "Pribadi", tanggal: "2026-09-21", prioritas: "Sedang", ket: "Jaga pace tetap stabil", selesai: false },
  { id: 2, judul: "Upload SKEM", kategori: "Kampus", tanggal: "2026-09-22", prioritas: "Tinggi", ket: "Unggah bukti kegiatan ke myITS sebelum ditutup", selesai: false },
  { id: 3, judul: "Baca modul praktikum Jarkom", kategori: "Kampus", tanggal: "2026-09-23", prioritas: "Tinggi", ket: "Modulnya dibaca2 dong Mas", selesai: false },
  { id: 4, judul: "Belajar HTML", kategori: "Kampus", tanggal: "2026-09-24", prioritas: "Sedang", ket: "Belajar dari W3Schools", selesai: false },
  { id: 5, judul: "Belajar 1 jam tanpa distraksi", kategori: "Pribadi", tanggal: "2026-09-20", prioritas: "Rendah", ket: "HP disilent jangan buka apa-apa sampai satu jam kelar", selesai: true }
];

let nomor = 6;
let idedit = 0;

const listbelum = document.getElementById("belum");
const listsudah = document.getElementById("sudah");

function buatkartu(tugas) {
  const li = document.createElement("li");

  const centang = document.createElement("input");
  centang.type = "checkbox";
  centang.checked = tugas.selesai;
  centang.addEventListener("change", function () {
    tugas.selesai = centang.checked;
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

  const chipprioritas = document.createElement("span");
  chipprioritas.className = "chip " + tugas.prioritas.toLowerCase();
  chipprioritas.textContent = tugas.prioritas;

  chipbaris.appendChild(chiptanggal);
  chipbaris.appendChild(chipprioritas);

  teks.appendChild(kategori);
  teks.appendChild(judul);
  teks.appendChild(ket);
  teks.appendChild(chipbaris);

  const aksi = document.createElement("div");
  aksi.className = "aksi";

  const tomboledit = document.createElement("button");
  tomboledit.type = "button";
  tomboledit.className = "aksibtn";
  tomboledit.textContent = "Edit";
  tomboledit.addEventListener("click", function () {
    isidetail(tugas);
  });

  const tombolbuang = document.createElement("button");
  tombolbuang.type = "button";
  tombolbuang.className = "aksibtn buang";
  tombolbuang.textContent = "Hapus";
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
  document.getElementById("ket2").value = tugas.ket;
  document.getElementById("status").value = tugas.selesai ? "Selesai" : "Belum dikerjakan";
}

function buang(id) {
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
    document.getElementById("ket2").value = "";
  }
  tampilkan();
}

document.getElementById("tambah").addEventListener("click", function () {
  const judul = document.getElementById("judul").value;

  if (judul === "") {
    alert("Judul tugasnya diisi dulu");
    return;
  }

  daftar[daftar.length] = {
    id: nomor,
    judul: judul,
    kategori: document.getElementById("kategori").value,
    tanggal: document.getElementById("tgl").value,
    prioritas: document.getElementById("prioritas").value,
    ket: document.getElementById("ket").value,
    selesai: false
  };

  nomor++;
  document.getElementById("judul").value = "";
  document.getElementById("tgl").value = "";
  document.getElementById("ket").value = "";
  tampilkan();
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
      daftar[i].ket = document.getElementById("ket2").value;
      daftar[i].selesai = document.getElementById("status").value === "Selesai";
    }
  }
  tampilkan();
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
  } else {
    tombol.textContent = "Mode Gelap";
  }
});

tampilkan();
