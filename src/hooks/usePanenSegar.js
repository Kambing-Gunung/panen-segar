import { useCallback, useEffect, useMemo, useState } from 'react';
import { defaultProducts, defaultSuppliers } from '../data/defaultData';
import { lowProducts, lossValue, revenue, stockValue, today, totalStock } from '../utils/format';

const load = (key, fallback) => {
  try { const value = localStorage.getItem(`panensegar_${key}`); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
};

export function usePanenSegar() {
  const [products, setProducts] = useState(() => load('products', defaultProducts));
  const [suppliers, setSuppliers] = useState(() => load('suppliers', defaultSuppliers));
  const [sales, setSales] = useState(() => load('sales', []));
  const [incomingHistory, setIncomingHistory] = useState(() => load('incoming', []));
  const [damagedHistory, setDamagedHistory] = useState(() => load('damaged', []));
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState('');

  useEffect(() => localStorage.setItem('panensegar_products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('panensegar_suppliers', JSON.stringify(suppliers)), [suppliers]);
  useEffect(() => localStorage.setItem('panensegar_sales', JSON.stringify(sales)), [sales]);
  useEffect(() => localStorage.setItem('panensegar_incoming', JSON.stringify(incomingHistory)), [incomingHistory]);
  useEffect(() => localStorage.setItem('panensegar_damaged', JSON.stringify(damagedHistory)), [damagedHistory]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(''), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  const notify = useCallback((message) => setToast(message), []);
  const productById = useCallback((id) => products.find((p) => p.id === Number(id)), [products]);
  const low = useMemo(() => lowProducts(products), [products]);

  const addOrUpdateProduct = useCallback((payload, id) => {
    if (id) {
      setProducts((current) => current.map((p) => p.id === Number(id) ? { ...p, ...payload, id: p.id } : p));
      setCart((current) => current.filter((item) => products.some((p) => p.id === item.id)));
      notify('Data produk berhasil diperbarui.');
      return;
    }
    const emojiMap = { 'Sayuran daun': '🥬', 'Sayuran akar': '🥕', 'Sayuran buah': '🍅', 'Sayuran lainnya': '🥦' };
    setProducts((current) => [...current, { ...payload, id: Math.max(0, ...current.map((p) => p.id)) + 1, emoji: emojiMap[payload.category] || '🥦' }]);
    notify(`Produk ${payload.name} berhasil ditambahkan.`);
  }, [notify, products]);

  const deleteProduct = useCallback((id) => {
    setProducts((current) => current.filter((p) => p.id !== Number(id)));
    setCart((current) => current.filter((item) => item.id !== Number(id)));
    notify('Produk berhasil dihapus.');
  }, [notify]);

  const addIncoming = useCallback(({ productId, qty, date, supplierId, notes }) => {
    const product = products.find((p) => p.id === Number(productId));
    const supplier = suppliers.find((s) => s.id === Number(supplierId));
    if (!product || !supplier || !Number.isFinite(Number(qty)) || Number(qty) <= 0) return notify('Pilih produk, pemasok, dan jumlah yang valid.');
    const amount = Number(qty);
    setProducts((current) => current.map((p) => p.id === product.id ? { ...p, stock: Number(p.stock) + amount } : p));
    setIncomingHistory((current) => [{ id: Date.now(), date, product: product.name, qty: amount, unit: product.unit, supplier: supplier.name, notes }, ...current]);
    notify(`Stok ${product.name} berhasil ditambahkan.`);
  }, [notify, products, suppliers]);

  const addDamaged = useCallback(({ productId, qty, date, reason }) => {
    const product = products.find((p) => p.id === Number(productId));
    const amount = Number(qty);
    if (!product || !Number.isFinite(amount) || amount <= 0 || amount > Number(product.stock)) return notify('Jumlah rusak harus lebih dari nol dan tidak melebihi stok.');
    setProducts((current) => current.map((p) => p.id === product.id ? { ...p, stock: Number(p.stock) - amount } : p));
    setDamagedHistory((current) => [{ id: Date.now(), date, product: product.name, qty: amount, unit: product.unit, reason, loss: amount * Number(product.buy) }, ...current]);
    notify('Catatan kerusakan berhasil disimpan.');
  }, [notify, products]);

  const addToCart = useCallback((id) => {
    const product = products.find((p) => p.id === Number(id));
    if (!product || product.stock <= 0) return;
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if ((existing?.qty || 0) >= Number(product.stock)) { notify(`Jumlah ${product.name} sudah mencapai stok tersedia.`); return current; }
      if (existing) return current.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...current, { id: product.id, name: product.name, unit: product.unit, price: Number(product.sell), qty: 1 }];
    });
    notify(`${product.name} ditambahkan ke keranjang.`);
  }, [notify, products]);

  const updateCartQty = useCallback((id, delta) => {
    setCart((current) => current.flatMap((item) => {
      if (item.id !== Number(id)) return [item];
      const product = products.find((p) => p.id === item.id);
      const next = item.qty + delta;
      if (next <= 0) return [];
      if (next > Number(product?.stock || 0)) { notify('Stok produk tidak mencukupi.'); return [item]; }
      return [{ ...item, qty: next }];
    }));
  }, [notify, products]);

  const clearCart = useCallback(() => { setCart([]); notify('Keranjang dikosongkan.'); }, [notify]);

  const checkout = useCallback(() => {
    if (!cart.length) return;
    const invalid = cart.find((item) => Number(productById(item.id)?.stock || 0) < item.qty);
    if (invalid) return notify(`Stok ${invalid.name} tidak mencukupi.`);
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    setProducts((current) => current.map((p) => {
      const item = cart.find((c) => c.id === p.id);
      return item ? { ...p, stock: Number(p.stock) - item.qty } : p;
    }));
    setSales((current) => [{ id: `TRX-${String(Date.now()).slice(-6)}`, date: new Date().toLocaleString('id-ID'), time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), total, items: cart.map((item) => ({ ...item })) }, ...current]);
    setCart([]);
    notify(`Transaksi selesai. Total ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(total)}.`);
  }, [cart, notify, productById]);

  const addSupplier = useCallback(({ name, phone, address }, id) => {
    if (!name.trim()) return notify('Nama pemasok wajib diisi.');
    if (suppliers.some((s) => s.name.toLowerCase() === name.toLowerCase() && String(s.id) !== String(id || ''))) return notify('Pemasok dengan nama tersebut sudah ada.');
    if (id) setSuppliers((current) => current.map((s) => s.id === Number(id) ? { ...s, name, phone: phone || '-', address: address || '-' } : s));
    else setSuppliers((current) => [...current, { id: Math.max(0, ...current.map((s) => s.id)) + 1, name, phone: phone || '-', address: address || '-' }]);
    notify(id ? 'Data pemasok diperbarui.' : 'Pemasok berhasil ditambahkan.');
  }, [notify, suppliers]);

  const deleteSupplier = useCallback((id) => { setSuppliers((current) => current.filter((s) => s.id !== Number(id))); notify('Pemasok berhasil dihapus.'); }, [notify]);

  return {
    products, suppliers, sales, incomingHistory, damagedHistory, cart, toast, notify, productById,
    lowProducts: low, metrics: { totalStock: totalStock(products), revenue: revenue(sales), stockValue: stockValue(products), lossValue: lossValue(damagedHistory) },
    addOrUpdateProduct, deleteProduct, addIncoming, addDamaged, addToCart, updateCartQty, clearCart, checkout, addSupplier, deleteSupplier,
    today,
  };
}
