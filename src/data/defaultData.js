export const defaultProducts = [
  { id: 1, name: 'Bayam', category: 'Sayuran daun', stock: 24, unit: 'ikat', buy: 2000, sell: 3500, emoji: '🥬' },
  { id: 2, name: 'Wortel', category: 'Sayuran akar', stock: 18, unit: 'kg', buy: 10000, sell: 14000, emoji: '🥕' },
  { id: 3, name: 'Kangkung', category: 'Sayuran daun', stock: 8, unit: 'ikat', buy: 1800, sell: 3000, emoji: '🌿' },
  { id: 4, name: 'Tomat', category: 'Sayuran buah', stock: 5, unit: 'kg', buy: 9000, sell: 13000, emoji: '🍅' },
  { id: 5, name: 'Cabai Merah', category: 'Sayuran buah', stock: 3, unit: 'kg', buy: 28000, sell: 35000, emoji: '🌶️' },
  { id: 6, name: 'Sawi Hijau', category: 'Sayuran daun', stock: 16, unit: 'ikat', buy: 2500, sell: 4000, emoji: '🥬' },
];

export const defaultSuppliers = [
  { id: 1, name: 'Pasar Induk Surabaya', phone: '-', address: 'Surabaya' },
  { id: 2, name: 'Petani Sayur Sejahtera', phone: '-', address: 'Jawa Timur' },
  { id: 3, name: 'Agro Segar Jatim', phone: '-', address: 'Jawa Timur' },
];

export const navItems = [
  ['dashboard', '▦', 'Dashboard'], ['inventory', '♧', 'Data Sayur'], ['incoming', '↙', 'Barang Masuk'],
  ['sales', '▤', 'Penjualan'], ['suppliers', '♙', 'Pemasok'], ['damaged', '△', 'Sayur Rusak'], ['reports', '▥', 'Laporan'],
];

export const pageTitles = Object.fromEntries(navItems.map(([id, , label]) => [id, label]));
