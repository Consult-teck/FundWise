import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import plans from '../data/plans.json';
import { formatCurrency } from '../utils/formatCurrency';
import '../styles/Pages.css';
import { FiTrendingUp, FiTrendingDown, FiArrowUpRight } from 'react-icons/fi';

const monthlyReturns = [
  { month: 'Jan', stocks: 12400, realEstate: 7500 },
  { month: 'Feb', stocks: 15200, realEstate: 7800 },
  { month: 'Mar', stocks: 11800, realEstate: 8100 },
  { month: 'Apr', stocks: 18900, realEstate: 8400 },
  { month: 'May', stocks: 16500, realEstate: 8200 },
  { month: 'Jun', stocks: 21300, realEstate: 9000 },
];

const InvestmentDashboard = () => {
  const investments = plans.filter((p) => p.type === 'investment');
  const totalInvested = investments.reduce((s, p) => s + (p.invested || 0), 0);
  const avgReturn = (
    investments.reduce((s, p) => s + (p.returns || 0), 0) / investments.length
  ).toFixed(1);
  const totalReturns = investments.reduce(
    (s, p) => s + (p.invested || 0) * ((p.returns || 0) / 100),
    0
  );

  return (
    <div className="investment-page">
      <div className="page-header">
        <h1 style={{ fontSize: 26, marginBottom: 4 }}>Investment Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Portfolio performance & analytics
        </p>
      </div>

      {/* Portfolio Summary */}
      <div className="portfolio-summary">
        <div>
          <div className="portfolio-total-label">Total Portfolio Value</div>
          <div className="portfolio-total-value">
            {formatCurrency(totalInvested + totalReturns)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
            <span className="badge badge-green">
              <FiTrendingUp /> +{avgReturn}% avg return
            </span>
          </div>
        </div>
        <div className="portfolio-meta">
          <div className="portfolio-meta-item">
            <label>Total Invested</label>
            <value style={{ color: 'var(--text-primary)' }}>{formatCurrency(totalInvested)}</value>
          </div>
          <div className="portfolio-meta-item">
            <label>Total Returns</label>
            <value style={{ color: 'var(--accent)' }}>+{formatCurrency(totalReturns)}</value>
          </div>
          <div className="portfolio-meta-item">
            <label>Active Plans</label>
            <value style={{ color: 'var(--gold)' }}>{investments.length}</value>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
        <div className="chart-card">
          <div className="chart-title">Monthly Returns</div>
          <div className="chart-subtitle">Breakdown by investment type</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyReturns} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(v) => formatCurrency(v)}
                contentStyle={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-muted)' }} />
              <Bar dataKey="stocks" name="Stocks" fill="#00d4aa" radius={[4, 4, 0, 0]} />
              <Bar dataKey="realEstate" name="Real Estate" fill="#f5c842" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-title">Cumulative Growth</div>
          <div className="chart-subtitle">Total portfolio over 6 months</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={monthlyReturns.map((m) => ({
                month: m.month,
                total: m.stocks + m.realEstate,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(v) => formatCurrency(v)}
                contentStyle={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line type="monotone" dataKey="total" stroke="#f5c842" strokeWidth={2.5} dot={{ fill: '#f5c842', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Investment Cards */}
      <h2 style={{ fontSize: 18, marginBottom: 20 }}>Your Investments</h2>
      <div className="investments-grid">
        {investments.map((inv) => {
          const earnings = (inv.invested || 0) * ((inv.returns || 0) / 100);
          return (
            <div key={inv.id} className="plan-item-card">
              <div className="plan-item-header">
                <div className="plan-item-name">{inv.name}</div>
                <div className="plan-item-type investment">Investment</div>
              </div>
              <div className="plan-amounts">
                <div className="plan-amount-label">Invested</div>
                <div className="plan-amount-value" style={{ color: 'var(--gold)' }}>
                  {formatCurrency(inv.invested)}
                </div>
                <div className="plan-amount-total">
                  Target: {formatCurrency(inv.target)}
                </div>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 16,
                padding: '12px 0',
                borderTop: '1px solid var(--border)',
              }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>RETURNS</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent)', fontSize: 18 }}>
                    +{inv.returns}%
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>EARNINGS</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent)', fontSize: 18 }}>
                    +{formatCurrency(earnings)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InvestmentDashboard;
