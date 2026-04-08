# Stock Transfer Management - Batch Selection Feature

Dokumentasi ini menjelaskan fitur pemilihan batch yang telah diimplementasikan pada aplikasi Stock Transfer Management.

## Deskripsi Fitur
Fitur ini memungkinkan pengguna untuk memilih batch produk melalui antarmuka modal (dialog) yang informatif. Dengan memilih batch dari daftar yang tersedia, sistem akan secara otomatis mengisi informasi terkait seperti tanggal kedaluwarsa dan jumlah stok tersedia.

## Acceptance Criteria (Kriteria Penerimaan)

### 1. Pemicu Modal (Trigger)
* **AC 1.1:** Kolom "Batch" pada tabel Stock Transfer harus dapat diklik oleh pengguna.
* **AC 1.2:** Saat kolom Batch diklik, aplikasi harus menampilkan sebuah Modal (Dialog).
* **AC 1.3:** Input pada kolom Batch bersifat *read-only* untuk memastikan data hanya diisi melalui pilihan modal.
* **AC 1.4:** Terdapat ikon "Search" di dalam kolom Batch sebagai petunjuk visual aksi pemilihan.

### 2. Tampilan Modal Pemilihan Batch
* **AC 2.1:** Modal memiliki judul "Select Batch" dengan aksen visual garis biru di samping judul.
* **AC 2.2:** Modal memiliki lebar yang luas (`max-w-5xl`) untuk keterbacaan informasi yang optimal.
* **AC 2.3:** Tabel di dalam modal menyajikan informasi:
    * **Item:** Nama produk.
    * **Qty:** Jumlah stok tersedia untuk batch tersebut.
    * **Batch:** Nomor identitas batch (ditampilkan dengan gaya *badge*).
    * **Exp. Date:** Tanggal kedaluwarsa batch.
* **AC 2.4:** Baris tabel modal memiliki efek *hover* untuk interaksi yang lebih baik.

### 3. Logika Pemilihan (Selection Logic)
* **AC 3.1:** Setiap baris pada tabel modal memiliki tombol **"Pilih"**.
* **AC 3.2:** Saat tombol **"Pilih"** diklik, modal otomatis tertutup.
* **AC 3.3:** Setelah modal tertutup, data pada baris tabel utama otomatis terisi:
    * Kolom **Batch** terisi nomor batch yang dipilih.
    * Kolom **Exp. Date** terisi tanggal kedaluwarsa batch.
    * Kolom **Qty Available** terisi jumlah stok dari batch tersebut.

### 4. Responsivitas dan UX
* **AC 4.1:** Modal dapat ditutup melalui tombol silang (X) atau klik di luar area modal.
* **AC 4.2:** Transisi pembukaan dan penutupan modal menggunakan animasi yang halus.

## Teknologi yang Digunakan
- **React** (State management & Hooks)
- **Tailwind CSS** (Styling & Layout)
- **Shadcn UI** (Dialog, Table, Badge components)
- **Lucide React** (Icons)
- **Motion** (Animations)
