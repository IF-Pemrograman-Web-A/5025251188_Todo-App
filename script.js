let aliran = null;

const kotakpesan = document.getElementById("pesan");
const videokamera = document.getElementById("videokamera");
const kanvas = document.getElementById("kanvas");
const pratinjau = document.getElementById("pratinjau");
const isianfoto = document.getElementById("foto");
const tomboltema = document.getElementById("tomboltema");

function tulispesan(teks) {
  if (kotakpesan) {
    kotakpesan.textContent = teks;
  }
}

if (localStorage.getItem("tema") === "gelap") {
  document.body.classList.add("gelap");
  if (tomboltema) {
    tomboltema.textContent = "Mode Terang";
  }
}

if (tomboltema) {
  tomboltema.addEventListener("click", function () {
    document.body.classList.toggle("gelap");
    if (document.body.className === "gelap") {
      tomboltema.textContent = "Mode Terang";
      localStorage.setItem("tema", "gelap");
      tulispesan("Tema diganti ke mode gelap.");
    } else {
      tomboltema.textContent = "Mode Gelap";
      localStorage.setItem("tema", "terang");
      tulispesan("Tema diganti ke mode terang.");
    }
  });
}

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

  tulispesan("Foto tugas berhasil diambil.");
}

if (document.getElementById("nyalakan")) {
  document.getElementById("nyalakan").addEventListener("click", nyalakankamera);
  document.getElementById("jepret").addEventListener("click", ambilfoto);

  document.getElementById("buangfoto").addEventListener("click", function () {
    pratinjau.style.display = "none";
    isianfoto.value = "";
    tulispesan("Foto tugas sudah dibuang.");
  });
}

if (document.getElementById("izinnotif")) {
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
}

if (document.getElementById("formtugas")) {
  document.getElementById("formtugas").addEventListener("submit", function () {
    if (Notification.permission !== "granted") {
      return;
    }
    const judul = document.getElementById("judul").value;
    const jam = document.getElementById("jam").value;
    const isi = { body: judul + " akan diingatkan jam " + jam };
    new Notification("Tugas baru ditambahkan", isi);
  });
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
