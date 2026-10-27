import { money } from '../utils/format';
import { Button, EmptyRow, Panel, PanelHeading, ProductCell, PageHeading, StatusBadge } from '../components/Layout';

export default function Dashboard({ data, onNavigate }) {
  const { products, sales, lowProducts: low, metrics } = data;
  const sorted = [...products].sort((a, b) => a.stock - b.stock).slice(0, 5);
  return <section className="page active">
    <PageHeading eyebrow="SENIN, 26 OKTOBER 2026" title={<>Dashboard <span className="heading-leaf">✳</span></>} subtitle="Ringkasan kondisi inventaris dan penjualan toko hari ini." action={<Button onClick={() => onNavigate('sales')}>＋ Transaksi Baru</Button>} />
    <div className="welcome-banner"><div className="welcome-copy"><span className="banner-tag">PANEN HARI INI</span><h2>Segarkan harimu.</h2><p>Pastikan setiap sayuran tercatat dan selalu dalam kondisi terbaik.</p><Button variant="light" onClick={() => onNavigate('inventory')}>Lihat Inventaris <span>↗</span></Button></div><div className="produce-art" aria-hidden="true"><span className="produce produce-one">🥬</span><span className="produce produce-two">🥕</span><span className="produce produce-three">🍅</span><span className="produce produce-four">🥦</span><span className="art-sparkle">✳</span></div></div>
    <div className="stats-grid">
      <Stat icon="♧" tone="green" note="Produk aktif" label="Jenis Sayur" value={products.length} foot="Jenis produk terdaftar" />
      <Stat icon="▤" tone="orange" note="Semua satuan" label="Total Stok" value={<>{metrics.totalStock} <small>unit</small></>} foot="Jumlah stok tercatat" />
      <Stat icon="↗" tone="blue" note="Hari ini" label="Penjualan Hari Ini" value={money(metrics.revenue)} foot={`${sales.length} transaksi tercatat`} />
      <Stat icon="△" tone="red" note="Perlu dicek" label="Stok Menipis" value={low.length} foot="Stok 5 unit atau kurang" />
    </div>
    <div className="dashboard-grid">
      <Panel className="inventory-panel"><PanelHeading title="Ringkasan Inventaris" subtitle="Produk yang perlu kamu perhatikan." action={<button className="text-button" onClick={() => onNavigate('inventory')}>Lihat semua <span>→</span></button>} /><div className="table-wrap"><table><thead><tr><th>PRODUK</th><th>HARGA JUAL</th><th>STOK</th><th>STATUS</th></tr></thead><tbody>{sorted.length ? sorted.map((p) => <tr key={p.id}><td><ProductCell product={p} /></td><td className="price-cell">{money(p.sell)}<span className="product-meta">per {p.unit}</span></td><td><span className="stock-number">{p.stock} {p.unit}</span></td><td><StatusBadge stock={p.stock} /></td></tr>) : <EmptyRow columns={4}>Belum ada produk.</EmptyRow>}</tbody></table></div></Panel>
      <Panel className="alert-panel"><PanelHeading title="Perhatian Stok" subtitle="Segera lakukan pengadaan." action={<span className="alert-count">{low.length}</span>} /><div className="low-stock-list">{low.length ? low.map((p) => <div className="low-stock-item" key={p.id}><span className="product-thumb">{p.emoji}</span><div className="low-stock-copy"><strong>{p.name}</strong><span>Segera tambah persediaan</span></div><span className="low-stock-qty">{p.stock} {p.unit}</span></div>) : <div className="empty-table">Tidak ada stok menipis. Semua aman!</div>}</div><Button variant="outline" className="full-button" onClick={() => onNavigate('incoming')}>＋ Catat Barang Masuk</Button></Panel>
    </div>
    <Panel className="recent-panel"><PanelHeading title="Transaksi Terbaru" subtitle="Aktivitas penjualan yang tercatat." action={<button className="text-button" onClick={() => onNavigate('reports')}>Lihat laporan <span>→</span></button>} /><div className="table-wrap"><table><thead><tr><th>ID TRANSAKSI</th><th>ITEM</th><th>TOTAL</th><th>WAKTU</th><th>STATUS</th></tr></thead><tbody>{sales.length ? sales.slice(0, 5).map((s) => <tr key={s.id}><td><strong>{s.id}</strong></td><td>{s.items.reduce((n, i) => n + Number(i.qty), 0)} item</td><td className="price-cell">{money(s.total)}</td><td>{s.time}</td><td><StatusBadge stock={10} /></td></tr>) : <EmptyRow columns={5}>Belum ada transaksi penjualan.</EmptyRow>}</tbody></table></div></Panel>
  </section>;
}
function Stat({ icon, tone, note, label, value, foot }) { return <article className="stat-card"><div className="stat-top"><span className={`stat-icon ${tone}`}>{icon}</span><span className={`stat-note ${tone === 'red' ? 'warning' : 'positive'}`}>{note}</span></div><p className="stat-label">{label}</p><h3>{value}</h3><div className="stat-foot"><span className={`tiny-bar ${tone}-bar`} /><span>{foot}</span></div></article>; }
