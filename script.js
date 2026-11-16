const alamatapi = "api/v1/todos";
const kunciapi = "mytodo-5025251188";

let aliran = null;
let idedit = 0;

const kotakpesan = document.getElementById("pesan");
const videokamera = document.getElementById("videokamera");
const kanvas = document.getElementById("kanvas");
const pratinjau = document.getElementById("pratinjau");
const isianfoto = document.getElementById("foto");
const isianjenis = document.getElementById("jenis");
const tomboltema = document.getElementById("tomboltema");
const listbelum = document.getElementById("belum");
const listsudah = document.getElementById("sudah");
const kotakcatatan = document.getElementById("catatan");

function tulispesan(teks) {
  if (kotakpesan) {
    kotakpesan.textContent = teks;
  }
}

function tambahcatatan(teks) {
  if (kotakcatatan.textContent === "Belum ada aktivitas.") {
    kotakcatatan.textContent = "";
  }
  kotakcatatan.textContent = kotakcatatan.textContent + teks + "\n";
}

if (localStorage.getItem("tema") === "gelap") {
  document.body.classList.add("gelap");
  if (tomboltema) {
    tomboltema.textContent = "Mode Terang";
    tomboltema.setAttribute("aria-pressed", "true");
  }
}

if (tomboltema) {
  tomboltema.addEventListener("click", function () {
    document.body.classList.toggle("gelap");
    if (document.body.className === "gelap") {
      tomboltema.textContent = "Mode Terang";
      tomboltema.setAttribute("aria-pressed", "true");
      localStorage.setItem("tema", "gelap");
      tulispesan("Tema diganti ke mode gelap.");
    } else {
      tomboltema.textContent = "Mode Gelap";
      tomboltema.setAttribute("aria-pressed", "false");
      localStorage.setItem("tema", "terang");
      tulispesan("Tema diganti ke mode terang.");
    }
  });
}

