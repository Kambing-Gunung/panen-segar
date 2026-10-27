import { useEffect, useState } from 'react';
import { pageTitles } from './data/defaultData';
import { usePanenSegar } from './hooks/usePanenSegar';
import { Sidebar, Toast, Topbar, Footer } from './components/Layout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Incoming from './pages/Incoming';
import Sales from './pages/Sales';
import Suppliers from './pages/Suppliers';
import Damaged from './pages/Damaged';
import Reports from './pages/Reports';

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const data = usePanenSegar();
  const navigate = (next) => { setPage(next); setSidebarOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  useEffect(() => { document.title = `PanenSegar | ${pageTitles[page]}`; }, [page]);
  const pages = { dashboard: Dashboard, inventory: Inventory, incoming: Incoming, sales: Sales, suppliers: Suppliers, damaged: Damaged, reports: Reports };
  const Page = pages[page] || Dashboard;
  return <div className="app-shell"><Sidebar page={page} onNavigate={navigate} open={sidebarOpen}/><main className="main-content"><Topbar title={pageTitles[page]} onMenu={() => setSidebarOpen(v => !v)} onNotify={data.notify} lowCount={data.lowProducts.length}/><div className="page-wrap"><Page data={data} onNavigate={navigate}/><Footer/></div></main><Toast message={data.toast}/></div>;
}
