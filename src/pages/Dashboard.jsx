import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import TransactionCard from '../components/TransactionCard';
import transactions from '../data/transactions.json';
import plans from '../data/plans.json';
import { formatCurrency, getProgress } from '../utils/formatCurrency';
import '../styles/Dashboard.css';
import {
  FiDollarSign, FiTrendingUp, FiPieChart, FiArrowUpRight,
} from 'react-icons/fi';
import { RiSaveLine } from 'react-icons/ri';

const portfolioData = [
  { month: 'Jan', value: 120000 },
  { month: 'Feb', value: 145000 },
  { month: 'Mar', value: 138000 },
  { month: 'Apr', value: 172000 },
  { month: 'May', value: 168000 },
  { month: 'Jun', value: 195000 },
  { month: 'Jul', value: 210000 },
  { month: 'Aug', value: 228000 },
  { month: 'Sep', value: 242000 },
  { month: 'Oct', value: 258000 },
  { month: 'Nov', value: 271000 },
  { month: 'Dec', value: 285000 },
];

const allocData = [
  { name: 'Savings', value: 40 },
  { name: 'Stocks', value: 35 },
  { name: 'Real Estate', value: 25 },
];

const COLORS = ['#00d4aa', '#f5c842', '#60a5fa'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: 8,
        padding: '10px 14px',
        fontSize: 13,
      }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
        <div style={{ color: 'var(--accent)', fontWeight: 700 }}>
          {formatCurrency(payload[0].value)}
        </div>
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  const { user } = useAuth();

  const savingsPlans = plans.filter((p) => p.type === 'savings');
  const totalInvested = plans
    .filter((p) => p.type === 'investment')
    .reduce((s, p) => s + (p.invested || 0), 0);

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Good morning, {user?.firstName} 👋</h1>
        <p>Here's your financial overview for today</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon green"><FiDollarSign /></div>
          <div className="stat-label">Wallet Balance</div>
          <div className="stat-value">{formatCurrency(user?.walletBalance || 285000)}</div>
          <div className="stat-change text-accent">
            <FiArrowUpRight /> +₦12,500 this month
          </div>
        </div>
        <div className="stat-card gold">
          <div className="stat-icon gold"><FiTrendingUp /></div>
          <div className="stat-label">Total Invested</div>
          <div className="stat-value">{formatCurrency(totalInvested)}</div>
          <div className="stat-change text-accent">
            <FiArrowUpRight /> +14.2% returns
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><RiSaveLine /></div>
          <div className="stat-label">Total Saved</div>
          <div className="stat-value">{formatCurrency(1180000)}</div>
          <div className="stat-change text-accent">
            <FiArrowUpRight /> 3 active plans
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><FiPieChart /></div>
          <div className="stat-label">Net Worth</div>
          <div className="stat-value">{formatCurrency(2555000)}</div>
          <div className="stat-change text-accent">
            <FiArrowUpRight /> +8.1% this year
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-title">Portfolio Growth</div>
          <div className="chart-subtitle">12-month performance</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00d4aa" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#00d4aa"
                strokeWidth={2.5}
                fill="url(#colorVal)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-title">Asset Allocation</div>
          <div className="chart-subtitle">Portfolio breakdown</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={allocData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {allocData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, n) => [`${v}%`, n]}
                contentStyle={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  borderRadius: 8,
                  fontSize: 13,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {allocData.map((d, i) => (
              <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS[i], flexShrink: 0 }} />
                  {d.name}
                </span>
                <span style={{ fontWeight: 600 }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bottom-grid">
        {/* Recent Transactions */}
        <div className="chart-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div className="chart-title">Recent Transactions</div>
              <div className="chart-subtitle">Last 6 activities</div>
            </div>
            <Link to="/payment" className="btn-ghost" style={{ fontSize: 13 }}>View All</Link>
          </div>
          <div className="transaction-list">
            {transactions.slice(0, 5).map((t) => (
              <TransactionCard key={t.id} transaction={t} />
            ))}
          </div>
        </div>

        {/* Savings progress */}
        <div className="chart-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div className="chart-title">Savings Goals</div>
              <div className="chart-subtitle">Progress overview</div>
            </div>
            <Link to="/savings" className="btn-ghost" style={{ fontSize: 13 }}>Manage</Link>
          </div>
          {savingsPlans.map((p, i) => {
            const pct = getProgress(p.saved, p.target);
            return (
              <div key={p.id} className="plan-progress-item">
                <div className="plan-progress-header">
                  <span className="plan-progress-name">{p.name}</span>
                  <span className="plan-progress-pct">{pct}%</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
                  {formatCurrency(p.saved)} / {formatCurrency(p.target)}
                </div>
                <div className="progress-bar-track">
                  <div
                    className={`progress-bar-fill ${i === 1 ? 'gold' : ''}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
