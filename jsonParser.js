// Fungsi untuk mengubah format teks menjadi JSON
export function parseTextToJson(text) {
  const lines = text.split("\n");
  const result = {};

  lines.forEach((line) => {
    // Mengabaikan baris kosong
    if (line.trim() === "") return;

    // Pisahkan key dan value tanpa mengabaikan komentar
    const [key, ...rest] = line.split("=").map((part) => part.trim());
    const value = rest.join("=").trim(); // Menggabungkan kembali jika ada '=' di dalam nilai

    if (key && value) {
      // Menghapus semicolon di akhir value jika ada
      const cleanedValue = value.endsWith(";")
        ? value.slice(0, -1).trim()
        : value.trim();

      // Menghapus tanda kutip dari value jika ada
      let parsedValue;
      if (cleanedValue.startsWith('"') && cleanedValue.endsWith('"')) {
        parsedValue = cleanedValue.slice(1, -1);
      } else {
        parsedValue = cleanedValue;
      }

      // Menentukan tipe data
      let finalValue;
      if (parsedValue === "true") {
        finalValue = true;
      } else if (parsedValue === "false") {
        finalValue = false;
      } else if (!isNaN(parsedValue)) {
        finalValue = Number(parsedValue);
      } else {
        finalValue = parsedValue;
      }

      result[key] = finalValue;
    }
  });

  return result;
}
