Dalam arsitektur DDD (Domain-Driven Design) yang kita terapkan di Next.js, aliran data terbagi menjadi dua arah utama: Read (Membaca) dan Write (Menulis/Mutasi).
Berikut adalah peta aliran datanya:
1. Alur Membaca Data (Read Flow)
Digunakan saat menampilkan daftar produk atau detail produk untuk diedit.
Arah: Database ➔ Repository ➔ Service ➔ Server Component (UI)
Database (Prisma/SQLite): Sumber data mentah.
Infrastructure (Repository): Mengambil data mentah dari DB dan mengubahnya menjadi objek/tipe yang dimengerti Domain.
Application (Service): Menerima data dari Repository. Di sini data bisa diolah (misal: sensor data sensitif atau perhitungan tambahan).
UI Layer (Page.tsx): Memanggil Service dan langsung merender HTML (Server-Side Rendering).
2. Alur Menulis/Mengubah Data (Write Flow)
Digunakan saat klik "Save", "Update", atau "Delete".
Arah: User (Form) ➔ Server Action ➔ Service ➔ Repository ➔ Database
User (UI): Mengisi form dan menekan tombol submit.
Next.js Action: Menangkap FormData dari browser, mengekstrak nilainya (seperti id, name, price).
Application (Service): Action mengirim data ke Service. Di sini Aturan Bisnis dijalankan (misal: "Apakah stok cukup?", "Apakah harga masuk akal?").
Infrastructure (Repository): Jika valid, Service menyuruh Repository untuk melakukan operasi permanen (Create/Update/Delete).
Database: Data akhirnya disimpan secara permanen.
Revalidation: Server Action menyuruh Next.js menghapus cache lama (revalidatePath), sehingga UI otomatis menampilkan data terbaru.
Ringkasan Tanggung Jawab:
UI (Page/Form): Hanya tahu cara "Menampilkan" dan "Mengirim input".
Action: Jembatan antara Web (HTTP/Form) dengan logika aplikasi.
Service: Si "Otak" yang memutuskan apakah data boleh diproses atau tidak.
Repository: Si "Tukang Pukul" yang hanya tahu cara bicara ke Database.
Domain: "Kamus" atau aturan main yang disepakati semua layer.
Kenapa aliran ini profesional?
Jika Anda ingin mengganti database (misal dari SQLite ke MongoDB), Anda hanya mengubah Repository. Layer UI, Action, dan Service tidak berubah sama sekali. Ini yang disebut dengan Decoupling.