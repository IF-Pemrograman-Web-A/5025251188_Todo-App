<?php
function tulislog($pesan) {
  $filelog = __DIR__ . "/../log.txt";

  $isi = "";
  if (file_exists($filelog)) {
    $isi = file_get_contents($filelog);
  }

  $isi .= $pesan . "\n";
  file_put_contents($filelog, $isi);
}

if ($metode === "GET") {
  if ($pilihan === "") {
    $ambil = $pdo->query("SELECT * FROM tugas");
    http_response_code(200);
    echo json_encode($ambil->fetchAll());
    exit;
  }

  if ($pilihan === "personal" || $pilihan === "shared") {
    $ambil = $pdo->prepare("SELECT * FROM tugas WHERE jenis = ?");
    $ambil->execute([$pilihan]);
    http_response_code(200);
    echo json_encode($ambil->fetchAll());
    exit;
  }

  $ambil = $pdo->prepare("SELECT * FROM tugas WHERE id = ?");
  $ambil->execute([$pilihan]);
  $tugas = $ambil->fetch();

  if (!$tugas) {
    http_response_code(404);
    echo json_encode(["error" => "Tugas nomor $pilihan tidak ada"]);
    exit;
  }

  http_response_code(200);
  echo json_encode($tugas);
  exit;
}

if ($metode === "POST") {
  if ($pilihan !== "") {
    http_response_code(405);
    echo json_encode(["error" => "POST hanya untuk /api/v1/todos tanpa nomor"]);
    exit;
  }

  $data = json_decode(file_get_contents("php://input"), true);

  if ($data === null) {
    http_response_code(400);
    echo json_encode(["error" => "Isi permintaan bukan JSON yang benar"]);
    exit;
  }

  $judul = trim($data['judul'] ?? "");
  $jenis = $data['jenis'] ?? "";

  if ($judul === "") {
    http_response_code(400);
    echo json_encode(["error" => "Judul wajib diisi"]);
    exit;
  }

  if ($jenis !== "personal" && $jenis !== "shared") {
    http_response_code(400);
    echo json_encode(["error" => "Jenis harus personal atau shared"]);
    exit;
  }

  $simpan = $pdo->prepare("INSERT INTO tugas (judul, kategori, tanggal, jam, prioritas, ket, foto, selesai, jenis) VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)");
  $simpan->execute([
    $judul,
    $data['kategori'] ?? "Kampus",
    $data['tanggal'] ?? "",
    $data['jam'] ?? "",
    $data['prioritas'] ?? "Rendah",
    $data['ket'] ?? "",
    $data['foto'] ?? "",
    $jenis
  ]);

  $nomorbaru = $pdo->lastInsertId();
  tulislog("Tambah tugas: $judul ($jenis)");

  http_response_code(201);
  echo json_encode(["id" => $nomorbaru, "judul" => $judul, "jenis" => $jenis]);
  exit;
}

if ($metode === "PATCH" || $metode === "PUT") {
  if ($pilihan === "") {
    http_response_code(400);
    echo json_encode(["error" => "Nomor tugas belum disebutkan"]);
    exit;
  }

  $ambil = $pdo->prepare("SELECT * FROM tugas WHERE id = ?");
  $ambil->execute([$pilihan]);
  $tugas = $ambil->fetch();

  if (!$tugas) {
    http_response_code(404);
    echo json_encode(["error" => "Tugas nomor $pilihan tidak ada"]);
    exit;
  }

  $data = json_decode(file_get_contents("php://input"), true);

  if ($data === null) {
    http_response_code(400);
    echo json_encode(["error" => "Isi permintaan bukan JSON yang benar"]);
    exit;
  }

  $judul = trim($data['judul'] ?? $tugas['judul']);

  if ($judul === "") {
    http_response_code(400);
    echo json_encode(["error" => "Judul wajib diisi"]);
    exit;
  }

  $ubah = $pdo->prepare("UPDATE tugas SET judul = ?, tanggal = ?, jam = ?, ket = ?, selesai = ? WHERE id = ?");
  $ubah->execute([
    $judul,
    $data['tanggal'] ?? $tugas['tanggal'],
    $data['jam'] ?? $tugas['jam'],
    $data['ket'] ?? $tugas['ket'],
    $data['selesai'] ?? $tugas['selesai'],
    $pilihan
  ]);

  tulislog("Edit tugas: $judul (" . $tugas['jenis'] . ")");

  $ambil->execute([$pilihan]);
  http_response_code(200);
  echo json_encode($ambil->fetch());
  exit;
}

if ($metode === "DELETE") {
  if ($pilihan === "") {
    http_response_code(400);
    echo json_encode(["error" => "Nomor tugas belum disebutkan"]);
    exit;
  }

  $ambil = $pdo->prepare("SELECT * FROM tugas WHERE id = ?");
  $ambil->execute([$pilihan]);
  $tugas = $ambil->fetch();

  if (!$tugas) {
    http_response_code(404);
    echo json_encode(["error" => "Tugas nomor $pilihan tidak ada"]);
    exit;
  }

  $buang = $pdo->prepare("DELETE FROM tugas WHERE id = ?");
  $buang->execute([$pilihan]);

  tulislog("Hapus tugas nomor $pilihan (" . $tugas['jenis'] . ")");

  http_response_code(200);
  echo json_encode(["pesan" => "Tugas nomor $pilihan sudah dihapus"]);
  exit;
}

http_response_code(405);
echo json_encode(["error" => "Method $metode tidak diizinkan di endpoint ini"]);
?>
