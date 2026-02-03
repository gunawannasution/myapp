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

Interface ProductRepository bukan sekadar "tambahan kode", melainkan sebuah Kontrak (Contract).
Fungsi utamanya adalah:
1. Sebagai "Blueprint" atau Standar
Interface menentukan aturan main: “Siapapun yang ingin menjadi Repository Produk, dia HARUS punya fungsi findAll, findById, save, dan delete.”
Ini memastikan konsistensi. Jika Anda punya tim, mereka tidak akan membuat nama fungsi yang beda-beda (seperti cari() vs getOne()).
2. Memutus Ketergantungan (Decoupling)
Ini adalah poin paling Enterprise.
Tanpa Interface: ProductService langsung bergantung pada PrismaRepository. Jika Anda mau ganti ke MongoDB, Anda harus mengedit file ProductService.
Dengan Interface: ProductService hanya tahu dia memanggil IProductRepository. Dia tidak peduli di belakangnya pakai Prisma, MySQL, atau bahkan API pihak ketiga.
3. Memudahkan Testing (Mocking)
Saat membuat Unit Test, Anda tidak ingin mengetes sampai ke database asli (karena lambat dan mengotori data).
Dengan Interface, Anda bisa membuat "Repository Palsu" (Mock) yang hanya mengembalikan data statis di dalam memori.
Anda bisa mengetes logika di ProductService dengan cepat tanpa perlu menyalakan database.
4. Mendukung Dependency Inversion (Prinsip SOLID)
Interface memungkinkan Anda menerapkan prinsip Dependency Inversion:
"High-level modules (Service) should not depend on low-level modules (Prisma). Both should depend on abstractions (Interface)."
Analogi Sederhana: Stopkontak dan Colokan
Interface adalah lubang Stopkontak (bentuknya sudah standar).
Service adalah Lampu yang butuh listrik dari stopkontak.
Repository adalah PLN, Genset, atau Panel Surya.
Selama Genset atau PLN mengikuti standar "Interface" stopkontak yang sama, Lampu Anda akan tetap menyala tanpa perlu dimodifikasi kabelnya, meskipun sumber listriknya Anda ganti-ganti.
Contoh Kode Singkat:
typescript
// Kontrak
export interface IProductRepository {
  findAll(): Promise<Product[]>;
}

// Service hanya percaya pada Kontrak
export class ProductService {
  constructor(private repo: IProductRepository) {} 
  // Dia tidak tahu ini Prisma atau MySQL, yang penting ada fungsi findAll()
}
Gunakan kode dengan hati-hati.

Kesimpulannya: Interface adalah alat untuk memastikan kode Anda fleksibel, mudah diuji, dan aman dari perubahan teknologi di masa depan. Martin Fowler menjelaskan pola ini secara mendalam dalam literatur arsitektur perangkat lunak.



Dalam arsitektur DDD, urutan mengetik kode yang paling benar adalah Inside-Out (dari dalam ke luar). Kita mulai dari yang paling tidak mungkin berubah (logika bisnis) hingga ke yang paling sering berubah (UI).
Berikut adalah urutan langkah demi langkah secara profesional:
1. Mulai dari Domain (Kontrak)
Jangan sentuh database dulu. Tentukan dulu "apa saja yang mau kita lakukan".
Buat file: domain/product/product.types.ts (Definisikan objeknya).
Buat file: domain/product/product.repository.ts (Tentukan kontrak interface-nya).

2. Buat Infrastructure (Koneksi Database)
Setelah tahu kontraknya, buat implementasi nyatanya.
Edit: prisma/schema.prisma (Buat tabelnya).
Jalankan: npx prisma migrate dev.
Buat file: infrastructure/repositories/prisma-product.repository.ts (Tulis query SQL/Prisma di sini).
3. Buat Application Layer (Otak/Logika)
Sekarang buat jembatannya. Di sini tempat Anda menaruh validasi (misal: harga tidak boleh nol).
Buat file: application/product/product.service.ts.
Isi: Panggil fungsi-fungsi dari repository di sini.
4. Buat App Layer (Next.js Logic)
Baru sekarang kita masuk ke dunia Next.js.
Buat file: app/actions/productAction.ts.
Isi: Ambil data dari form (formData) dan kirim ke Service.
5. Terakhir: UI Layer (Tampilan)
Tampilan adalah hal terakhir karena fungsinya hanya memanggil apa yang sudah kita buat di atas.
Buat file: app/products/page.tsx (Daftar produk).
Buat file: app/products/create/page.tsx atau edit/page.tsx.
Kenapa urutannya begini?
Fokus: Anda fokus ke logika data dulu sebelum pusing memikirkan CSS/Tampilan.
Minimal Error: Jika Anda membuat UI duluan tanpa Service, Anda akan mendapatkan banyak error "Function not found".
Stability: Logika bisnis di Domain adalah bagian paling stabil. UI bisa berubah dari tabel jadi kartu (card), tapi cara menyimpan data ke database biasanya tetap sama.
Analogi: Seperti membangun restoran. Anda tentukan Menu (Domain), cari Supplier Bahan (Infrastructure), latih Koki (Service), baru kemudian dekorasi Ruang Makan (UI). Jika Anda dekorasi ruang makan dulu tapi kokinya belum ada, restoran tidak bisa jalan.