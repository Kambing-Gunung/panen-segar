import { navItems } from '../data/defaultData';

export function Sidebar({ page, onNavigate, open }) {
  return <aside className={`sidebar ${open ? 'open' : ''}`}>
    <a className="brand" href="#" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} aria-label="PanenSegar dashboard">
      <span className="brand-mark">✳</span><span><strong>PanenSegar</strong><small>FRESH INVENTORY</small></span>
    </a>
    <div className="nav-label">MENU UTAMA</div>
    <nav className="nav-menu">{navItems.map(([id, icon, label]) => <button key={id} className={`nav-item ${page === id ? 'active' : ''}`} onClick={() => onNavigate(id)}><span className="nav-icon">{icon}</span>{label}</button>)}</nav>
    <div className="sidebar-bottom">
      <div className="fresh-card"><span className="fresh-emoji">🥬</span><strong>Selalu segar!</strong><p>Kelola stok dengan rapi, kurangi sayur terbuang.</p></div>
      <button className="profile-button" type="button"><span className="avatar">A</span><span className="profile-text"><strong>Admin Toko</strong><small>Administrator</small></span><span className="profile-dots">•••</span></button>
    </div>
  </aside>;
}

export function Topbar({ title, onMenu, onNotify, lowCount }) {
  return <header className="topbar">
    <button className="mobile-menu" onClick={onMenu} aria-label="Buka menu">☰</button>
    <div className="breadcrumb"><span>Workspace</span><span className="crumb-slash">/</span><strong>{title}</strong></div>
    <div className="topbar-actions"><span className="today-pill"><span className="status-dot" /> Operasional toko</span><button className="icon-button" onClick={() => onNotify(`${lowCount} produk memiliki stok 5 unit atau kurang.`)} title="Notifikasi">♧<i /></button><div className="top-avatar">A</div></div>
  </header>;
}

export function PageHeading({ eyebrow, title, subtitle, action }) {
  return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-subtitle">{subtitle}</p></div>{action}</div>;
}

export function Panel({ className = '', children }) { return <section className={`panel ${className}`}>{children}</section>; }
export function PanelHeading({ title, subtitle, action }) { return <div className="panel-heading"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>; }
export function Button({ children, variant = 'primary', className = '', ...props }) { return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>; }
export function SearchBox({ value, onChange, placeholder }) { return <div className="search-box"><span>⌕</span><input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} /></div>; }
export function EmptyRow({ columns, children }) { return <tr><td colSpan={columns} className="empty-table">{children}</td></tr>; }
export function StatusBadge({ stock }) { return <span className={`status-badge ${stock <= 0 ? 'out' : stock <= 5 ? 'low' : ''}`}>{stock <= 0 ? 'Habis' : stock <= 5 ? 'Menipis' : 'Tersedia'}</span>; }
export function ProductCell({ product }) { return <div className="product-cell"><span className="product-thumb">{product.emoji || '🥬'}</span><span><span className="product-name">{product.name}</span><span className="product-meta">{product.unit} · ID {String(product.id).padStart(3, '0')}</span></span></div>; }
export function FormField({ label, children, full = false }) { return <label className={`field ${full ? 'full' : ''}`}><span>{label}</span>{children}</label>; }
export function Modal({ open, title, subtitle, onClose, children }) { if (!open) return null; return <div className="modal-backdrop open" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><div className="modal"><div className="modal-heading"><div><h2>{title}</h2><p>{subtitle}</p></div><button className="close-modal" onClick={onClose} aria-label="Tutup">×</button></div>{children}</div></div>; }
export function Toast({ message }) { return <div className={`toast ${message ? 'show' : ''}`} role="status" aria-live="polite">{message}</div>; }
export function Footer() { return <footer className="app-footer"><span>© 2026 PanenSegar</span><span>Inventaris & Penjualan Sayur Segar <i className="footer-dot" /> Frontend Demo</span></footer>; }
