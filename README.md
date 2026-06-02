# PresensiTutor - BimbelMelly

PresensiTutor adalah aplikasi web mobile-friendly untuk tutor bimbingan belajar dalam melakukan pencatatan sesi mengajar, melihat riwayat presensi, memantau transaksi payout, dan mengelola informasi profil tutor.

Aplikasi ini dibuat menggunakan React, Vite, TypeScript, Tailwind CSS, shadcn/ui, Material UI, dan beberapa library pendukung UI lainnya.

## Preview Tampilan

### Dashboard / Beranda Tutor

Halaman beranda menampilkan informasi tutor, tanggal saat ini, serta daftar transaksi payout tutor.

Fitur utama pada halaman ini:

- Menampilkan nama tutor.
- Menampilkan tanggal saat ini.
- Menampilkan daftar transaksi payout.
- Menampilkan status payout seperti `Diproses` dan `Sudah Payout`.
- Menampilkan jumlah nominal payout.

### Riwayat Sesi

Halaman riwayat digunakan untuk melihat daftar sesi presensi dan payout.

Fitur utama pada halaman ini:

- Filter riwayat berdasarkan status.
- Menampilkan data sesi seperti tanggal, siswa, mata pelajaran, durasi, dan nominal.
- Tombol untuk melihat detail sesi.
- Tampilan dibuat mobile-friendly.

## Tech Stack

Project ini menggunakan beberapa teknologi utama:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Material UI
- Radix UI
- Lucide React
- date-fns
- Sonner
- Motion

## Struktur Folder

```txt
presensi-bimbel
├── guidelines
│   └── Guidelines.md
├── src
│   ├── app
│   │   ├── components
│   │   │   ├── BottomNavigation.tsx
│   │   │   └── SuccessToast.tsx
│   │   ├── App.tsx
│   │   └── types.ts
│   ├── features
│   │   ├── attendance
│   │   │   ├── components
│   │   │   │   ├── add-attendance
│   │   │   │   └── history
│   │   │   ├── constants.ts
│   │   │   ├── types.ts
│   │   │   └── utils.ts
│   │   ├── dashboard
│   │   │   ├── components
│   │   │   ├── hooks
│   │   │   ├── constants.ts
│   │   │   ├── types.ts
│   │   │   └── utils.ts
│   │   └── settings
│   │       ├── components
│   │       ├── constants.ts
│   │       ├── types.ts
│   │       └── utils.ts
│   ├── pages
│   │   ├── AddAttendancePage.tsx
│   │   ├── HistoryPage.tsx
│   │   ├── HomePage.tsx
│   │   └── SettingsPage.tsx
│   ├── shared
│   │   ├── components
│   │   │   ├── figma
│   │   │   └── ui
│   │   ├── hooks
│   │   └── lib
│   ├── styles
│   │   ├── fonts.css
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   └── theme.css
│   └── main.tsx
├── ATTRIBUTIONS.md
├── default_shacdn_theme.css
├── index.html
├── package-lock.json
├── package.json
├── pnpm-workspace.yaml
├── postcss.config.mjs
├── README.md
├── tsconfig.json
└── vite.config.ts
```

---

## Penjelasan Struktur Folder
### src/app

Folder ini berisi konfigurasi utama aplikasi, komponen global, dan file utama aplikasi.

Isi utama:

- `App.tsx`  
  File utama yang mengatur tampilan dan navigasi aplikasi.

- `types.ts`  
  Berisi tipe global yang digunakan pada level aplikasi.

- `components/BottomNavigation.tsx`  
  Komponen navigasi bawah untuk berpindah halaman.

- `components/SuccessToast.tsx`  
  Komponen notifikasi sukses.

### src/features
Folder ini berisi fitur utama aplikasi yang dipisahkan berdasarkan domain.
Struktur ini digunakan agar kode lebih rapi, mudah dirawat, dan mudah dikembangkan ketika fitur bertambah.

`features/attendance`  
Berisi fitur presensi tutor.

Subfitur:

- `add-attendance`    
  Berisi komponen untuk halaman tambah presensi.
  
- `history`  
   Berisi komponen untuk halaman riwayat sesi.

File pendukung:
- `constants.ts`  
   Berisi data konstan untuk fitur attendance.
- `types.ts`  
   Berisi TypeScript type untuk fitur attendance.
- `utils.ts`  
   Berisi helper function untuk fitur attendance.

`features/dashboard`  
Berisi fitur dashboard / beranda tutor.

