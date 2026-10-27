# PanenSegar — React Frontend

Refactor dari frontend HTML/CSS/JavaScript PanenSegar menjadi aplikasi React + Vite.

## Struktur

```text
src/
├── components/       # Layout, UI primitives, modal, table helpers
├── data/              # Data awal dan konfigurasi navigasi
├── hooks/             # State dan business logic frontend
├── pages/             # Dashboard, inventory, sales, suppliers, dll.
├── utils/             # Formatter dan helper
├── App.jsx
├── main.jsx
└── styles.css
```

## Fitur

- Dashboard inventaris dan penjualan
- CRUD data sayur
- Pencatatan barang masuk
- Point of Sale sederhana dengan keranjang
- Data pemasok
- Pencatatan sayur rusak
- Laporan penjualan dan export CSV
- Persistensi data menggunakan `localStorage`
- Responsive layout dan mobile sidebar

## Menjalankan

```bash
npm install
npm run dev
```

Lalu buka URL yang diberikan Vite.

> Catatan: versi ini masih frontend-only. Belum ada backend/API/database server.