function buatkartu(tugas) {
  const li = document.createElement("li");

  const centang = document.createElement("button");
  centang.type = "button";
  centang.className = "centang";

  if (tugas.selesai == 1) {
    centang.innerHTML = "&#9745;";
    centang.setAttribute("aria-label", "Batalkan selesai untuk " + tugas.judul);
  } else {
    centang.innerHTML = "&#9633;";
    centang.setAttribute("aria-label", "Tandai selesai untuk " + tugas.judul);
  }

  centang.addEventListener("click", function () {
    ubahstatus(tugas);
  });

  const teks = document.createElement("div");
  teks.className = "teks";

  const kategori = document.createElement("span");
  kategori.className = "kategori";
  if (tugas.kategori === "Bisnis") {
    kategori.className = "kategori bisnis";
  }
  if (tugas.kategori === "Pribadi") {
    kategori.className = "kategori pribadi";
  }
  kategori.textContent = tugas.kategori;

  const judul = document.createElement("strong");
  judul.textContent = tugas.judul;

  const ket = document.createElement("p");
  ket.textContent = tugas.ket;

  teks.appendChild(kategori);
  teks.appendChild(judul);
  teks.appendChild(ket);

  if (tugas.foto !== "") {
    const gambar = document.createElement("img");
    gambar.className = "fototugas";
    gambar.src = tugas.foto;
    gambar.alt = "Foto tugas " + tugas.judul;
    teks.appendChild(gambar);
  }

  const chipbaris = document.createElement("div");
  chipbaris.className = "chipbaris";

  const chiptanggal = document.createElement("span");
  chiptanggal.className = "chip";
  if (tugas.tanggal === "") {
    chiptanggal.textContent = "Tanpa tanggal";
  } else {
    chiptanggal.textContent = tugas.tanggal;
  }

  const chipjam = document.createElement("span");
  chipjam.className = "chip";
  if (tugas.jam === "") {
    chipjam.textContent = "Tanpa pengingat";
  } else {
    chipjam.textContent = "Ingatkan " + tugas.jam;
  }

  const chipprioritas = document.createElement("span");
  chipprioritas.className = "chip";
  if (tugas.prioritas === "Tinggi") {
    chipprioritas.className = "chip tinggi";
  }
  if (tugas.prioritas === "Sedang") {
    chipprioritas.className = "chip sedang";
  }
  if (tugas.prioritas === "Rendah") {
    chipprioritas.className = "chip rendah";
  }
  chipprioritas.textContent = tugas.prioritas;

  chipbaris.appendChild(chiptanggal);
  chipbaris.appendChild(chipjam);
  chipbaris.appendChild(chipprioritas);
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

function gambardaftar(semua) {
  listbelum.innerHTML = "";
  listsudah.innerHTML = "";

  let belum = 0;
  let beres = 0;

  for (let i = 0; i < semua.length; i++) {
    if (semua[i].selesai == 1) {
      listsudah.appendChild(buatkartu(semua[i]));
      beres++;
    } else {
      listbelum.appendChild(buatkartu(semua[i]));
      belum++;
    }
  }

  if (belum === 0) {
    listbelum.innerHTML = "<li class='kosong'>Belum ada tugas di sini</li>";
  }
  if (beres === 0) {
    listsudah.innerHTML = "<li class='kosong'>Belum ada yang selesai</li>";
  }

  document.getElementById("jumlahtotal").textContent = semua.length;
  document.getElementById("jumlahselesai").textContent = beres;
  document.getElementById("jumlahbelum").textContent = belum;
}

function isidetail(tugas) {
  idedit = tugas.id;
  document.getElementById("idedit").value = tugas.id;
  document.getElementById("j2").value = tugas.judul;
  document.getElementById("dl").value = tugas.tanggal;
  document.getElementById("jam2").value = tugas.jam;
  document.getElementById("ket2").value = tugas.ket;

  if (tugas.selesai == 1) {
    document.getElementById("status").value = "Selesai";
  } else {
    document.getElementById("status").value = "Belum dikerjakan";
  }

  tulispesan("Tugas " + tugas.judul + " siap diubah di panel Detail Tugas.");
}

function kosongkandetail() {
  idedit = 0;
  document.getElementById("idedit").value = "0";
  document.getElementById("j2").value = "";
  document.getElementById("dl").value = "";
  document.getElementById("jam2").value = "";
  document.getElementById("ket2").value = "";
  document.getElementById("status").value = "Belum dikerjakan";
}

async function muattugas() {
  try {
    const res = await fetch(alamatapi + "/" + isianjenis.value, {
      headers: { "X-API-Key": kunciapi }
    });

    if (!res.ok) {
      throw new Error("Status " + res.status);
    }

    const semua = await res.json();
    gambardaftar(semua);
  } catch (error) {
    console.error("Gagal memuat tugas:", error);
    tulispesan("Daftar tugas tidak bisa dimuat dari server.");
  }
}

async function ubahstatus(tugas) {
  let nilai = 1;
  if (tugas.selesai == 1) {
    nilai = 0;
  }

  try {
    const res = await fetch(alamatapi + "/" + tugas.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "X-API-Key": kunciapi },
      body: JSON.stringify({ selesai: nilai })
    });

    if (!res.ok) {
      throw new Error("Status " + res.status);
    }

    tambahcatatan("Edit tugas: " + tugas.judul + " (" + isianjenis.value + ")");
    tulispesan("Status tugas " + tugas.judul + " sudah diubah.");
    muattugas();
  } catch (error) {
    console.error("Gagal mengubah status:", error);
    tulispesan("Status tugas gagal diubah.");
  }
}

async function buang(id) {
  try {
    const res = await fetch(alamatapi + "/" + id, {
      method: "DELETE",
      headers: { "X-API-Key": kunciapi }
    });

    if (!res.ok) {
      throw new Error("Status " + res.status);
    }

    if (idedit === id) {
      kosongkandetail();
    }

    tambahcatatan("Hapus tugas nomor " + id + " (" + isianjenis.value + ")");
    tulispesan("Satu tugas sudah dihapus.");
    muattugas();
  } catch (error) {
    console.error("Gagal menghapus tugas:", error);
    tulispesan("Tugas gagal dihapus.");
  }
}