Komponen utama:
- DashboardHeader.tsx
- EarningsSummary.tsx
- PayoutTransactionCard.tsx
- PayoutTransactionList.tsx
- PeriodSelector.tsx
- StatCard.tsx
- StatsGrid.tsx

Hook:
- `useCurrentDateTime.ts`  
  Digunakan untuk mendapatkan tanggal dan waktu saat ini.

`features/settings`  
Berisi fitur pengaturan akun tutor.

Komponen utama:
- ProfilePhotoSection.tsx
- PersonalInfoCard.tsx
- BankAccountCard.tsx
- ChangePasswordCard.tsx
- PasswordModal.tsx
- PasswordConfirmModal.tsx
- BankConfirmModal.tsx
- SettingsHeader.tsx


### src/pages

Folder ini berisi halaman utama aplikasi.
Daftar halaman:
- `HomePage.tsx`  
  Halaman dashboard / beranda tutor.
- `AddAttendancePage.tsx`  
  Halaman untuk menambahkan presensi sesi mengajar.
- `HistoryPage.tsx`
  Halaman untuk melihat riwayat sesi tutor.
- `SettingsPage.tsx`
   Halaman untuk mengelola informasi profil, rekening bank, dan password.

### src/shared
Folder ini berisi komponen dan utility yang dapat digunakan ulang oleh banyak fitur.
Isi utama:
- `components/ui`  
   Berisi komponen UI dari shadcn/ui dan Radix UI.
- `components/figma`  
  Berisi komponen hasil adaptasi dari desain Figma.
- `hooks`   
  Berisi custom hook reusable.
- `lib`   
  Berisi helper umum seperti utility class Tailwind.

### src/styles
Folder ini berisi file CSS global dan konfigurasi styling.

Isi utama:

- fonts.css
- index.css
- tailwind.css
- theme.css
- Fitur Aplikasi

### 1. Dashboard Tutor
Halaman dashboard digunakan untuk menampilkan ringkasan informasi tutor dan payout.
Fitur:
- Menampilkan nama tutor.
- Menampilkan tanggal.
- Menampilkan daftar transaksi payout.
- Menampilkan status payout.
- Menampilkan nominal payout.

### 2. Tambah Presensi
Halaman tambah presensi digunakan tutor untuk mencatat sesi mengajar.
Komponen yang tersedia:
- Header tambah presensi.
- Input tanggal dan waktu.
- Input ID sesi.
- Pilihan siswa.
- Pilihan mata pelajaran.
- Pilihan durasi.
- Upload foto.
- Catatan tambahan.
- Tombol submit presensi.

### 3. Riwayat Sesi
Halaman riwayat digunakan untuk melihat daftar sesi yang telah dilakukan tutor.
Fitur:
- Filter berdasarkan status.
- Menampilkan tanggal sesi.
- Menampilkan nama siswa.
- Menampilkan mata pelajaran.
- Menampilkan durasi.
- Menampilkan nominal.
- Melihat detail sesi.

### 4. Pengaturan Akun
Halaman pengaturan digunakan tutor untuk mengelola data akun.
Fitur:
- Mengubah foto profil.
- Melihat dan mengubah informasi pribadi.
- Mengubah informasi rekening bank.
- Mengubah password.

---

## Instalasi Project
Clone repository:
```txt
git clone https://github.com/tegardns/PresensiTutor.git
```
Masuk ke folder project:
```txt
cd PresensiTutor
```
Install dependencies:
```txt
npm install
```
Jalankan project:
```txt
npm run dev
```
Buka aplikasi di browser:
```txt
http://localhost:5173
```
---

### Script yang Tersedia
Menjalankan development server
```txt
npm run dev
```
Build project
```txt
npm run build
```

---

## Catatan Development
Project ini menggunakan pendekatan folder berbasis fitur atau feature-based structure.
Tujuan struktur ini:

- Memisahkan kode berdasarkan fitur.
- Mengurangi file yang terlalu panjang.
- Memudahkan proses refactor.
- Memudahkan penambahan fitur baru.
- Membuat project lebih mudah dipahami oleh developer lain.

Contoh pembagian fitur:
```txt
features
├── attendance
├── dashboard
└── settings
```
Setiap fitur dapat memiliki:
```txt
components
constants.ts
types.ts
utils.ts
```
Dengan pola ini, kode yang berhubungan dengan satu fitur akan berada di lokasi yang sama.

---

## Status Project
Status saat ini:
- Frontend sudah memiliki struktur modular.
- Tampilan sudah mobile-friendly.
- Halaman utama sudah tersedia.
- Komponen sudah dipisahkan berdasarkan fitur.
- Dokumentasi struktur project sudah dibuat.
