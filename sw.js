const CACHE = "mytodo-v1";

const SHELL = [
  "./index.php",
  "./shared.php",
  "./offline.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icon-48.png",
  "./icon-196.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((daftarnama) =>
    Promise.all(daftarnama
      .filter((nama) => nama.startsWith("mytodo-") && nama !== CACHE)
      .map((nama) => caches.delete(nama)))));
});

async function cacheFirst(request) {
  const tersimpan = await caches.match(request);
  if (tersimpan) return tersimpan;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return Response.error();
  }
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(request);
    if (res.ok) cache.put(request, res.clone());
    return res;
  } catch {
    const tersimpan = await cache.match(request);
    if (tersimpan) return tersimpan;
    return cache.match("./offline.html");
  }
}

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const alamat = event.request.url;

  if (alamat.endsWith(".css") || alamat.endsWith(".js") || alamat.endsWith(".png") || alamat.endsWith(".json")) {
    event.respondWith(cacheFirst(event.request));
  } else {
    event.respondWith(networkFirst(event.request));
  }
});

self.addEventListener("push", (event) => {
  const tampilkannotif = async () => {
    const judul = "Pengingat tugas MYTODO";
    const isi = { body: "Ada tugas yang harus segera dikerjakan." };
    await self.registration.showNotification(judul, isi);
  };

  event.waitUntil(tampilkannotif());
});
