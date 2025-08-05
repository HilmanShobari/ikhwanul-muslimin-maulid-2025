# Website Maulid Nabi Muhammad SAW 2025
## Majlis Ikhwanul Muslimin

Website ini dibuat untuk acara Maulid Nabi Muhammad SAW 2025 yang diselenggarakan oleh Majlis Ikhwanul Muslimin.

## Fitur Website

✨ **Fitur Utama:**
- 📅 Informasi lengkap acara (tanggal, tempat, susunan acara)
- ⏰ Jadwal acara detail (Jum'at Berkah, Pembacaan Burdah, Pembacaan Maulid)
- 👥 Susunan panitia lengkap dengan struktur organisasi (Pembina, Pimpinan, dan 7 Seksi)
- 📊 Tabel anggaran biaya dengan rincian per seksi
- 💰 Rincian anggaran dana masuk dan keluar
- 🖼️ Tampilan pamflet acara
- 🎵 Background musik Islami dengan kontrol play/pause dan mute
- 🌄 Background image yang menarik dengan overlay transparan
- 📱 Desain responsif untuk mobile dan desktop
- 🎨 Animasi menarik dengan tema warna hijau emerald
- 💳 Informasi kontak WhatsApp dan donasi Bank Mandiri

✨ **Fitur Interaktif:**
- Klik pada "Total Dana Masuk" untuk melihat rincian sumber dana
- Klik pada "Total Dana Keluar" untuk melihat rincian pengeluaran
- Tombol menarik untuk melihat struktur organisasi lengkap
- Tombol menarik untuk melihat breakdown biaya per seksi
- Kontrol musik background (play/pause dan mute/unmute)
- Animasi hover pada elemen-elemen penting
- Tampilan saldo otomatis (dana masuk - dana keluar)

## Teknologi yang Digunakan

- **Next.js 15** - Framework React terbaru
- **TypeScript** - Type safety dan development experience yang lebih baik
- **Tailwind CSS** - Styling modern dan responsif
- **Heroicons** - Icon set yang elegant
- **React Hooks** - State management untuk interaktivitas

## Cara Menjalankan Project

### 1. Install Dependencies
```bash
npm install
```

### 2. Jalankan Development Server
```bash
npm run dev
```
Website akan berjalan di `http://localhost:3000`

### 3. Build untuk Production
```bash
npm run build
```

### 4. Jalankan Production Build
```bash
npm start
```

## Struktur Project

```
maulid-2025/
├── public/
│   ├── logo.png          # Logo Ikhwanul Muslimin
│   └── pamflet.jpeg      # Pamflet acara
├── src/
│   └── app/
│       ├── globals.css   # Styling global + custom animations
│       ├── layout.tsx    # Layout utama
│       └── page.tsx      # Halaman utama website
└── package.json
```

## Kustomisasi

### Mengubah Data Acara
Edit file `src/app/page.tsx` pada bagian:
- Informasi tanggal, waktu, tempat
- Data `incomeData` untuk sumber dana masuk
- Data `expenseData` untuk rincian pengeluaran
- Informasi kontak dan rekening donasi

### Mengubah Tema Warna
Warna tema menggunakan palet hijau emerald yang sesuai dengan nuansa Islami:
- `emerald-50` hingga `emerald-800` untuk gradasi hijau
- `green-500` hingga `green-700` untuk aksen
- Dapat diubah di file `src/app/page.tsx` dan `src/app/globals.css`

### Menambah Animasi
Custom animations sudah didefinisikan di `src/app/globals.css`:
- `fadeIn` - Efek fade in dengan slide dari atas
- `slideDown` - Efek slide down untuk detail anggaran

## Data Anggaran (Contoh)

### Dana Masuk
- Donasi Anggota: Rp 15.000.000
- Donasi Umum: Rp 8.000.000  
- Sponsor: Rp 5.000.000
- Bazaar: Rp 3.000.000
- **Total: Rp 31.000.000**

### Dana Keluar
- Sewa Tempat: Rp 8.000.000
- Sound System: Rp 3.000.000
- Dekorasi: Rp 4.000.000
- Konsumsi: Rp 6.000.000
- Dokumentasi: Rp 2.000.000
- Hadiah & Doorprize: Rp 3.000.000
- Operasional: Rp 2.000.000
- Lain-lain: Rp 3.000.000
- **Total: Rp 31.000.000**

**Saldo: Rp 0** (Dana seimbang)

## Informasi Kontak

- **Panitia Acara:** +62 878-5018-8977
- **Donasi:** Bank BC 1650085210 a.n. Hilman Shobari

## Lisensi

© 2025 Majlis Ikhwanul Muslimin. Semoga Allah SWT meridhoi acara ini.

---

*Dibuat dengan ❤️ untuk keperluan dakwah dan syiar Islam*