document.getElementById("formtugas").addEventListener("submit", async function (event) {
  event.preventDefault();

  const tugas = {
    judul: document.getElementById("judul").value,
    kategori: document.getElementById("kategori").value,
    tanggal: document.getElementById("tgl").value,
    jam: document.getElementById("jam").value,
    prioritas: document.getElementById("prioritas").value,
    ket: document.getElementById("ket").value,
    foto: isianfoto.value,
    jenis: isianjenis.value
  };

  try {
    const res = await fetch(alamatapi, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-Key": kunciapi },
      body: JSON.stringify(tugas)
    });

    const balasan = await res.json();

    if (!res.ok) {
      tulispesan(balasan.error);
      return;
    }

    document.getElementById("judul").value = "";
    document.getElementById("tgl").value = "";
    document.getElementById("jam").value = "";
    document.getElementById("ket").value = "";
    isianfoto.value = "";
    pratinjau.style.display = "none";

    tambahcatatan("Tambah tugas: " + tugas.judul + " (" + tugas.jenis + ")");
    tulispesan("Tugas " + tugas.judul + " sudah ditambahkan.");
    kirimnotif(tugas);
    muattugas();
  } catch (error) {
    console.error("Gagal menambah tugas:", error);
    tulispesan("Tugas gagal dikirim ke server.");
  }
});

document.getElementById("formdetail").addEventListener("submit", async function (event) {
  event.preventDefault();

  if (idedit === 0) {
    tulispesan("Pilih Edit di salah satu tugas dulu.");
    return;
  }

  let selesai = 0;
  if (document.getElementById("status").value === "Selesai") {
    selesai = 1;
  }

  const ubahan = {
    judul: document.getElementById("j2").value,
    tanggal: document.getElementById("dl").value,
    jam: document.getElementById("jam2").value,
    ket: document.getElementById("ket2").value,
    selesai: selesai
  };

  try {
    const res = await fetch(alamatapi + "/" + idedit, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "X-API-Key": kunciapi },
      body: JSON.stringify(ubahan)
    });

    const balasan = await res.json();

    if (!res.ok) {
      tulispesan(balasan.error);
      return;
    }

    tambahcatatan("Edit tugas: " + ubahan.judul + " (" + isianjenis.value + ")");
    tulispesan("Perubahan tugas sudah disimpan.");
    muattugas();
  } catch (error) {
    console.error("Gagal menyimpan perubahan:", error);
    tulispesan("Perubahan gagal dikirim ke server.");
  }
});

document.getElementById("hapusdetail").addEventListener("click", function () {
  if (idedit === 0) {
    tulispesan("Pilih Edit di salah satu tugas dulu.");
    return;
  }
  buang(idedit);
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
    tulispesan("Kamera tidak bisa dibuka. Pastikan halaman dibuka lewat localhost.");
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

  const hasil = kanvas.toDataURL("image/png");
  pratinjau.src = hasil;
  pratinjau.style.display = "block";
  isianfoto.value = hasil;

  const jalur = aliran.getTracks();
  for (let i = 0; i < jalur.length; i++) {
    jalur[i].stop();
  }
  aliran = null;
  videokamera.style.display = "none";

  tulispesan("Foto tugas berhasil diambil.");
}

document.getElementById("nyalakan").addEventListener("click", nyalakankamera);
document.getElementById("jepret").addEventListener("click", ambilfoto);

document.getElementById("buangfoto").addEventListener("click", function () {
  pratinjau.style.display = "none";
  isianfoto.value = "";
  tulispesan("Foto tugas sudah dibuang.");
});

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

function kirimnotif(tugas) {
  if (Notification.permission !== "granted") {
    return;
  }

  const judul = "Pengingat tugas";
  const isi = { body: tugas.judul };
  const waktu = new Date(tugas.tanggal + "T" + tugas.jam);
  const jeda = waktu.getTime() - Date.now();

  if (jeda > 0) {
    setTimeout(function () {
      new Notification(judul, isi);
    }, jeda);
    return;
  }

  new Notification(judul, isi);
}

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

muattugas();

let deferredPrompt;
const btn = document.querySelector("#install-button");
btn.hidden = true;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  btn.hidden = false;
});

btn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  await deferredPrompt.prompt();
  deferredPrompt = null;
  btn.hidden = true;
});
