self.addEventListener("install", () => {
  console.log("Service worker sedang dipasang...");
});

self.addEventListener("activate", (event) => {
  console.log("Service worker sedang diaktifkan...");
});

self.addEventListener("push", (event) => {
  const tampilkannotif = async () => {
    const judul = "Pengingat tugas MYTODO";
    const isi = { body: "Ada tugas yang harus segera dikerjakan." };
    await self.registration.showNotification(judul, isi);
  };

  event.waitUntil(tampilkannotif());
});
