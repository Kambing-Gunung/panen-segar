export const money = (value) => new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR', maximumFractionDigits: 0,
}).format(Number(value) || 0);

export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const dateLabel = (value) => value ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(`${value}T00:00:00`)) : '-';
export const productEmoji = (product) => product?.emoji || '🥬';
export const lowProducts = (products) => products.filter((p) => Number(p.stock) <= 5);
export const stockValue = (products) => products.reduce((sum, p) => sum + Number(p.stock) * Number(p.buy), 0);
export const totalStock = (products) => products.reduce((sum, p) => sum + Number(p.stock), 0);
export const revenue = (sales) => sales.reduce((sum, s) => sum + Number(s.total), 0);
export const lossValue = (history) => history.reduce((sum, d) => sum + Number(d.loss || 0), 0);
